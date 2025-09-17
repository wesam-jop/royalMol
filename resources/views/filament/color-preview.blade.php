<div class="space-y-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <!-- معاينة اللون الأساسي -->
        <div class="text-center">
            <div class="w-full h-16 rounded-lg border"
                style="background-color: {{ $getRecord()?->primary_color ?? '#3b82f6' }}"></div>
            <p class="text-xs mt-2 text-gray-600">الأساسي</p>
        </div>

        <!-- معاينة اللون الثانوي -->
        <div class="text-center">
            <div class="w-full h-16 rounded-lg border"
                style="background-color: {{ $getRecord()?->secondary_color ?? '#64748b' }}"></div>
            <p class="text-xs mt-2 text-gray-600">الثانوي</p>
        </div>

        <!-- معاينة لون التمييز -->
        <div class="text-center">
            <div class="w-full h-16 rounded-lg border"
                style="background-color: {{ $getRecord()?->accent_color ?? '#10b981' }}"></div>
            <p class="text-xs mt-2 text-gray-600">التمييز</p>
        </div>

        <!-- معاينة لون الخلفية -->
        <div class="text-center">
            <div class="w-full h-16 rounded-lg border border-gray-300"
                style="background-color: {{ $getRecord()?->background_color ?? '#ffffff' }}"></div>
            <p class="text-xs mt-2 text-gray-600">الخلفية</p>
        </div>
    </div>

    <!-- معاينة الهيدر والفوتر -->
    <div class="space-y-2">
        <div class="p-4 rounded-lg text-white text-center font-medium"
            style="background-color: {{ $getRecord()?->header_bg ?? '#1f2937' }}">
            هيدر نموذجي
        </div>
        <div class="p-4 rounded-lg text-white text-center font-medium"
            style="background-color: {{ $getRecord()?->footer_bg ?? '#374151' }}">
            فوتر نموذجي
        </div>
    </div>

    <!-- مثال على الأزرار -->
    <div class="flex flex-wrap gap-2 justify-center">
        <button class="px-4 py-2 rounded text-white font-medium"
            style="background-color: {{ $getRecord()?->primary_color ?? '#3b82f6' }}">
            زر أساسي
        </button>
        <button class="px-4 py-2 rounded text-white font-medium"
            style="background-color: {{ $getRecord()?->secondary_color ?? '#64748b' }}">
            زر ثانوي
        </button>
        <button class="px-4 py-2 rounded text-white font-medium"
            style="background-color: {{ $getRecord()?->accent_color ?? '#10b981' }}">
            زر تمييز
        </button>
    </div>

    <!-- مثال على النص -->
    <div class="p-4 rounded-lg border"
        style="background-color: {{ $getRecord()?->background_color ?? '#ffffff' }};
                color: {{ $getRecord()?->text_color ?? '#1f2937' }}">
        <p class="text-center">هذا مثال على النص مع الخلفية المختارة</p>
    </div>
</div>
