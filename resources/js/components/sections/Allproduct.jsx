import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay, Thumbs } from "swiper/modules";
import { API_URL } from '../../services/api';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/autoplay";

function ProductsPage() {
    const BASE_URL = `${API_URL}`;
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null); // إضافة الـ state المفقود
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const handleViewDetails = (product) => setSelectedProduct(product);
    const onBack = () => setSelectedProduct(null);

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
                const res = await fetch(`${BASE_URL}/api/products`);
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.message || `فشل جلب المنتجات (حالة: ${res.status})`);
                }
                const data = await res.json();
                const list = Array.isArray(data.data) ? data.data : [];
                setProducts(shuffle(list));
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [BASE_URL]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
                <p className="text-gray-700 text-lg">جارٍ تحميل المنتجات...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-red-50 p-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">حدث خطأ</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md"
                    >
                        إعادة المحاولة
                    </button>
                </div>
            </div>
        );
    }

    if (selectedProduct) {
        const product = selectedProduct;
        const priceNumber = Number(product.price);
        const isAvailable = product.status === "active";

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8" dir="rtl">
                <div className="max-w-7xl mx-auto">
                    <button 
                        onClick={onBack} 
                        className="flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        عودة للمنتجات
                    </button>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-xl overflow-hidden p-6">
                        {/* Product Images */}
                        <div className="space-y-4">
                            <div className="rounded-2xl overflow-hidden">
                                <Swiper
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[Navigation, Thumbs, Autoplay]}
                                    autoplay={{ delay: 3000 }}
                                    className="h-80 md:h-96"
                                >
                                    {product.images && product.images.length > 0 ? (
                                        product.images.map((img, idx) => (
                                            <SwiperSlide key={idx}>
                                                <img 
                                                    src={img?.url ? img.url : `${BASE_URL}/storage/${img?.path || ''}`} 
                                                    alt={product.title} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </SwiperSlide>
                                        ))
                                    ) : (
                                        <SwiperSlide>
                                            <div className="h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            </div>
                            
                            {product.images && product.images.length > 1 && (
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[Thumbs]}
                                    className="h-24"
                                >
                                    {product.images.map((img, idx) => (
                                        <SwiperSlide key={idx}>
                                            <img 
                                                src={img?.url ? img.url : `${BASE_URL}/storage/${img?.path || ''}`} 
                                                alt={`${product.title} ${idx + 1}`} 
                                                className="w-full h-full object-cover rounded-lg cursor-pointer"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="py-4">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
                            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                            
                            <div className="flex items-center mb-6">
                                <span className="text-3xl font-bold text-green-600">${priceNumber.toFixed(2)}</span>
                                {product.originalPrice && (
                                    <span className="text-lg text-gray-400 line-through mr-3">
                                        ${Number(product.originalPrice).toFixed(2)}
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex items-center mb-6">
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {isAvailable ? '🟢 متوفر' : '🔴 غير متوفر'}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-blue-50 p-3 rounded-xl">
                                    <div className="text-blue-800 font-medium">الشركة</div>
                                    <div className="text-gray-700">{product.category?.name || "غير محدد"}</div>
                                </div>
                                <div className="bg-green-50 p-3 rounded-xl">
                                    <div className="text-green-800 font-medium">الحالة</div>
                                    <div className="text-gray-700">{isAvailable ? "جديد" : "قريباً"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8" dir="rtl">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">كل المنتجات</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">يتم ترتيب المنتجات عشوائياً في كل تحديث للصفحة</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {products.length > 0 ? products.map((prod) => {
                        const isAvailable = prod.status === 'active';
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
                                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {isAvailable ? 'متوفر' : 'قريباً'}
                                    </div>
                                    {!isAvailable && (
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">قريباً</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{prod.title}</h3>
                                    {prod.category?.name && (
                                        <div className="mb-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                {prod.category.name}
                                            </span>
                                        </div>
                                    )}
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{prod.description}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-green-600 font-bold text-lg">${Number(prod.price).toFixed(2)}</p>
                                        <button 
                                            onClick={() => isAvailable && handleViewDetails(prod)} 
                                            disabled={!isAvailable}
                                            className={`px-4 py-2 rounded-lg transition-colors duration-300 text-sm text-white ${isAvailable ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed opacity-70'}`}
                                            aria-disabled={!isAvailable}
                                            title={isAvailable ? 'عرض التفاصيل' : 'غير متوفر حالياً'}
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
            </div>
        </div>
    );
}

export default ProductsPage;