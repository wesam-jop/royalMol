import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay, Thumbs } from "swiper/modules";
import { API_URL } from "../../services/api";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/autoplay";

export default function ProductGrid() {
    const BASE_URL = `${API_URL}`;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [displayedProducts, setDisplayedProducts] = useState(8);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/api/products`);
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `فشل جلب المنتجات (حالة: ${response.status})`);
                }
                const data = await response.json();
                const list = Array.isArray(data.data) ? data.data : [];
                const sorted = [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setProducts(sorted.slice(0, 8));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [BASE_URL]);

    const handleViewDetails = (product) => setSelectedProduct(product);
    const onBack = () => setSelectedProduct(null);
    const currentProducts = products.slice(0, displayedProducts);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff6f4] to-[#ffeae5]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#fe8668] mb-4"></div>
            <p className="text-[#e55b44] text-lg">جارٍ تحميل المنتجات...</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff6f4] to-[#ffeae5] p-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">حدث خطأ</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="px-6 py-3 bg-gradient-to-r from-[#fe8668] to-[#e55b44] text-white rounded-full hover:opacity-90 transition-all duration-300 shadow-md"
                >
                    إعادة المحاولة
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#fff6f4] to-white p-4 md:p-8" dir="rtl">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-5 py-2 bg-gradient-to-r from-[#fe8668] to-[#e55b44] text-white text-sm font-semibold rounded-full mb-4">
                        منتجات بازارلي
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#082755] mb-3">
                        استكشف تشكيلتنا المميزة
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        نوفر لك أحدث المنتجات بأسعار منافسة وخيارات دفع سهلة، مع توصيل سريع أينما كنت
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {currentProducts.length > 0 ? currentProducts.map(prod => {
                        const isProdAvailable = prod.status === "active";
                        return (
                            <div key={prod.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="relative h-56 overflow-hidden">
                                    {prod.images && prod.images.length > 0 ? (
                                        <img 
                                            src={prod.images[0]?.url ? prod.images[0].url : `${BASE_URL}/storage/${prod.images[0]?.path || ''}`} 
                                            alt={prod.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${isProdAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {isProdAvailable ? 'متوفر' : 'قريباً'}
                                    </div>
                                    {!isProdAvailable && (
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">قريباً</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{prod.title}</h3>
                                    {prod.category?.name && (
                                        <span className="inline-block mb-2 px-3 py-1 text-xs font-medium rounded-full bg-[#fff1ee] text-[#e55b44] border border-[#ffd9d2]">
                                            {prod.category.name}
                                        </span>
                                    )}
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{prod.description}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#e55b44] font-bold text-lg">${Number(prod.price).toFixed(2)}</p>
                                        <button 
                                            onClick={() => isProdAvailable && handleViewDetails(prod)} 
                                            disabled={!isProdAvailable}
                                            className={`px-4 py-2 rounded-lg text-sm text-white transition-all duration-300 ${isProdAvailable ? 'bg-gradient-to-r from-[#fe8668] to-[#e55b44] hover:opacity-90 shadow-md' : 'bg-gray-400 cursor-not-allowed opacity-70'}`}
                                            aria-disabled={!isProdAvailable}
                                        >
                                            عرض التفاصيل
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="col-span-full text-center py-12">
                            <div className="bg-white rounded-2xl p-8 shadow-md max-w-md mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 4h6m-6 4h6" />
                                </svg>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد منتجات</h3>
                                <p className="text-gray-500">لم يتم العثور على أي منتجات لعرضها حالياً</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* زر عرض كل المنتجات */}
                <div className="text-center">
                    <button 
                        onClick={() => { window.location.href = '/pageProduct'; }}
                        className="px-8 py-3 bg-gradient-to-r from-[#fe8668] to-[#e55b44] text-white rounded-full hover:opacity-90 transition-all duration-300 shadow-md inline-flex items-center justify-center"
                    >
                        عرض كل المنتجات
                    </button>
                </div>
            </div>
        </div>
    );
}
