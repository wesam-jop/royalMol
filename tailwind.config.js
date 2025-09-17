/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/js/**/*.{js,jsx,ts,tsx}", // مسار ملفاتك React + Inertia
        "./resources/views/**/*.blade.php", // لو تستخدم Blade views
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
