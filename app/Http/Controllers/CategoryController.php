<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product; // لا تنسى استدعاء الموديل في أعلى الكنترولر
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Public: list categories for API
     */
    public function index()
    {
        $categories = Category::query()
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($c) {
                return [
                    'id' => $c->id,
                    'name' => $c->name,
                    'email' => $c->email,
                    'image' => $c->image ? asset('storage/' . $c->image) : null,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }
    /**
     * Show the category login page
     */
    public function showLogin()
    {
        return Inertia::render('CategoryLogin');
    }

    /**
     * Handle category login
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|exists:categories,email',
            'password' => 'required|string',
        ]);

        $category = Category::where('email', $validated['email'])->first();

        if (!$category || !Hash::check($validated['password'], $category->password)) {
            return back()->withErrors(['email' => 'الإيميل أو كلمة المرور غير صحيحة']);
        }

        // إنشاء التوكن
        $token = $category->createToken('category-token')->plainTextToken;

        // حفظ التوكن في الجلسة ثم إعادة التوجيه للداشبورد لضمان ثبات الرابط بعد الرفرش
        session(['category_token' => $token, 'category_id' => $category->id]);

        return redirect()->route('category.dashboard');
    }

    /**
     * Show the category dashboard
     */
    public function dashboard(Request $request)
    {
        $token = session('category_token');

        $category = null;
        if (session('category_id')) {
            $cat = Category::find(session('category_id'));
            if ($cat) {
                $category = [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'email' => $cat->email,
                    'image' => $cat->image ? asset('storage/' . $cat->image) : null,
                ];
            }
        }

        return Inertia::render('CategoryDashboard', [
            'category' => $category, // يمكن للفرونت جلبها بالتوكن إذا كانت null
            'token' => $token,
        ]);
    }

    /**
     * Update category details
     */
    public function update(Request $request, Category $category)
    {
        // التحقق من الهوية باستخدام وسطية Sanctum + جلسة احتياطية
        $authCategory = $request->user();
        $sessionCategoryId = session('category_id');

        $authorizedByToken = $authCategory && (int) $authCategory->id === (int) $category->id;
        $authorizedBySession = $sessionCategoryId && (int) $sessionCategoryId === (int) $category->id;

        if (!$authorizedByToken && !$authorizedBySession) {
            return response()->json([
                'success' => false,
                'message' => 'غير مصرح',
            ], 403);
        }

        DB::beginTransaction();

        try {
            $validated = $request->validate([
                'name' => 'nullable|string|max:255',
                'email' => 'nullable|email|unique:categories,email,' . $category->id,
                'password' => 'nullable|string|min:8',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $updateData = [];
            if (isset($validated['name'])) {
                $updateData['name'] = $validated['name'];
            }
            if (isset($validated['email'])) {
                $updateData['email'] = $validated['email'];
            }
            if (isset($validated['password'])) {
                $updateData['password'] = Hash::make($validated['password']);
            }
            if ($request->hasFile('image')) {
                // حذف الصورة القديمة
                if ($category->image) {
                    Storage::disk('public')->delete($category->image);
                }
                // إنشاء مجلد categories إذا لم يكن موجوداً
                if (!Storage::disk('public')->exists('categories')) {
                    Storage::disk('public')->makeDirectory('categories');
                }
                $filename = uniqid('category_') . '.' . $request->file('image')->getClientOriginalExtension();
                $path = $request->file('image')->storeAs('categories', $filename, 'public');
                $updateData['image'] = $path;
            }

            $category->update($updateData);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'تم تحديث الشركة بنجاح',
                'category' => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'email' => $category->email,
                    'image' => $category->image ? asset('storage/' . $category->image) : null,
                ],
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'فشل في تحديث الشركة: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Logout category
     */
    public function logout(Request $request)
    {
        // حذف التوكن (يتعامل مع PersonalAccessToken و TransientToken)
        if ($request->user('sanctum')) {
            $user = $request->user('sanctum');
            $current = $user->currentAccessToken();
            if ($current && method_exists($current, 'delete')) {
                $current->delete();
            } else {
                // في حال كان TransientToken (كوكي stateful)، احذف كل التوكنات أو نفّذ تسجيل خروج جلسة
                try { $user->tokens()->delete(); } catch (\Throwable $e) {}
            }
        }
        
        // محو الجلسة
        session()->forget(['category_token', 'category_id']);
        
        return redirect()->route('category.login');
    }

    /**
     * API logout for category (revoke token)
     */
    public function apiLogout(Request $request)
    {
        if ($request->user('sanctum')) {
            $user = $request->user('sanctum');
            $current = $user->currentAccessToken();
            if ($current && method_exists($current, 'delete')) {
                $current->delete();
            } else {
                try { $user->tokens()->delete(); } catch (\Throwable $e) {}
            }
        }
        // مسح بيانات الجلسة المرتبطة بالفئة
        session()->forget(['category_token', 'category_id']);
        return response()->json(['success' => true]);
    }

    /**
     * Get category by token (للتحقق من صحة التوكن)
     */
    public function me(Request $request)
    {
        $category = auth()->guard('sanctum')->user();
        
        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'غير مصرح'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'email' => $category->email,
                'image' => $category->image ? asset('storage/' . $category->image) : null,
            ]
        ]);
    }
    public function show($id)
{
    // نتأكد أن الفئة موجودة
    $category = Category::findOrFail($id);

    // جلب المنتجات التابعة لها
    $products = Product::where('category_id', $id)
        ->orderBy('id', 'desc')
        ->get()
        ->map(function ($p) {
            return [
                'id' => $p->id,
                'name' => $p->name,
                'price' => $p->price,
                'description' => $p->description,
                'image' => $p->image ? asset('storage/' . $p->image) : null,
            ];
        });

    return response()->json([
        'success' => true,
        'category' => [
            'id' => $category->id,
            'name' => $category->name,
        ],
        'products' => $products,
    ]);
}
}