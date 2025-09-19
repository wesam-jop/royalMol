import { useEffect, useState } from 'react';

export default function CategorySection() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/categories');
                if (!res.ok) throw new Error(`فشل جلب الفئات (${res.status})`);
                const data = await res.json();
                const list = Array.isArray(data.data) ? data.data : [];
                setCategories(list.slice(0, 4));
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const goToAllCategories = () => {
        window.location.href = '/pageCategory';
    };

    const goToCategoryProducts = (categoryId) => {
        window.location.href = `/categories/${categoryId}/products`;
    };

    return (
        <section className="py-12" id="categories">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">الفئات</h2>
                    <button onClick={goToAllCategories} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                        عرض جميع الفئات
                    </button>
                </div>

                {loading && <div className="text-gray-500">جارٍ التحميل...</div>}
                {error && <div className="text-red-600">{error}</div>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </section>
    );
}