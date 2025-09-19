import { useState, useEffect } from "react";
import ProductGrid from "../components/sections/ProductGrid";
import Header from "../components/sections/Header";
import About from "../components/sections/About";
import Hero from "../components/sections/Hero";
import Footer from "../components/sections/Footer";
import Team from "../components/sections/Team";
import Category from "../components/sections/Category";
import "../assets/styles/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { API_TITLE, settingsReady } from "../services/api";

function Home() {
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        settingsReady.then(() => {
            setTitle(API_TITLE());
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 500);
                    return 100;
                }
                return Math.min(prev + Math.random() * 8, 95);
            });
        }, 150);

        const timer = setTimeout(() => {
            setLoadingProgress(100);
            setTimeout(() => setLoading(false), 500);
            clearInterval(interval);
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    if (loading) {
        return (
            <>
                <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 flex flex-col items-center justify-center relative overflow-hidden">
                    
                    {/* الخلفية المتحركة */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute bottom-40 right-10 w-12 h-12 bg-blue-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '3s' }}></div>
                    </div>

                    {/* اللوجو الرئيسي - العنصر الأساسي */}
                    <div className="relative z-10 mb-8 animate-logo-main">
                        {/* اللوجو الأساسي */}
                        <svg
                            width="220"
                            height="240"
                            viewBox="0 0 220 240"
                            className="transform scale-100"
                        >
                            {/* التعريفات */}
                            <defs>
                                <linearGradient id="bagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#fb923c', stopOpacity: 1 }} />
                                    <stop offset="50%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
                                </linearGradient>
                                <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>

                            {/* مقبض الحقيبة */}
                            <path
                                d="M80 30 Q110 0 140 30"
                                stroke="#1e40af"
                                strokeWidth="4"
                                fill="none"
                                className="animate-draw-handle"
                            />

                            {/* جسم الحقيبة الرئيسي */}
                            <rect
                                x="80"
                                y="30"
                                width="60"
                                height="100"
                                rx="12"
                                fill="url(#bagGradient)"
                                stroke="#1e40af"
                                strokeWidth="3"
                                className="animate-draw-bag"
                            />

                            {/* الثقوب للمقبض */}
                            <circle cx="90" cy="30" r="4" fill="#1e40af" className="animate-pop" />
                            <circle cx="130" cy="30" r="4" fill="#1e40af" className="animate-pop" style={{ animationDelay: '0.2s' }} />

                            {/* العيون */}
                            <circle cx="95" cy="60" r="5" fill="#1e40af" className="animate-blink">
                                <animate
                                    attributeName="cy"
                                    values="60;58;60"
                                    dur="3s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                            <circle cx="125" cy="60" r="5" fill="#1e40af" className="animate-blink">
                                <animate
                                    attributeName="cy"
                                    values="60;58;60"
                                    dur="3s"
                                    repeatCount="indefinite"
                                    begin="0.2s"
                                />
                            </circle>

                            {/* الابتسامة */}
                            <path
                                d="M95 80 Q110 90 125 80"
                                stroke="#1e40af"
                                strokeWidth="3"
                                fill="none"
                                className="animate-smile-stretch"
                            />

                            {/* الخطوط الزخرفية */}
                            <line x1="85" y1="40" x2="135" y2="40" stroke="#fbbf24" strokeWidth="2" className="animate-pattern" />
                            <line x1="85" y1="45" x2="135" y2="45" stroke="#fbbf24" strokeWidth="1" className="animate-pattern" style={{ animationDelay: '0.1s' }} />
                            <line x1="85" y1="50" x2="135" y2="50" stroke="#fbbf24" strokeWidth="2" className="animate-pattern" style={{ animationDelay: '0.2s' }} />

                            {/* النص على الحقيبة */}
                            <text
                                x="110"
                                y="130"
                                textAnchor="middle"
                                fill="white"
                                fontSize="12"
                                fontWeight="bold"
                                fontFamily="Tajawal, sans-serif"
                                className="animate-text-reveal"
                            >
                                {/* {title.split(' ')[0]} */}
                            </text>

                            {/* الظل */}
                            <rect
                                x="82"
                                y="132"
                                width="56"
                                height="4"
                                rx="2"
                                fill="#92400e"
                                opacity="0.8"
                                className="animate-shadow-grow"
                            />
                        </svg>

                        {/* العناصر المتحركة حول اللوجو */}
                        <div className="absolute inset-0">
                            {/* قلب متحرك */}
                            <div className="absolute -top-12 -left-8 w-8 h-8 text-pink-400 animate-heart-float">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>

                            {/* نجمة متحركة */}
                            <div className="absolute -top-6 -right-6 w-6 h-6 text-yellow-400 animate-star-float">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>

                            {/* دائرة متحركة */}
                            <div className="absolute bottom-6 left-6 w-5 h-5 bg-blue-400 rounded-full animate-circle-float"></div>

                            {/* تأثير البريق */}
                            <div className="absolute top-10 right-10 w-4 h-4 bg-yellow-300 rounded-full opacity-0 animate-sparkle"></div>
                            <div className="absolute bottom-20 left-10 w-3 h-3 bg-yellow-300 rounded-full opacity-0 animate-sparkle" style={{ animationDelay: '1s' }}></div>
                            <div className="absolute top-40 right-20 w-2 h-2 bg-yellow-300 rounded-full opacity-0 animate-sparkle" style={{ animationDelay: '2s' }}></div>
                        </div>

                        {/* النص الرئيسي تحت اللوجو */}
                        <div className=" text-center">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent animate-title-bounce leading-tight">
                                {title}
                            </h2>
                        </div>
                    </div>

                    {/* النص الترحيبي */}
                    <div className="text-center relative z-10 mb-8 px-4">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 animate-text-slide">
                            مرحباً بكم في عالم التسوق الممتع!
                        </h1>
                        <p className="text-gray-600 mt-4 text-base md:text-lg animate-fade-in max-w-md">
                            جاري تحميل أفضل العروض والتجارب الرائعة...
                        </p>
                    </div>

                    {/* شريط التقدم */}
                    <div className="w-80 max-w-full mx-auto mb-8 relative px-4">
                        <div className="w-full h-3 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border border-white/30 shadow-lg">
                            <div
                                className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden shadow-md"
                                style={{ width: `${loadingProgress}%` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-2 px-2">
                            <span className="font-medium">جاري التحضير لتجربتك...</span>
                            <span className="font-semibold text-orange-600">{Math.round(loadingProgress)}%</span>
                        </div>
                    </div>

                    {/* النقاط المتحركة */}
                    <div className="flex space-x-2 mb-6">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-dot-bounce shadow-sm"></div>
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-dot-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-dot-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>

                    {/* النص السفلي */}
                    <p className="text-sm text-gray-500 animate-pulse px-4 text-center max-w-md">
                        {loadingProgress < 100 ? 
                            "🎁 جاري تحميل أحلى العروض..." : 
                            "✨ جاهزين لرحلة التسوق الممتعة!"
                        }
                    </p>

                    {/* الألوان في الأسفل */}
                    <div className="absolute bottom-8 flex space-x-4 space-x-reverse opacity-60">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300"></div>
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300"></div>
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300"></div>
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300"></div>
                    </div>

                    {/* أيقونات التطبيقات */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 space-x-reverse opacity-40">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                            <i className="fab fa-apple text-xs font-medium"></i>
                        </div>
                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                            <i className="fab fa-android text-xs font-medium"></i>
                        </div>
                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                            <i className="fas fa-globe text-xs font-medium"></i>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap');
                    
                    * {
                        font-family: 'Tajawal', sans-serif;
                    }

                    @keyframes logo-main {
                        0% { 
                            opacity: 0; 
                            transform: scale(0.2) rotateY(90deg);
                        }
                        50% {
                            opacity: 0.8;
                            transform: scale(1.05) rotateY(-10deg);
                        }
                        100% { 
                            opacity: 1; 
                            transform: scale(1) rotateY(0deg);
                        }
                    }

                    @keyframes draw-handle {
                        0% { 
                            stroke-dasharray: 100; 
                            stroke-dashoffset: 100;
                        }
                        100% { 
                            stroke-dasharray: 100; 
                            stroke-dashoffset: 0;
                        }
                    }

                    @keyframes draw-bag {
                        0% { 
                            opacity: 0; 
                            transform: scaleY(0);
                            transform-origin: bottom;
                        }
                        100% { 
                            opacity: 1; 
                            transform: scaleY(1);
                        }
                    }

                    @keyframes pop {
                        0% { 
                            opacity: 0; 
                            transform: scale(0);
                        }
                        60% { 
                            opacity: 1; 
                            transform: scale(1.3);
                        }
                        100% { 
                            opacity: 1; 
                            transform: scale(1);
                        }
                    }

                    @keyframes blink {
                        0%, 90%, 100% { 
                            r: 5;
                        }
                        95% { 
                            r: 2;
                        }
                    }

                    @keyframes smile-stretch {
                        0% { 
                            opacity: 0; 
                            transform: scaleX(0);
                            transform-origin: center;
                        }
                        100% { 
                            opacity: 1; 
                            transform: scaleX(1);
                        }
                    }

                    @keyframes pattern {
                        0% { 
                            opacity: 0; 
                            transform: translateX(-20px);
                        }
                        100% { 
                            opacity: 1; 
                            transform: translateX(0);
                        }
                    }

                    @keyframes text-reveal {
                        0% { 
                            opacity: 0; 
                            transform: translateY(10px);
                        }
                        100% { 
                            opacity: 1; 
                            transform: translateY(0);
                        }
                    }

                    @keyframes shadow-grow {
                        0% { 
                            opacity: 0; 
                            width: 0;
                            transform: translateX(30px);
                        }
                        100% { 
                            opacity: 0.8; 
                            width: 56px;
                            transform: translateX(0);
                        }
                    }

                    @keyframes heart-float {
                        0% { 
                            opacity: 0; 
                            transform: translateY(30px) scale(0) rotate(-30deg);
                        }
                        50% { 
                            opacity: 1; 
                            transform: translateY(-20px) scale(1.2) rotate(0deg);
                        }
                        100% { 
                            opacity: 0; 
                            transform: translateY(-50px) scale(0.8) rotate(30deg);
                        }
                    }

                    @keyframes star-float {
                        0% { 
                            opacity: 0; 
                            transform: translateX(-30px) rotate(0deg) scale(0);
                        }
                        50% { 
                            opacity: 1; 
                            transform: translateX(15px) rotate(180deg) scale(1.1);
                        }
                        100% { 
                            opacity: 0; 
                            transform: translateX(40px) rotate(360deg) scale(0);
                        }
                    }

                    @keyframes circle-float {
                        0% { 
                            opacity: 0; 
                            transform: translateX(-30px) translateY(30px) scale(0);
                        }
                        50% { 
                            opacity: 1; 
                            transform: translateX(20px) translateY(-15px) scale(1);
                        }
                        100% { 
                            opacity: 0; 
                            transform: translateX(50px) translateY(-40px) scale(0);
                        }
                    }

                    @keyframes sparkle {
                        0% { 
                            opacity: 0; 
                            transform: scale(0) rotate(0deg);
                        }
                        50% { 
                            opacity: 1; 
                            transform: scale(1.5) rotate(180deg);
                        }
                        100% { 
                            opacity: 0; 
                            transform: scale(0) rotate(360deg);
                        }
                    }

                    @keyframes text-slide {
                        0% { 
                            opacity: 0; 
                            transform: translateY(30px);
                        }
                        100% { 
                            opacity: 1; 
                            transform: translateY(0);
                        }
                    }

                    @keyframes title-bounce {
                        0%, 20%, 50%, 80%, 100% { 
                            transform: translateY(0) scale(1);
                        }
                        10% { 
                            transform: translateY(-10px) scale(1.03);
                        }
                        30% { 
                            transform: translateY(-5px) scale(1.02);
                        }
                        60% { 
                            transform: translateY(-3px) scale(1.01);
                        }
                    }

                    @keyframes fade-in {
                        0% { 
                            opacity: 0; 
                            transform: translateY(15px);
                        }
                        100% { 
                            opacity: 1; 
                            transform: translateY(0);
                        }
                    }

                    @keyframes shimmer {
                        0% { 
                            transform: translateX(-100%) skewX(-15deg);
                        }
                        100% { 
                            transform: translateX(150%) skewX(-15deg);
                        }
                    }

                    @keyframes dot-bounce {
                        0%, 80%, 100% { 
                            transform: scale(0.3); 
                            opacity: 0.5;
                        }
                        40% { 
                            transform: scale(1.3); 
                            opacity: 1;
                        }
                    }

                    .animate-logo-main {
                        animation: logo-main 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                    }

                    .animate-draw-handle {
                        animation: draw-handle 1s ease-out 0.5s forwards;
                        stroke-dasharray: 100;
                        stroke-dashoffset: 100;
                    }

                    .animate-draw-bag {
                        animation: draw-bag 0.8s ease-out 1s forwards;
                    }

                    .animate-pop {
                        animation: pop 0.6s ease-out forwards;
                    }

                    .animate-blink {
                        animation: blink 3s ease-in-out infinite;
                    }

                    .animate-smile-stretch {
                        animation: smile-stretch 0.8s ease-out 1.3s forwards;
                    }

                    .animate-pattern {
                        animation: pattern 0.5s ease-out forwards;
                    }

                    .animate-text-reveal {
                        animation: text-reveal 0.6s ease-out 1.6s forwards;
                    }

                    .animate-shadow-grow {
                        animation: shadow-grow 0.5s ease-out 1.8s forwards;
                    }

                    .animate-heart-float {
                        animation: heart-float 4s ease-in-out infinite;
                    }

                    .animate-star-float {
                        animation: star-float 3.5s ease-in-out infinite;
                    }

                    .animate-circle-float {
                        animation: circle-float 3s ease-in-out infinite;
                    }

                    .animate-sparkle {
                        animation: sparkle 2s ease-in-out infinite;
                    }

                    .animate-text-slide {
                        animation: text-slide 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s both;
                    }

                    .animate-title-bounce {
                        animation: title-bounce 2.5s ease-in-out infinite;
                    }

                    .animate-fade-in {
                        animation: fade-in 1s ease-out 1.5s both;
                    }

                    .animate-shimmer {
                        animation: shimmer 1.5s linear infinite;
                    }

                    .animate-dot-bounce {
                        animation: dot-bounce 1.4s ease-in-out infinite;
                    }

                    .animate-pulse {
                        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                    }

                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.6; }
                    }
                `}</style>
            </>
        )
    }

    return (
        <main>
            <Header />
            <Hero />
            <About />
            <ProductGrid />
            <Team />
            <Category />
            <Footer />
        </main>
    );
}

export default Home;