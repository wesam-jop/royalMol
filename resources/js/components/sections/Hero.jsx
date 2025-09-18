import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hero = () => {
    const swiperRef = useRef(null);

    useEffect(() => {
        // Initialize Swiper
        const swiper = new Swiper(swiperRef.current, {
            modules: [Navigation, Pagination, Autoplay],
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 1,
            spaceBetween: 0,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1000,
        });

        // Cleanup Swiper instance on component unmount
        return () => swiper.destroy();
    }, []);

    return (
        <section id="home" className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            {/* Swiper Slider */}
            <div ref={swiperRef} className="swiper mySwiper w-full h-screen max-h-[700px]">
                <div className="swiper-wrapper">
                    {/* Slide 1 */}
                    <div className="swiper-slide relative">
                        <img
                            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="مفروشات فاخرة"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="text-center text-white px-4 max-w-4xl">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">تشكيلة فاخرة</h2>
                                <p className="text-xl md:text-2xl mb-8">اكتشف أحدث تصاميم المفروشات لعام 2023</p>
                                <a
                                    href="#products"
                                    className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105 duration-300 shadow-lg"
                                >
                                    ابدأ التسوق الآن
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="swiper-slide relative">
                        <img
                            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="أناقة ومودرن"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="text-center text-white px-4 max-w-4xl">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">أناقة مودرن</h2>
                                <p className="text-xl md:text-2xl mb-8">تصاميم تناسب كل الأذواق والمساحات</p>
                                <a
                                    href="#gallery"
                                    className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105 duration-300 shadow-lg"
                                >
                                    شاهد المعرض
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div className="swiper-slide relative">
                        <img
                            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="راحة وجودة"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="text-center text-white px-4 max-w-4xl">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">راحة وجودة</h2>
                                <p className="text-xl md:text-2xl mb-8">مفروشات تدوم طويلاً بتصاميم مريحة</p>
                                <a
                                    href="#about"
                                    className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105 duration-300 shadow-lg"
                                >
                                    تعرف علينا
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="swiper-pagination !bottom-6"></div>

                {/* Navigation Arrows */}
                <div
                    className={`swiper-button-next absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white p-4 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 focus:outline-none `}
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </div>
                <div
                    className={`swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white p-4 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 focus:outline-none `}
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
                {/* Overlay content */}
                <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center">
                    <div className="animate-bounce">
                        <div className="w-8 h-14 border-4 border-white rounded-full flex justify-center">
                            <div className="w-2 h-2 bg-white rounded-full mt-2 animate-scroll"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating info bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-blue-100 bg-opacity-90 text-blue-800 py-4 z-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-center md:text-left mb-3 md:mb-0">
                            <h3 className="font-bold text-lg">معرض المفروشات في رويال مول</h3>
                            <p className="text-sm">من ١ أكتوبر إلى ٣١ ديسمبر ٢٠٢٣</p>
                        </div>
                        <a
                            href="#location"
                            className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
                        >
                            احصل على الاتجاهات
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;