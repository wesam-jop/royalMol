<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Api\SettingController;

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');
Route::apiResource('products', \App\Http\Controllers\ProductController::class)->only(['index', 'show']);
Route::apiResource('products', \App\Http\Controllers\ProductController::class)->only(['store', 'update', 'destroy'])->middleware('auth:sanctum');
Route::apiResource('categories', \App\Http\Controllers\CategoryController::class)->only(['store', 'update', 'destroy'])->middleware('auth:sanctum');
Route::apiResource('categories', \App\Http\Controllers\CategoryController::class)->only(['index','show']);

Route::prefix('settings')->group(function () {

    // جلب جميع الإعدادات
    Route::get('/', [SettingController::class, 'index']);

    // تحديث الإعدادات (PUT أو PATCH)
    Route::put('/', [SettingController::class, 'update']);
    Route::patch('/', [SettingController::class, 'update']);

    // مسارات فرعية لجلب معلومات محددة
    Route::get('/company', [SettingController::class, 'getCompanyInfo']);
    Route::get('/contact', [SettingController::class, 'getContactInfo']);
    Route::get('/whatsapp', [SettingController::class, 'getWhatsappDepartments']);
});
