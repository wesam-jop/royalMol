<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;

// الصفحة الرئيسية
Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/pageProduct', function () {
    return Inertia::render('ProductAll');
});

// Category authentication routes
Route::prefix('categories')->group(function () {
    // صفحة تسجيل الدخول
    Route::get('/login', [CategoryController::class, 'showLogin'])
        ->name('category.login');
    
    // معالجة تسجيل الدخول
    Route::post('/login', [CategoryController::class, 'login'])
        ->name('category.login.process');
    
    // لوحة التحكم (تحتاج تسجيل دخول)
    Route::get('/dashboard', [CategoryController::class, 'dashboard'])
        ->name('category.dashboard');
    
    // تسجيل الخروج
    Route::post('/logout', [CategoryController::class, 'logout'])
        ->name('category.logout');
});

// يمكنك إضافة روتس إضافية حسب الحاجة
// مثل صفحات عرض المنتجات للمستخدمين العاديين
Route::get('/products', function () {
    return Inertia::render('Products/Index');
})->name('products.index');

Route::get('/products/{product}', function ($product) {
    return Inertia::render('Products/Show', ['productId' => $product]);
})->name('products.show');