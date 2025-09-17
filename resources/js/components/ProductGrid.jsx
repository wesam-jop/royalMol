import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { API_URL } from "../services/api";
// Note: In a real project, you would import these Swiper CSS files
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Logo from "../assets/images/logo.jpg";

export default function ProductGrid() {
    const BASE_URL = `${API_URL}`;

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [displayedProducts, setDisplayedProducts] = useState(8);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/api/categories`);
                if (!response.ok) throw new Error("فشل جلب الأقسام");
                const data = await response.json();
                const cats = Array.isArray(data.categories)
                    ? data.categories
                    : [];
                setCategories(cats);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [BASE_URL]);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url =
                    selectedCategoryId !== null
                        ? `${BASE_URL}/api/products?category=${encodeURIComponent(
                              selectedCategoryId
                          )}`
                        : `${BASE_URL}/api/products`;
                const response = await fetch(url);
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(
                        errorData.message ||
                            `فشل جلب المنتجات (حالة: ${response.status})`
                    );
                }
                const data = await response.json();
                const prods = Array.isArray(data.data)
                    ? data.data
                    : Array.isArray(data)
                    ? data
                    : [];
                setProducts(prods);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategoryId, BASE_URL]);

    useEffect(() => {
        if (selectedCategoryId === null) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(
                (product) =>
                    product.category.toLowerCase() ===
                    selectedCategoryId.toLowerCase()
            );
            setFilteredProducts(filtered);
        }
        setDisplayedProducts(8); // Reset displayed products when filtering
    }, [products, selectedCategoryId]);

    const refreshProducts = () => {
        setError(null);
        setSelectedCategoryId(null);
        // Force refetch by changing the dependency
        window.location.reload();
    };

    const handleRetry = () => {
        setError(null);
        setLoading(true);
        setSelectedCategoryId(null);
        refreshProducts();
    };

    const loadMoreProducts = () => {
        setDisplayedProducts((prev) => prev + 4);
    };

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
    };

    const onBack = () => setSelectedProduct(null);

    if (loading) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center"
                dir="rtl"
            >
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                        <div className="absolute inset-0 border-4 border-red-200 rounded-full animate-pulse"></div>
                        <div className="absolute inset-2 border-4 border-red-600 rounded-full animate-spin border-t-transparent"></div>
                    </div>
                    <p className="text-gray-600 font-medium">جارٍ التحميل...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center"
                dir="rtl"
            >
                <div className="text-center">
                    <p className="text-red-500 mb-4 text-lg">{error}</p>
                    <button
                        onClick={handleRetry}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
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
            <div
                className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white py-8"
                dir="rtl"
            >
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-red-600/8 rounded-full blur-2xl"></div>
                </div>

                {/* Decorative SVG Background */}
                <div className="absolute inset-0 opacity-5">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 1200 800"
                        fill="none"
                    >
                        <circle
                            cx="200"
                            cy="150"
                            r="80"
                            stroke="#dc3545"
                            strokeWidth="1"
                        />
                        <circle
                            cx="1000"
                            cy="300"
                            r="120"
                            stroke="#dc3545"
                            strokeWidth="1"
                        />
                        <circle
                            cx="100"
                            cy="600"
                            r="60"
                            stroke="#dc3545"
                            strokeWidth="1"
                        />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Back Button */}
                    <button
                        onClick={onBack}
                        className="flex items-center gap-3 mb-8 bg-white rounded-full px-6 py-3 shadow-lg hover:shadow-red-500/20 transform hover:scale-105 transition-all duration-300 border border-gray-100"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center text-white">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </div>
                        <span className="font-medium text-gray-700">
                            العودة للمنتجات
                        </span>
                    </button>

                    {/* Product Details */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* Product Image Section */}
                            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                                {/* Actual Product Images with Swiper */}
                                <div className="w-full">
                                    {product.images?.length > 0 ? (
                                        product.images.length > 1 ? (
                                            <Swiper
                                                cssMode={true}
                                                navigation={true}
                                                pagination={true}
                                                mousewheel={true}
                                                keyboard={true}
                                                modules={[
                                                    Navigation,
                                                    Pagination,
                                                    Mousewheel,
                                                    Keyboard,
                                                ]}
                                                className=" overflow-hidden shadow-lg"
                                                style={{
                                                    "--swiper-navigation-color":
                                                        "#dc3545",
                                                    "--swiper-pagination-color":
                                                        "#dc3545",
                                                }}
                                            >
                                                {product.images.map(
                                                    (image, index) => (
                                                        <SwiperSlide
                                                            key={
                                                                image.path ||
                                                                index
                                                            }
                                                        >
                                                            <img
                                                                src={`${BASE_URL}/storage/${image.path}`}
                                                                alt={`${
                                                                    product.title
                                                                } - ${
                                                                    index + 1
                                                                }`}
                                                                className="w-full h-full object-cover"
                                                                loading="lazy"
                                                            />
                                                        </SwiperSlide>
                                                    )
                                                )}
                                            </Swiper>
                                        ) : (
                                            <img
                                                src={`${BASE_URL}/storage/${product.images[0].path}`}
                                                alt={product.title}
                                                className="w-full h-96 object-cover rounded-2xl shadow-lg"
                                            />
                                        )
                                    ) : (
                                        /* Fallback to SVG illustration */
                                        <svg
                                            width="300"
                                            height="400"
                                            viewBox="0 0 300 400"
                                            fill="none"
                                            className="drop-shadow-lg"
                                        >
                                            <g
                                                className="animate-bounce"
                                                style={{
                                                    animationDuration: "3s",
                                                }}
                                            >
                                                <rect
                                                    x="110"
                                                    y="100"
                                                    width="80"
                                                    height="200"
                                                    rx="12"
                                                    fill="url(#productBottleGradient)"
                                                    stroke="#dc3545"
                                                    strokeWidth="3"
                                                />
                                                <rect
                                                    x="120"
                                                    y="80"
                                                    width="60"
                                                    height="30"
                                                    rx="8"
                                                    fill="#dc3545"
                                                />
                                                <rect
                                                    x="120"
                                                    y="130"
                                                    width="60"
                                                    height="150"
                                                    rx="8"
                                                    fill="url(#productOilGradient)"
                                                    opacity="0.8"
                                                />

                                                <rect
                                                    x="125"
                                                    y="180"
                                                    width="50"
                                                    height="50"
                                                    rx="6"
                                                    fill="white"
                                                    stroke="#dc3545"
                                                    strokeWidth="1"
                                                />
                                                <text
                                                    x="150"
                                                    y="195"
                                                    textAnchor="middle"
                                                    fontSize="6"
                                                    fontWeight="bold"
                                                    fill="#dc3545"
                                                >
                                                    PREMIUM
                                                </text>
                                                <text
                                                    x="150"
                                                    y="208"
                                                    textAnchor="middle"
                                                    fontSize="8"
                                                    fontWeight="bold"
                                                    fill="#dc3545"
                                                >
                                                    {product.category &&
                                                    product.category.includes(
                                                        "محرك"
                                                    )
                                                        ? "5W-30"
                                                        : "PRO"}
                                                </text>
                                                <text
                                                    x="150"
                                                    y="220"
                                                    textAnchor="middle"
                                                    fontSize="5"
                                                    fill="#dc3545"
                                                >
                                                    {product.title.slice(0, 8)}
                                                </text>
                                            </g>

                                            <g
                                                className="animate-pulse"
                                                style={{
                                                    animationDelay: "0.5s",
                                                }}
                                            >
                                                <circle
                                                    cx="70"
                                                    cy="150"
                                                    r="4"
                                                    fill="url(#productDropGradient)"
                                                />
                                                <circle
                                                    cx="230"
                                                    cy="200"
                                                    r="3"
                                                    fill="url(#productDropGradient)"
                                                />
                                                <circle
                                                    cx="250"
                                                    cy="120"
                                                    r="5"
                                                    fill="url(#productDropGradient)"
                                                />
                                            </g>

                                            <g
                                                className="animate-spin"
                                                style={{
                                                    transformOrigin:
                                                        "60px 280px",
                                                    animationDuration: "8s",
                                                }}
                                            >
                                                <circle
                                                    cx="60"
                                                    cy="280"
                                                    r="20"
                                                    fill="none"
                                                    stroke="#dc3545"
                                                    strokeWidth="2"
                                                    opacity="0.4"
                                                />
                                                <circle
                                                    cx="60"
                                                    cy="280"
                                                    r="12"
                                                    fill="none"
                                                    stroke="#dc3545"
                                                    strokeWidth="1"
                                                    opacity="0.3"
                                                />
                                            </g>

                                            <g
                                                className="animate-spin"
                                                style={{
                                                    transformOrigin:
                                                        "240px 300px",
                                                    animationDuration: "10s",
                                                    animationDirection:
                                                        "reverse",
                                                }}
                                            >
                                                <circle
                                                    cx="240"
                                                    cy="300"
                                                    r="15"
                                                    fill="none"
                                                    stroke="#dc3545"
                                                    strokeWidth="2"
                                                    opacity="0.3"
                                                />
                                                <circle
                                                    cx="240"
                                                    cy="300"
                                                    r="8"
                                                    fill="none"
                                                    stroke="#dc3545"
                                                    strokeWidth="1"
                                                    opacity="0.2"
                                                />
                                            </g>

                                            <g transform="translate(200, 50)">
                                                <rect
                                                    x="-25"
                                                    y="-8"
                                                    width="50"
                                                    height="16"
                                                    rx="8"
                                                    fill={
                                                        isAvailable
                                                            ? "#10b981"
                                                            : "#ef4444"
                                                    }
                                                />
                                                <text
                                                    x="0"
                                                    y="2"
                                                    textAnchor="middle"
                                                    fontSize="8"
                                                    fill="white"
                                                    fontWeight="bold"
                                                >
                                                    {isAvailable
                                                        ? "متوفر"
                                                        : "قريباً"}
                                                </text>
                                            </g>

                                            <defs>
                                                <linearGradient
                                                    id="productBottleGradient"
                                                    x1="0%"
                                                    y1="0%"
                                                    x2="100%"
                                                    y2="100%"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        style={{
                                                            stopColor:
                                                                "#ffffff",
                                                            stopOpacity: 0.9,
                                                        }}
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        style={{
                                                            stopColor:
                                                                "#f3f4f6",
                                                            stopOpacity: 0.9,
                                                        }}
                                                    />
                                                </linearGradient>
                                                <linearGradient
                                                    id="productOilGradient"
                                                    x1="0%"
                                                    y1="0%"
                                                    x2="100%"
                                                    y2="100%"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        style={{
                                                            stopColor:
                                                                "#dc3545",
                                                            stopOpacity: 0.7,
                                                        }}
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        style={{
                                                            stopColor:
                                                                "#991b1b",
                                                            stopOpacity: 0.9,
                                                        }}
                                                    />
                                                </linearGradient>
                                                <radialGradient id="productDropGradient">
                                                    <stop
                                                        offset="0%"
                                                        style={{
                                                            stopColor:
                                                                "#dc3545",
                                                            stopOpacity: 0.8,
                                                        }}
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        style={{
                                                            stopColor:
                                                                "#991b1b",
                                                            stopOpacity: 0.4,
                                                        }}
                                                    />
                                                </radialGradient>
                                            </defs>
                                        </svg>
                                    )}
                                </div>
                            </div>

                            {/* Product Info Section */}
                            <div className="p-8 flex flex-col justify-center">
                                <div className="mb-6">
                                    <span
                                        className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                                            isAvailable
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {isAvailable ? "متوفر الآن" : "قريباً"}
                                    </span>

                                    <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-l from-red-600 via-red-700 to-red-900 bg-clip-text text-transparent mb-4">
                                        {product.title}
                                    </h1>

                                    <p
                                        className="text-gray-600 md:text-lg leading-relaxed mb-6 px-4"
                                        dangerouslySetInnerHTML={{
                                            __html: product.description,
                                        }}
                                    />

                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-2xl md:text-5xl font-bold text-red-600">
                                            ${priceNumber.toFixed(2)}
                                        </span>
                                    </div>

                                    {/* <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-red-500/30 transform hover:scale-105 transition-all duration-300 w-full">
                                        أضف إلى السلة
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main products grid
    const currentProducts = filteredProducts.slice(0, displayedProducts);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white"
            dir="rtl"
        >
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-red-600/8 rounded-full blur-2xl"></div>
            </div>

            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-5">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1200 800"
                    fill="none"
                >
                    <circle
                        cx="200"
                        cy="150"
                        r="80"
                        stroke="#dc3545"
                        strokeWidth="1"
                    />
                    <circle
                        cx="1000"
                        cy="300"
                        r="120"
                        stroke="#dc3545"
                        strokeWidth="1"
                    />
                    <circle
                        cx="1100"
                        cy="100"
                        r="60"
                        stroke="#dc3545"
                        strokeWidth="1"
                    />
                    <circle
                        cx="100"
                        cy="600"
                        r="90"
                        stroke="#dc3545"
                        strokeWidth="1"
                    />
                </svg>
            </div>

            {/* Premium Quality Badge */}
            <div className="absolute top-5 left-5 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg animate-pulse">
                منتجات متميزة
            </div>

            <section className="py-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex justify-between flex-wrap md:flex-nowrap items-center mb-12">
                        <h2 className="text-4xl font-bold bg-gradient-to-l from-red-600 via-red-700 to-red-900 bg-clip-text text-transparent">
                            منتجاتنا
                        </h2>

                        <div className="flex gap-3 flex-wrap">
                            <button
                                onClick={() => setSelectedCategoryId(null)}
                                className={`px-6 py-3 rounded-full font-medium shadow-lg border-2 ${
                                    selectedCategoryId === null
                                        ? "bg-red-600 text-white border-red-600"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-red-600"
                                }`}
                            >
                                الكل
                            </button>
                            {categories.map((category, index) => (
                                <>
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setSelectedCategoryId(category)
                                        }
                                        className={`px-6 py-3 rounded-full font-medium shadow-lg border-2 ${
                                            selectedCategoryId === category
                                                ? "bg-red-600 text-white border-red-600"
                                                : "bg-white text-gray-700 border-gray-200 hover:border-red-600"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                </>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product, index) => (
                                <div
                                    key={product.id ?? `product-${index}`}
                                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-red-500/20 transform hover:scale-105 transition-all duration-300 border border-gray-100"
                                >
                                    {/* Product Image with Real/SVG Hybrid */}
                                    <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                                        {product.images?.[0]?.path ? (
                                            <img
                                                src={`${BASE_URL}/storage/${product.images[0].path}`}
                                                alt={product.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        ) : (
                                            /* Fallback SVG when no image */
                                            <svg
                                                width="120"
                                                height="160"
                                                viewBox="0 0 120 160"
                                                fill="none"
                                            >
                                                <g className="animate-pulse">
                                                    <rect
                                                        x="40"
                                                        y="30"
                                                        width="40"
                                                        height="80"
                                                        rx="6"
                                                        fill="url(#cardBottleGradient)"
                                                        stroke="#dc3545"
                                                        strokeWidth="1.5"
                                                    />
                                                    <rect
                                                        x="45"
                                                        y="22"
                                                        width="30"
                                                        height="12"
                                                        rx="4"
                                                        fill="#dc3545"
                                                    />
                                                    <rect
                                                        x="45"
                                                        y="40"
                                                        width="30"
                                                        height="60"
                                                        rx="4"
                                                        fill="url(#cardOilGradient)"
                                                        opacity="0.7"
                                                    />

                                                    <rect
                                                        x="48"
                                                        y="60"
                                                        width="24"
                                                        height="20"
                                                        rx="2"
                                                        fill="white"
                                                        stroke="#dc3545"
                                                        strokeWidth="0.5"
                                                    />
                                                    <text
                                                        x="60"
                                                        y="68"
                                                        textAnchor="middle"
                                                        fontSize="4"
                                                        fontWeight="bold"
                                                        fill="#dc3545"
                                                    >
                                                        PREMIUM
                                                    </text>
                                                    <text
                                                        x="60"
                                                        y="74"
                                                        textAnchor="middle"
                                                        fontSize="3"
                                                        fill="#dc3545"
                                                    >
                                                        MOTOR OIL
                                                    </text>
                                                </g>

                                                <defs>
                                                    <linearGradient
                                                        id="cardBottleGradient"
                                                        x1="0%"
                                                        y1="0%"
                                                        x2="100%"
                                                        y2="100%"
                                                    >
                                                        <stop
                                                            offset="0%"
                                                            style={{
                                                                stopColor:
                                                                    "#ffffff",
                                                                stopOpacity: 0.9,
                                                            }}
                                                        />
                                                        <stop
                                                            offset="100%"
                                                            style={{
                                                                stopColor:
                                                                    "#f3f4f6",
                                                                stopOpacity: 0.8,
                                                            }}
                                                        />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="cardOilGradient"
                                                        x1="0%"
                                                        y1="0%"
                                                        x2="100%"
                                                        y2="100%"
                                                    >
                                                        <stop
                                                            offset="0%"
                                                            style={{
                                                                stopColor:
                                                                    "#dc3545",
                                                                stopOpacity: 0.6,
                                                            }}
                                                        />
                                                        <stop
                                                            offset="100%"
                                                            style={{
                                                                stopColor:
                                                                    "#991b1b",
                                                                stopOpacity: 0.8,
                                                            }}
                                                        />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        )}

                                        {/* Status Badge */}
                                        <div className="absolute top-4 right-4">
                                            <span
                                                className={`text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg ${
                                                    product.status === "active"
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            >
                                                {product.status === "active"
                                                    ? "متوفر"
                                                    : "قريباً"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {product.title}
                                        </h3>
                                        <p
                                            className="text-gray-600 text-sm mb-4 line-clamp-2"
                                            dangerouslySetInnerHTML={{
                                                __html: product.description,
                                            }}
                                        />

                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-2xl font-bold text-red-600">
                                                $
                                                {Number(product.price).toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleViewDetails(product)
                                            }
                                            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                        >
                                            عرض التفاصيل
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <div className="max-w-sm mx-auto">
                                    <svg
                                        className="w-24 h-24 mx-auto mb-4 text-gray-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        لم يتم العثور على منتجات
                                    </h3>
                                    <p className="text-gray-500">
                                        لا توجد منتجات في هذا القسم حالياً
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Load More Button */}
                    {currentProducts.length < filteredProducts.length && (
                        <div className="text-center mt-12">
                            <button
                                onClick={loadMoreProducts}
                                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                تحميل المزيد من المنتجات
                            </button>
                        </div>
                    )}
                </div>

                {/* Feature Highlights */}
                <div className="hidden absolute bottom-5 md:flex items-center gap-2 left-1/2 transform -translate-x-1/2 ">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <span className="text-red-600 font-bold text-base">
                            ✓
                        </span>
                        منتجات أصلية
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <span className="text-red-600 font-bold text-base">
                            ✓
                        </span>
                        ضمان الجودة
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <span className="text-red-600 font-bold text-base">
                            ✓
                        </span>
                        توصيل سريع
                    </div>
                </div>
            </section>
        </div>
    );
}
