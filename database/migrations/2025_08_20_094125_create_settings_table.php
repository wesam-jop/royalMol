<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();

            // معلومات الشركة
            $table->string('API_TITLE', 255)->nullable()->comment('اسم الشركة');
            $table->longText('API_Descraption')->nullable()->comment('وصف الشركة');
            $table->string('API_location', 500)->nullable()->comment('عنوان الشركة');

            // معلومات التواصل
            $table->string('Numper_Phone', 20)->nullable()->comment('رقم الهاتف الرئيسي');
            $table->string('API_LinkFacebook', 255)->nullable()->comment('رابط صفحة فيسبوك');
            $table->string('API_LinkInstagram', 255)->nullable()->comment('رابط صفحة انستغرام');

            // أقسام الواتساب (JSON)
            $table->json('API_whatsappDepartments')->nullable()->comment('أقسام الواتساب مع أرقامها');

            $table->timestamps();

            // إضافة فهارس للبحث السريع
            $table->index('API_TITLE');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
