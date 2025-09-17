<!DOCTYPE html>
<html dir="rtl">

<head>
    <title id="page-title">{{ $settings['API_TITLE'] ?? 'الموقع' }}</title>
    <link rel="icon" href="{{ asset('favicon.svg') }}">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="{{ $themeColors['primary_color'] ?? '#ffffff' }}">
    <meta name="description" content="{{ $settings['API_Descraption'] ?? 'وصف الموقع' }}" />

    <!-- تطبيق الألوان فوراً -->
    <style id="dynamic-theme-colors">
        :root {
            --primary-color: {{ $themeColors['primary_color'] ?? '#3b82f6' }};
            --secondary-color: {{ $themeColors['secondary_color'] ?? '#64748b' }};
            --accent-color: {{ $themeColors['accent_color'] ?? '#10b981' }};
            --background-color: {{ $themeColors['background_color'] ?? '#ffffff' }};
            --text-color: {{ $themeColors['text_color'] ?? '#1f2937' }};
            --header-bg: {{ $themeColors['header_bg'] ?? '#1f2937' }};
            --footer-bg: {{ $themeColors['footer_bg'] ?? '#374151' }};

            /* متغيرات مشتقة للـ hover effects */
            --primary-hover: color-mix(in srgb, var(--primary-color) 90%, black);
            --secondary-hover: color-mix(in srgb, var(--secondary-color) 90%, black);
            --accent-hover: color-mix(in srgb, var(--accent-color) 90%, black);
        }

        /* تطبيق الألوان على العناصر الأساسية */
        body {
            background-color: var(--background-color);
            color: var(--text-color);
        }

        /* Classes للاستخدام السريع */
        .bg-primary {
            background-color: var(--primary-color) !important;
        }

        .bg-secondary {
            background-color: var(--secondary-color) !important;
        }

        .bg-accent {
            background-color: var(--accent-color) !important;
        }

        .bg-surface {
            background-color: var(--background-color) !important;
        }

        .text-primary {
            color: var(--primary-color) !important;
        }

        .text-secondary {
            color: var(--secondary-color) !important;
        }

        .text-accent {
            color: var(--accent-color) !important;
        }

        .text-main {
            color: var(--text-color) !important;
        }

        .border-primary {
            border-color: var(--primary-color) !important;
        }

        .border-secondary {
            border-color: var(--secondary-color) !important;
        }

        /* Swiper buttons مع الألوان الجديدة */
        .swiper-button-next,
        .swiper-button-prev,
        .swiper-pagination-bullet-active {
            color: var(--primary-color) !important;
        }

        .swiper-pagination-bullet.swiper-pagination-bullet-active {
            background: var(--primary-color) !important;
        }

        .swiper-pagination-bullet {
            width: 20px !important;
            border-radius: 20px !important;
        }

        /* أزرار ديناميكية */
        .btn-dynamic-primary {
            background-color: var(--primary-color);
            color: white;
            transition: background-color 0.2s;
        }

        .btn-dynamic-primary:hover {
            background-color: var(--primary-hover);
        }

        .btn-dynamic-secondary {
            background-color: var(--secondary-color);
            color: white;
            transition: background-color 0.2s;
        }

        .btn-dynamic-secondary:hover {
            background-color: var(--secondary-hover);
        }
    </style>

    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/css/app.css'])
</head>

<body>
    @inertia

    <script>
        // تمرير البيانات للـ JavaScript
        window.siteSettings = @json($settings ?? []);
        window.themeColors = @json($themeColors ?? []);

        // تحديث العنوان من API إذا لزم الأمر
        const updateTitleFromAPI = async () => {
            try {
                const response = await fetch('/api/settings');
                const result = await response.json();
                if (result.success && result.data.API_TITLE) {
                    document.getElementById('page-title').textContent = result.data.API_TITLE;
                    document.title = result.data.API_TITLE;
                }
            } catch (error) {
                console.warn('فشل في تحديث العنوان من API:', error);
            }
        };

        // تحديث الألوان من API
        const updateColorsFromAPI = async () => {
            try {
                const response = await fetch('/api/settings/theme/colors');
                const result = await response.json();
                if (result.success) {
                    const colors = result.data;
                    const root = document.documentElement;

                    Object.entries(colors).forEach(([key, value]) => {
                        const cssVar = `--${key.replace('_', '-')}`;
                        root.style.setProperty(cssVar, value);
                    });

                    // تحديث window.themeColors للاستخدام في React
                    window.themeColors = colors;
                }
            } catch (error) {
                console.warn('فشل في تحديث الألوان من API:', error);
            }
        };

        // تشغيل التحديثات عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', () => {
            updateTitleFromAPI();
            // updateColorsFromAPI(); // اختياري - إذا كنت تريد تحديث مستمر
        });
    </script>
</body>

</html>
