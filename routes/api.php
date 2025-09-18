<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Models\TeamMember;

// Authentication routes للأدمن
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

// Category authentication routes
Route::post('/categories/login', [CategoryController::class, 'login']);
Route::get('/categories/me', [CategoryController::class, 'me'])->middleware('auth:sanctum');
Route::post('/categories/logout', [CategoryController::class, 'apiLogout'])->middleware('auth:sanctum');

// Protected category routes (يحتاج تسجيل دخول بالتوكن)
Route::middleware(['auth:sanctum'])->group(function () {
    // Category management
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    
    // Product management (للفئات والأدمن)
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
});

// Public API routes (لا تحتاج تسجيل دخول)
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

// Settings API
Route::prefix('settings')->group(function () {
    Route::get('/', [SettingController::class, 'index']);
    Route::put('/', [SettingController::class, 'update'])->middleware('auth:sanctum');
    Route::patch('/', [SettingController::class, 'update'])->middleware('auth:sanctum');
    Route::get('/company', [SettingController::class, 'getCompanyInfo']);
    Route::get('/contact', [SettingController::class, 'getContactInfo']);
    Route::get('/whatsapp', [SettingController::class, 'getWhatsappDepartments']);
});

// Public Team API
Route::get('/team', function () {
    $members = TeamMember::query()
        ->where('is_active', true)
        ->orderBy('sort', 'asc')
        ->get()
        ->map(function ($m) {
            $social = $m->social ?? [];
            // If saved via Repeater as a list of {type, url}, convert to keyed object
            if (is_array($social)) {
                $isList = array_keys($social) === range(0, count($social) - 1);
                if ($isList) {
                    $normalized = [];
                    foreach ($social as $entry) {
                        if (is_array($entry) && isset($entry['type'], $entry['url']) && $entry['type'] && $entry['url']) {
                            $normalized[$entry['type']] = $entry['url'];
                        }
                    }
                    $social = $normalized;
                }
            }
            return [
                'id' => $m->id,
                'name' => $m->name,
                'role' => $m->role,
                'bio' => $m->bio,
                'avatar' => $m->avatar ? asset('storage/' . $m->avatar) : null,
                'social' => $social,
            ];
        });

    return response()->json([
        'success' => true,
        'data' => $members,
    ]);
});