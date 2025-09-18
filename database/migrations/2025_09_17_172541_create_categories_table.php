<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('email')->unique()->nullable()->after('name')->comment('الإيميل الخاص بالشركة');
            $table->string('password')->nullable()->after('email')->comment('كلمة المرور للفئة');
            $table->string('image')->nullable()->after('password')->comment('مسار صورة الشركة');
            $table->index('email');
        });
    }

    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['email', 'password', 'image']);
        });
    }
};