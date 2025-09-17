<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

    /**
     * Get all products
     */
    public function index(Request $request)
    {
        // Initialize default values
        $status = 'active';
        $category_id = null;
        $products_per_page = null;
        $page = null;

        // Check for status filter
        if ($request->has('status') && in_array($request->status, ['active', 'inactive'])) {
            $status = $request->status;
        }

        // Check for category filter
        if ($request->has('category_id') && filter_var($request->category_id, FILTER_VALIDATE_INT) !== false) {
            $category_id = (int) $request->category_id;
        }

        // Check for pagination
        if ($request->has('products_per_page') && filter_var($request->products_per_page, FILTER_VALIDATE_INT) !== false) {
            $products_per_page = (int) $request->products_per_page;
        }

        if ($request->has('page') && filter_var($request->page, FILTER_VALIDATE_INT) !== false) {
            $page = (int) $request->page;
        }

        $products = Product::with([
            'category',
            'images' => function ($query) {
                // Order images by sort value
                $query->orderBy('sort', 'asc');
            }
        ])
            ->when($category_id !== null, function ($query) use ($category_id) {
                return $query->where('category_id', $category_id);
            })
            ->when($request->has('status'), function ($query) use ($status) {
                return $query->where('status', $status);
            })
            ->when($products_per_page !== null, function ($query) use ($products_per_page, $page) {
                return $query->paginate(perPage: $products_per_page, page: $page ?? 1);
            }, function ($query) {
                return $query->get();
            });

        // Transform the products to include image URLs
        $transformedProducts = $this->transformProducts($products);

        // Format response based on whether pagination was used
        $response = [
            'success' => true,
            'message' => 'Products retrieved successfully',
            'data' => $transformedProducts,
        ];

        return response()->json($response);
    }

    /**
     * Transform a collection of products to include image URLs
     */
    private function transformProducts($products)
    {
        if (method_exists($products, 'map')) {
            return $products->map(function ($product) {
                return $this->transformProduct($product);
            });
        }

        return $products;
    }

    /**
     * Transform a single product to include image URLs
     */
    private function transformProduct($product)
    {
        $transformed = $product->toArray();

        if (isset($transformed['images']) && count($transformed['images']) > 0) {
            foreach ($transformed['images'] as &$image) {
                // Add a full URL for each image
                $image['url'] = asset('storage/' . $image['path']);
            }
        }
        $data = [
            'title' => $transformed['title'],
            'description' => $transformed['description'],
            'status' => $transformed['status'],
            'price' => $transformed['price'],
            'stock' => $transformed['stock'] ?? null,
            'images' => $transformed['images'],
            'category' => $transformed['category']['name'],
        ];

        return $data;
    }

    /**
     * Get a single product by ID
     */
    public function show($product)
    {
        $product = Product::find($product);
        if(!$product) {
            return response()->json([
                'success' => false,
                'message' => 'product not found',
            ],400);
        }
        $product->load([
            'category',
            'images' => function ($query) {
                $query->orderBy('sort', 'asc');
            }
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Product retrieved successfully',
            'product' => $this->transformProduct($product)
        ]);
    }
    /**
     * Store a new product with multiple images
     */
    public function store(Request $request)
    {
        DB::beginTransaction();

        // Check if the user is an admin
        if (auth()->user()->email !== 'Admin@product.com') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        // Validate incoming request
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'price' => 'required|numeric|min:1',
            'stock' => 'nullable|integer|min:0',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {

            // Create the product
            $product = Product::create([
                'category_id' => $validated['category_id'],
                'title' => $validated['title'],
                'description' => $validated['description'],
                'price' => $validated['price'],
                'status' => $validated['status'],
                'stock' => $validated['stock'] ?? null,
            ]);

            // Process and save images
            if ($request->hasFile('images')) {
                $this->saveProductImages(
                    $product,
                    $request->file('images'),
                );
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Product created successfully',
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to create product' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update an existing product and its images
     */
    /**
     * Update an existing product and its images
     */
    public function update(Request $request, Product $product)
    {
        // Check if the user is an admin
        if (auth()->user()->email !== 'Admin@product.com') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        // Validate incoming request
        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:active,inactive',
            'price' => 'nullable|numeric|min:1',
            'stock' => 'nullable|integer|min:0',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'removed_images' => 'nullable|array',
            'removed_images.*' => 'integer|exists:product_images,id'
        ]);

        try {
            DB::beginTransaction();

            // Update product details
            $product->update([
                'category_id' => $validated['category_id'] ?? $product->category_id,
                'title' => $validated['title'] ?? $product->title,
                'description' => $validated['description'] ?? $product->description,
                'status' => $validated['status'] ?? $product->status,
                'price' => $validated['price'] ?? $product->price,
                'stock' => $validated['stock'] ?? $product->stock,
            ]);

            // Handle image removals if specified
            if ($request->has('removed_images')) {
                $this->removeProductImages($product, $request->removed_images);

                // Reorder remaining images
                $this->reorderProductImages($product);
            }

            // Process new images if any
            if ($request->hasFile('images')) {
                $this->saveProductImages(
                    $product,
                    $request->file('images'),
                );
            }

            DB::commit();

            // Load the updated product with images
            $product->load([
                'category',
                'images' => function ($query) {
                    $query->orderBy('sort', 'asc');
                }
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully',
                'product' => $this->transformProduct($product)
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to update product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reorder product images after removal
     */
    private function reorderProductImages($product)
    {
        $images = $product->images()->orderBy('sort', 'asc')->get();
        foreach ($images as $index => $image) {
            if ($image->sort !== $index) {
                $image->update(['sort' => $index]);
            }
        }
    }
    /**
     * Delete a product and all associated images
     */
    public function destroy(Product $product)
    {
        // Check if the user is an admin
        if (auth()->user()->email !== 'Admin@product.com') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        try {
            DB::beginTransaction();

            // Delete all associated images from storage
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->path);
            }

            // Delete the product (will cascade delete the images in the database)
            $product->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Save product images to storage and database
     */
    private function saveProductImages($product, $images)
    {
        $count = 0;

        foreach ($images as $index => $image) {
            // Generate a unique filename
            $filename = uniqid('product_') . '.' . $image->getClientOriginalExtension();

            //check if the folder exists
            if (!Storage::disk('public')->exists('products')) {
                Storage::disk('public')->makeDirectory('products');
            }
            // Store the file
            $path = $image->storeAs('products/' . $product->id, $filename, 'public');

            // Save image record to database
            $product->images()->create([
                'path' => $path,
                'sort' => $count++
            ]);
        }
    }

    /**
     * Remove product images from storage and database
     */
    private function removeProductImages($product, $imageIds)
    {
        foreach ($imageIds as $imageId) {
            $image = ProductImage::find($imageId);

            if ($image && $image->product_id == $product->id) {
                // Delete file from storage
                Storage::disk('public')->delete($image->path);

                // Delete record from database
                $image->delete();
            }
        }
    }
}
