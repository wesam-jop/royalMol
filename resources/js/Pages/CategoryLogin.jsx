import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function CategoryLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        Inertia.post('/categories/login', { email, password }, {
            onError: (errors) => {
                setErrors(errors);
                setLoading(false);
            },
            onSuccess: () => {
                setLoading(false);
                Inertia.visit('/categories/dashboard'); // ✅ توجيه بعد تسجيل الدخول
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* العمود التعريفي */}
                <div className="hidden md:flex flex-col justify-center rounded-3xl bg-gradient-to-br from-orange-100 via-white to-orange-50 backdrop-blur p-10 shadow-lg border border-orange-100">
                    <h1 className="text-3xl font-extrabold text-[#082755] mb-4">
                        أهلاً بك في <span className="text-[#fe8668]">بازارلي</span>!
                    </h1>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        سجّل دخولك لإدارة بيانات شركتك وإضافة منتجاتك بسهولة على منصة بازارلي.
                    </p>
                    <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-[#fe8668] rounded-full ml-2"></span>
                            إدارة البيانات الأساسية للشركة
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-[#fe8668] rounded-full ml-2"></span>
                            إضافة وتعديل المنتجات والعروض الخاصة
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-[#fe8668] rounded-full ml-2"></span>
                            عرض المنتجات بشكل منظم لعملائك
                        </li>
                    </ul>
                </div>

                {/* العمود الخاص بالفورم */}
                <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-10">
                    <div className="mb-8 text-center">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-[#fe8668]/10 text-[#fe8668] flex items-center justify-center mb-4">
                            <span className="text-3xl">🛍️</span>
                        </div>
                        <h2 className="text-2xl font-bold text-[#082755]">تسجيل دخول الشركة</h2>
                        <p className="text-gray-500 text-sm mt-1">أدخل بيانات حسابك للمتابعة</p>
                    </div>

                    {errors.email && (
                        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm text-center shadow-sm">
                            {errors.email}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">البريد الإلكتروني</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fe8668] placeholder-gray-400"
                                placeholder="example@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">كلمة المرور</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fe8668] placeholder-gray-400"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#fe8668] hover:bg-[#e55b44] text-white py-3 rounded-xl text-lg font-semibold shadow-md transition disabled:bg-[#fe8668]/50"
                            disabled={loading}
                        >
                            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                        </button>
                    </form>

                    <p className="text-xs text-gray-400 mt-6 text-center">
                        © {new Date().getFullYear()} بازارلي - جميع الحقوق محفوظة
                    </p>
                </div>
            </div>
        </div>
    );
}
