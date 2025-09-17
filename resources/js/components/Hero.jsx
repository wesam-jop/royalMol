import { useState, useEffect } from "react";
import {
    Numper_Phone,
    API_TITLE,
    API_Descraption,
    settingsReady,
} from "../services/api";

export default function Header() {
    const [numperPhone, setNumperPhone] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        settingsReady
            .then(() => {
                setNumperPhone(Numper_Phone());
                setTitle(API_TITLE());
                setDescription(API_Descraption());
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Failed to load settings:", error);
                setIsLoading(false);
            });
    }, []);

    return (
        <section
            className="relative py-4 flex items-center overflow-hidden"
            dir="rtl"
        >
            {/* Light Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white"></div>

                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-red-400/3 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/2 right-1/4 w-48 h-48 bg-yellow-400/4 rounded-full blur-2xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>

                {/* Light Grid Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
                            backgroundSize: "50px 50px",
                        }}
                    ></div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Text Content */}
                    <div className="text-right space-y-6 lg:space-y-8">
                        {/* Premium Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/90 to-red-700/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg border border-red-500/20">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                            جودة متميزة
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                            {isLoading ? (
                                <div className="bg-gray-200 rounded-lg h-16 animate-pulse"></div>
                            ) : (
                                <>
                                    <span className="py-4 block bg-gradient-to-l from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent drop-shadow-sm">
                                        {title}
                                    </span>
                                    <span className="block text-gray-700 mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold">
                                        خدمات احترافية متكاملة
                                    </span>
                                </>
                            )}
                        </h1>

                        {/* Description */}
                        <div className="space-y-4">
                            {isLoading ? (
                                <div className="space-y-2">
                                    <div className="bg-gray-200 rounded h-4 animate-pulse"></div>
                                    <div className="bg-gray-200 rounded h-4 w-3/4 animate-pulse"></div>
                                </div>
                            ) : (
                                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                                    {/* {description} */}
                                </p>
                            )}
                        </div>

                        {/* Features List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                <span className="text-sm sm:text-base">
                                    خدمة سريعة ومتقدمة
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                <span className="text-sm sm:text-base">
                                    حماية شاملة للمحرك
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                <span className="text-sm sm:text-base">
                                    جودة طويلة المدى
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                <span className="text-sm sm:text-base">
                                    أسعار تنافسية
                                </span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a
                                href={
                                    numperPhone
                                        ? `https://wa.me/${numperPhone}`
                                        : "#"
                                }
                                className="outline-none group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-red-500/30 transform hover:scale-105 transition-all duration-300 hover:from-red-700 hover:to-red-800"
                            >
                                <span>تواصل معنا الآن</span>
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382" />
                                </svg>
                            </a>

                            {/* <button className="group inline-flex items-center justify-center gap-3 bg-gray-100 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border border-gray-200 hover:bg-gray-200 transition-all duration-300">
                                <span>استكشف المنتجات</span>
                                <svg
                                    className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M7 14l5-5 5 5z" />
                                </svg>
                            </button> */}
                        </div>
                    </div>

                    {/* Visual Element */}
                    <div className="relative flex items-center justify-center lg:justify-start order-first lg:order-last">
                        <div className="relative w-full max-w-lg">
                            {/* Main Illustration */}
                            <svg
                                width="100%"
                                height="400"
                                viewBox="0 0 400 400"
                                fill="none"
                                className="drop-shadow-2xl"
                            >
                                {/* Animated Oil Bottle */}
                                <g
                                    className="animate-bounce"
                                    style={{ animationDuration: "3s" }}
                                >
                                    {/* Bottle Shadow */}
                                    <ellipse
                                        cx="200"
                                        cy="380"
                                        rx="40"
                                        ry="8"
                                        fill="rgba(0,0,0,0.2)"
                                    />

                                    {/* Bottle Body */}
                                    <rect
                                        x="160"
                                        y="120"
                                        width="80"
                                        height="200"
                                        rx="12"
                                        fill="url(#bottleGradient)"
                                        stroke="rgba(255,255,255,0.3)"
                                        strokeWidth="2"
                                    />

                                    {/* Bottle Cap */}
                                    <rect
                                        x="170"
                                        y="90"
                                        width="60"
                                        height="40"
                                        rx="8"
                                        fill="url(#capGradient)"
                                    />

                                    {/* Cap Detail */}
                                    <rect
                                        x="175"
                                        y="95"
                                        width="50"
                                        height="8"
                                        rx="4"
                                        fill="rgba(255,255,255,0.3)"
                                    />

                                    {/* Oil Level */}
                                    <rect
                                        x="170"
                                        y="140"
                                        width="60"
                                        height="160"
                                        rx="8"
                                        fill="url(#oilGradient)"
                                    />

                                    {/* Premium Label */}
                                    <rect
                                        x="175"
                                        y="200"
                                        width="50"
                                        height="60"
                                        rx="6"
                                        fill="rgba(255,255,255,0.95)"
                                        stroke="rgba(220,53,69,0.5)"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x="200"
                                        y="220"
                                        textAnchor="middle"
                                        fontSize="10"
                                        fontWeight="bold"
                                        fill="#dc3545"
                                    >
                                        PREMIUM
                                    </text>
                                    <text
                                        x="200"
                                        y="235"
                                        textAnchor="middle"
                                        fontSize="14"
                                        fontWeight="bold"
                                        fill="#dc3545"
                                    >
                                        5W-30
                                    </text>
                                    <text
                                        x="200"
                                        y="250"
                                        textAnchor="middle"
                                        fontSize="8"
                                        fill="#666"
                                    >
                                        SYNTHETIC
                                    </text>
                                </g>

                                {/* Floating Elements */}
                                <g
                                    className="animate-pulse"
                                    style={{ animationDelay: "0.5s" }}
                                >
                                    <circle
                                        cx="100"
                                        cy="150"
                                        r="8"
                                        fill="url(#dropGradient)"
                                        opacity="0.8"
                                    />
                                    <circle
                                        cx="320"
                                        cy="200"
                                        r="6"
                                        fill="url(#dropGradient)"
                                        opacity="0.6"
                                    />
                                    <circle
                                        cx="80"
                                        cy="280"
                                        r="4"
                                        fill="url(#dropGradient)"
                                        opacity="0.7"
                                    />
                                    <circle
                                        cx="340"
                                        cy="120"
                                        r="5"
                                        fill="url(#dropGradient)"
                                        opacity="0.5"
                                    />
                                </g>

                                {/* Rotating Gear */}
                                <g
                                    className="animate-spin"
                                    style={{
                                        transformOrigin: "100px 120px",
                                        animationDuration: "8s",
                                    }}
                                >
                                    <circle
                                        cx="100"
                                        cy="120"
                                        r="30"
                                        fill="none"
                                        stroke="rgba(220,53,69,0.4)"
                                        strokeWidth="3"
                                    />
                                    <circle
                                        cx="100"
                                        cy="120"
                                        r="20"
                                        fill="rgba(220,53,69,0.05)"
                                        stroke="rgba(220,53,69,0.3)"
                                        strokeWidth="2"
                                    />
                                    {/* Gear Teeth */}
                                    {Array.from({ length: 8 }).map((_, i) => {
                                        const angle = (i * 45 * Math.PI) / 180;
                                        const x1 = 100 + Math.cos(angle) * 25;
                                        const y1 = 120 + Math.sin(angle) * 25;
                                        const x2 = 100 + Math.cos(angle) * 35;
                                        const y2 = 120 + Math.sin(angle) * 35;
                                        return (
                                            <line
                                                key={i}
                                                x1={x1}
                                                y1={y1}
                                                x2={x2}
                                                y2={y2}
                                                stroke="rgba(220,53,69,0.4)"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                            />
                                        );
                                    })}
                                </g>

                                {/* Service Icons */}
                                <g
                                    className="animate-pulse"
                                    style={{ animationDelay: "1s" }}
                                >
                                    {/* Wrench */}
                                    <g transform="translate(320, 300)">
                                        <rect
                                            x="0"
                                            y="8"
                                            width="25"
                                            height="4"
                                            rx="2"
                                            fill="rgba(220,53,69,0.5)"
                                        />
                                        <circle
                                            cx="0"
                                            cy="10"
                                            r="6"
                                            fill="none"
                                            stroke="rgba(220,53,69,0.5)"
                                            strokeWidth="2"
                                        />
                                    </g>

                                    {/* Shield */}
                                    <g transform="translate(60, 320)">
                                        <path
                                            d="M0,0 L10,0 L15,10 L10,20 L0,20 L-5,10 Z"
                                            fill="rgba(220,53,69,0.2)"
                                            stroke="rgba(220,53,69,0.5)"
                                            strokeWidth="2"
                                        />
                                        <text
                                            x="5"
                                            y="12"
                                            textAnchor="middle"
                                            fontSize="12"
                                            fill="rgba(220,53,69,0.7)"
                                        >
                                            ✓
                                        </text>
                                    </g>
                                </g>

                                {/* Gradients */}
                                <defs>
                                    <linearGradient
                                        id="bottleGradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="rgba(255,255,255,0.15)"
                                        />
                                        <stop
                                            offset="50%"
                                            stopColor="rgba(255,255,255,0.05)"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="rgba(255,255,255,0.1)"
                                        />
                                    </linearGradient>

                                    <linearGradient
                                        id="capGradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor="#dc3545" />
                                        <stop
                                            offset="100%"
                                            stopColor="#c82333"
                                        />
                                    </linearGradient>

                                    <linearGradient
                                        id="oilGradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="rgba(220,53,69,0.7)"
                                        />
                                        <stop
                                            offset="50%"
                                            stopColor="rgba(200,35,51,0.5)"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="rgba(220,53,69,0.8)"
                                        />
                                    </linearGradient>

                                    <radialGradient id="dropGradient">
                                        <stop
                                            offset="0%"
                                            stopColor="rgba(220,53,69,0.8)"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="rgba(200,35,51,0.4)"
                                        />
                                    </radialGradient>
                                </defs>
                            </svg>

                            {/* Floating Stats */}
                            <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">
                                        99%
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        رضا العملاء
                                    </div>
                                </div>
                            </div>

                            {/* <div className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">
                                        24/7
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        خدمة مستمرة
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
                <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M7 14l5-5 5 5z" />
                </svg>
                <div className="text-xs mt-1">مرر للأسفل</div>
            </div>
        </section>
    );
}
