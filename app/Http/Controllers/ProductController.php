<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->input('status');
        $category_id = $request->input('category_id');
        $products_per_page = $request->input('products_per_page');
        $page = $request->input('page');

        $products = Product::with([
            'category',
            'images' => fn($query) => $query->orderBy('sort', 'asc'),
        ])
            ->when($category_id, fn($query) => $query->where('category_id', $category_id))
            ->when(in_array($status, ['active','inactive'], true), fn($query) => $query->where('status', $status))
            ->when($products_per_page, fn($query) => $query->paginate($products_per_page, ['*'], 'page', $page), fn($query) => $query->get());

        // لو عندنا paginate نرجع meta معها
        if ($products instanceof \Illuminate\Pagination\LengthAwarePaginator) {
            return response()->json([
                'success' => true,
                'message' => 'تم جلب المنتجات بنجاح',
                'data' => $products->getCollection()->map(fn($product) => $this->formatProduct($product)),
                'meta' => [
                    'current_page' => $products->currentPage(),
                    'last_page' => $products->lastPage(),
                    'per_page' => $products->perPage(),
                    'total' => $products->total(),
                ],
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'تم جلب المنتجات بنجاح',
            'data' => $products->map(fn($product) => $this->formatProduct($product)),
        ]);
    }

    public function store(Request $request)
    {
        // التحقق من الهوية - يمكن أن يكون أدمن أو فئة
        $auth = $request->user();
        $sessionCategoryId = session('category_id');

        // تحديد فئة الإضافة النهائية
        $finalCategoryId = null;
        if ($auth instanceof Category) {
            $finalCategoryId = $auth->id; // إجبار الإضافة لفئة صاحب التوكن فقط
        } elseif ($sessionCategoryId) {
            $finalCategoryId = (int) $sessionCategoryId;
        } elseif ($auth && method_exists($auth, 'getAttribute') && $auth->getAttribute('email') === 'Admin@product.com') {
            // أدمن يسمح له تحديد الفئة
            $finalCategoryId = (int) $request->input('category_id');
        } else {
            return response()->json(['success' => false, 'message' => 'غير مصرح'], 403);
        }

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'price' => 'required|numeric|min:0.01',
            'stock' => 'nullable|integer|min:0',
            'images' => 'nullable|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        DB::beginTransaction();
        try {
            $product = Product::create([
                'category_id' => $finalCategoryId ?: $validated['category_id'],
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'price' => $validated['price'],
                'status' => $validated['status'],
                'stock' => $validated['stock'] ?? null,
            ]);

            // رفع الصور إذا كانت موجودة
            if ($request->hasFile('images')) {
                $productDir = 'products/' . $product->id;
                
                // إنشاء مجلد المنتج إذا لم يكن موجوداً
                if (!Storage::disk('public')->exists($productDir)) {
                    Storage::disk('public')->makeDirectory($productDir);
                }

                $count = 1;
                foreach ($request->file('images') as $image) {
                    $filename = uniqid('product_') . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs($productDir, $filename, 'public');
                    
                    $product->images()->create([
                        'path' => $path,
                        'sort' => $count++,
                    ]);
                }
            }

            DB::commit();
            
            // إرجاع المنتج مع صوره
            $product->load(['images', 'category']);
            
            return response()->json([
                'success' => true,
                'message' => 'تم إنشاء المنتج بنجاح',
                'data' => $this->formatProduct($product)
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false, 
                'message' => 'فشل في إنشاء المنتج: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show(Product $product)
    {
        $product->load(['category', 'images' => fn($query) => $query->orderBy('sort', 'asc')]);
        
        return response()->json([
            'success' => true,
            'data' => $this->formatProduct($product)
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $auth = $request->user();
        $sessionCategoryId = session('category_id');

        $isAdmin = $auth && method_exists($auth, 'getAttribute') && $auth->getAttribute('email') === 'Admin@product.com';
        $isOwnerByToken = ($auth instanceof Category) && ((int) $auth->id === (int) $product->category_id);
        $isOwnerBySession = $sessionCategoryId && ((int) $sessionCategoryId === (int) $product->category_id);

        if (!$isAdmin && !$isOwnerByToken && !$isOwnerBySession) {
            return response()->json(['success' => false, 'message' => 'غير مصرح'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:active,inactive',
            'price' => 'sometimes|numeric|min:0.01',
            'stock' => 'nullable|integer|min:0',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        DB::beginTransaction();
        try {
            $product->update(array_filter($validated, function($value, $key) {
                return $key !== 'images' && $value !== null;
            }, ARRAY_FILTER_USE_BOTH));

            // إضافة صور جديدة بدون حذف القديمة
            if ($request->hasFile('images')) {
                $productDir = 'products/' . $product->id;
                if (!Storage::disk('public')->exists($productDir)) {
                    Storage::disk('public')->makeDirectory($productDir);
                }

                $currentMaxSort = (int) ($product->images()->max('sort') ?? 0);
                $count = $currentMaxSort + 1;
                foreach ($request->file('images') as $image) {
                    $filename = uniqid('product_') . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs($productDir, $filename, 'public');

                    $product->images()->create([
                        'path' => $path,
                        'sort' => $count++,
                    ]);
                }
            }

            DB::commit();
            
            $product->load(['images', 'category']);
            
            return response()->json([
                'success' => true,
                'message' => 'تم تحديث المنتج بنجاح',
                'data' => $this->formatProduct($product)
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'فشل في تحديث المنتج: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Request $request, Product $product)
    {
        $auth = $request->user();
        $sessionCategoryId = session('category_id');

        $isAdmin = $auth && method_exists($auth, 'getAttribute') && $auth->getAttribute('email') === 'Admin@product.com';
        $isOwnerByToken = ($auth instanceof Category) && ((int) $auth->id === (int) $product->category_id);
        $isOwnerBySession = $sessionCategoryId && ((int) $sessionCategoryId === (int) $product->category_id);

        if (!$isAdmin && !$isOwnerByToken && !$isOwnerBySession) {
            return response()->json(['success' => false, 'message' => 'غير مصرح'], 403);
        }

        DB::beginTransaction();
        try {
            // حذف جميع صور المنتج
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->path);
                $image->delete();
            }
            
            // حذف مجلد المنتج إذا كان فارغاً
            $productDir = 'products/' . $product->id;
            if (Storage::disk('public')->exists($productDir)) {
                Storage::disk('public')->deleteDirectory($productDir);
            }
            
            $product->delete();
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'تم حذف المنتج بنجاح'
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'فشل في حذف المنتج: ' . $e->getMessage()
            ], 500);
        }
    }

    private function formatProduct(Product $product)
    {
        return [
            'id' => $product->id,
            'title' => $product->title,
            'description' => $product->description,
            'status' => $product->status,
            'price' => $product->price,
            'stock' => $product->stock,
            'images' => $product->images->map(fn($image) => [
                'id' => $image->id,
                'url' => asset('storage/' . $image->path),
                'sort' => $image->sort,
            ]),
            'category' => [
                'id' => $product->category->id,
                'name' => $product->category->name,
            ],
            'created_at' => $product->created_at,
            'updated_at' => $product->updated_at,
        ];
    }
}