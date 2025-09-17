<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Get all categories
     * @return mixed
     */
    public function index()
    {
        return response()->json(
            [
                'success' => true,
                'message' => 'Products retrieved successfully',
                'categories' => Category::pluck('name'),
            ],
            200
        );
    }

    /**
     * Store a new category
     * @param \Illuminate\Http\Request $request
     * @return mixed
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

        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
            ]);

            Category::create([
                'name' => $validated['name'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Category created successfully',
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to create category' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * return category by id
     * @param mixed $category
     * @return mixed
     */
    public function show($category)
    {
        $category = Category::find($category);
        if(!$category) {
            return response()->json([
                'success' => false,
                'message' => 'category not found',
            ],400);
        }
        return response()->json([
            'success' => true,
            'message' => 'Category retrieved successfully',
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
            ],
        ]);
    }

    /**
     * update single category
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Category $category
     * @return mixed
     */
    public function update(Request $request, Category $category)
    {
        DB::beginTransaction();

        // Check if the user is an admin
        if (auth()->user()->email !== 'Admin@product.com') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
            ]);

            if(!$category) {
                return response()->json([
                    'success' => false,
                    'message' => 'category not found',
                ],400);
            }

            $category->update([
                'name' => $validated['name'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Category updated successfully',
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to create category' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete single category
     * @param \App\Models\Category $category
     * @return mixed
     */
    public function destroy(Category $category)
    {
        // Check if the user is an admin
        if (auth()->user()->email !== 'Admin@product.com') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        if(!$category) {
            return response()->json([
                'success' => false,
                'message' => 'category not found',
            ],400);
        }
        $category->delete();
        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully',
        ], 201);
    }

}
