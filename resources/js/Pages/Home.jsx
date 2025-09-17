import { useState, useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import "../assets/styles/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-white via-gray-50 to-white">
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
                            <stop offset="100%" stopColor="#c82333" />
                        </linearGradient>

                        <linearGradient
                            id="oilGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="rgba(220,53,69,0.7)" />
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
                            <stop offset="0%" stopColor="rgba(220,53,69,0.8)" />
                            <stop
                                offset="100%"
                                stopColor="rgba(200,35,51,0.4)"
                            />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        );
    }

    return (
        <main>
            <Header />
            <Hero />
            <ProductGrid />
            <Footer />
        </main>
    );
}

export default Home;
