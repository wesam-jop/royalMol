import { useEffect, useState } from 'react';

export default function AllCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const shuffle = (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/categories');
                if (!res.ok) throw new Error(`فشل جلب الفئات (${res.status})`);
                const data = await res.json();
                const list = Array.isArray(data.data) ? data.data : [];
                setCategories(shuffle(list));
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const goToCategoryProducts = (id) => {
        window.location.href = `/categories/${id}/products`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8" dir="rtl">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">كل الفئات</h1>
                    <p className="text-gray-600">يتم ترتيب الفئات عشوائياً مع كل تحديث</p>
                </div>

                {loading && (
                    <div className="text-center text-gray-600">جارٍ التحميل...</div>
                )}
                {error && (
                    <div className="text-center text-red-600">{error}</div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.map((cat) => (
                            <div key={cat.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                                <div className="relative h-48 bg-gray-100 overflow-hidden">
                                    {cat.image ? (
                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-gray-400">لا توجد صورة</div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-3 line-clamp-1">{cat.name}</h3>
                                    <button
                                        onClick={() => goToCategoryProducts(cat.id)}
                                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        عرض المنتجات 
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


