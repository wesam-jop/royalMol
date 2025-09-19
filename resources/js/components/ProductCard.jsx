import React from "react";

export default function ProductCard({ product, BASE_URL, onViewDetails }) {
    const isProdAvailable = product.status === "active";

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden">
                {product.images && product.images.length > 0 ? (
                    <img 
                        src={product.images[0]?.url ? product.images[0].url : `${BASE_URL}/storage/${product.images[0]?.path || ''}`} 
                        alt={product.title} 
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
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{product.title}</h3>
                {product.category?.name && (
                    <div className="mb-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            {product.category.name}
                        </span>
                    </div>
                )}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                    <p className="text-green-600 font-bold text-lg">${Number(product.price).toFixed(2)}</p>
                    <button 
                        onClick={() => isProdAvailable && onViewDetails(product)} 
                        disabled={!isProdAvailable}
                        className={`px-4 py-2 rounded-lg transition-colors duration-300 text-sm text-white ${isProdAvailable ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed opacity-70'}`}
                        aria-disabled={!isProdAvailable}
                        title={isProdAvailable ? 'عرض التفاصيل' : 'غير متوفر حالياً'}
                    >
                        عرض التفاصيل
                    </button>
                </div>
            </div>
        </div>
    );
}
