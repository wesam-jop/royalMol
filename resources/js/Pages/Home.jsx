import { useState, useEffect } from "react";
import ProductGrid from "../components/sections/ProductGrid";
import Header from "../components/sections/Header";
import About from "../components/sections/About";
import Hero from "../components/sections/Hero";
import Footer from "../components/sections/Footer";
import Team from "../components/sections/Team";
import "../assets/styles/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { API_TITLE, settingsReady } from "../services/api";

function Home() {
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState(""); // قيمة مبدئية فارغة

    useEffect(() => {
        // انتظار تحميل الإعدادات من API
        settingsReady.then(() => {
            setTitle(API_TITLE()); // تحديث العنوان بعد التحميل
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">

            <div className="relative mb-8">
                <svg width="200" height="200" viewBox="0 0 200 200" className="animate-float">

                    <rect x="60" y="70" width="80" height="80" rx="5" fill="white" stroke="#4f46e5" strokeWidth="2" />

                    <g className="animate-pulse-opacity">
                        <rect x="75" y="85" width="15" height="15" rx="2" fill="#818cf8" />
                        <rect x="110" y="85" width="15" height="15" rx="2" fill="#818cf8" />
                        <rect x="75" y="110" width="15" height="15" rx="2" fill="#818cf8" />
                        <rect x="110" y="110" width="15" height="15" rx="2" fill="#818cf8" />
                    </g>

                    <rect x="85" y="130" width="30" height="20" rx="2" fill="#4f46e5" />

                    <path d="M50 70 L150 70 L130 50 L70 50 Z" fill="#6366f1" />

                    <circle cx="70" cy="55" r="3" fill="gold">
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="130" cy="55" r="3" fill="gold">
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </circle>
                </svg>

                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 200 200">

                    <g className="animate-float" style={{ animationDelay: '0.5s' }}>
                        <circle cx="30" cy="30" r="8" fill="#f472b6" opacity="0.7" />
                        <rect x="26" y="38" width="4" height="8" rx="2" fill="#f472b6" opacity="0.7" />
                    </g>

                    <g className="animate-float" style={{ animationDelay: '1s' }}>
                        <circle cx="180" cy="50" r="6" fill="#38bdf8" opacity="0.7" />
                        <rect x="177" y="56" width="3" height="6" rx="1.5" fill="#38bdf8" opacity="0.7" />
                    </g>

                    <g className="animate-float" style={{ animationDelay: '1.5s' }}>
                        <circle cx="170" cy="170" r="5" fill="#34d399" opacity="0.7" />
                        <rect x="167.5" y="175" width="2.5" height="5" rx="1.25" fill="#34d399" opacity="0.7" />
                    </g>
                </svg>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold text-indigo-800 mb-2">مرحباً بكم في {title} </h2>
                <p className="text-gray-600 mb-6">جاري تحميل أفضل العروض والتجارب </p>

                <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full origin-left animate-pulse"></div>
                </div>

                <p className="text-sm text-gray-500 mt-4 animate-pulse-opacity">
                    جاري تحميل المحتوى المميز...
                </p>
            </div>

            <div className="absolute bottom-6 flex space-x-6 space-x-reverse opacity-70">
                <div className="w-10 h-10 bg-indigo-500 rounded-lg"></div>
                <div className="w-10 h-10 bg-pink-500 rounded-lg"></div>
                <div className="w-10 h-10 bg-blue-500 rounded-lg"></div>
                <div className="w-10 h-10 bg-green-500 rounded-lg"></div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap');

                body {
                    font-family: 'Tajawal', sans-serif;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes pulse-opacity {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-pulse-opacity {
                    animation: pulse-opacity 2s ease-in-out infinite;
                }
            `}</style>

        </div>

        )
    }

    return (
        <main>
            <Header />
            <Hero />
            <About />
            <ProductGrid />
            <Team />
            <Footer />
        </main>
    );
}

export default Home;
