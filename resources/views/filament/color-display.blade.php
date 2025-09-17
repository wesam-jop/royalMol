<div class="flex space-x-1 space-x-reverse">
    <div class="w-4 h-4 rounded-full border border-gray-300"
        style="background-color: {{ $getRecord()->primary_color ?? '#3b82f6' }}" title="اللون الأساسي"></div>
    <div class="w-4 h-4 rounded-full border border-gray-300"
        style="background-color: {{ $getRecord()->secondary_color ?? '#64748b' }}" title="اللون الثانوي"></div>
    <div class="w-4 h-4 rounded-full border border-gray-300"
        style="background-color: {{ $getRecord()->accent_color ?? '#10b981' }}" title="لون التمييز"></div>
</div>
