import { useState, useEffect } from "react";
import { API_TITLE, settingsReady } from "../services/api";
import logo from "../assets/images/logo2.jpg";

export default function Header() {
    const [title, setTitle] = useState(""); // قيمة مبدئية فارغة

    useEffect(() => {
        // انتظار تحميل الإعدادات من API
        settingsReady.then(() => {
            setTitle(API_TITLE()); // تحديث العنوان بعد التحميل
        });
    }, []);

    return (
        <header className="bg-gray-100 backdrop-blur-md shadow-lg border-b sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-3 gap-4">
                        <div className="w-16 h-16 p-2 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-xl flex items-center justify-center shadow-lg">
                            {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path
                                    fill="white"
                                    d="M320 192C337.7 192 352 177.7 352 160C352 142.3 337.7 128 320 128L192 128C174.3 128 160 142.3 160 160C160 177.7 174.3 192 192 192L224 192L224 224L48 224C21.5 224 0 245.5 0 272L0 336.8C0 355.8 11.2 373 28.5 380.7L96 410.7L96 432C96 458.5 117.5 480 144 480L403.1 480C421.5 480 438.9 472.1 451.1 458.3L633.5 251.7C645.8 237.8 633.2 216.3 615.1 220.2L448 256L397.5 230.8C388.6 226.4 378.8 224 368.9 224L288 224L288 192L320 192zM96 272L96 358.1L48 336.8L48 272L96 272z"
                                />
                            </svg> */}
                            <img src={logo} alt="" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#bf1e2e]">
                                {title || "جاري التحميل..."}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
