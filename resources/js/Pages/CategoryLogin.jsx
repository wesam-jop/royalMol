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
            onSuccess: () => setLoading(false),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="hidden md:flex flex-col justify-center rounded-2xl bg-white/70 backdrop-blur p-8 shadow-lg border border-gray-100">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-3">أهلاً بك!</h1>
                    <p className="text-gray-600 leading-relaxed">
                        سجّل دخولك لإدارة بيانات الشركة الخاصة بك وإضافة المنتجات بسهولة.
                    </p>
                    <ul className="mt-6 space-y-2 text-sm text-gray-600">
                        <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span> إدارة البيانات الأساسية للشركة</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span> إضافة وتعديل المنتجات</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span> عرض المنتجات بشكل منظم</li>
                    </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <div className="mb-6 text-center">
                        <div className="mx-auto w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                            <span className="text-2xl">🛍️</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">تسجيل دخول الشركة</h2>
                        <p className="text-gray-500 text-sm mt-1">الرجاء إدخال بيانات الدخول</p>
                    </div>

                    {errors.email && (
                        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
                            {errors.email}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 mb-2">الإيميل</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                placeholder="example@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">كلمة المرور</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:bg-blue-300"
                            disabled={loading}
                        >
                            {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
                        </button>
                    </form>

                    <p className="text-xs text-gray-400 mt-6 text-center">© {new Date().getFullYear()} RoyalMol</p>
                </div>
            </div>
        </div>
    );
}