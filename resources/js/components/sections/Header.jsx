import { useState, useEffect } from "react";
import { API_TITLE, settingsReady } from "../../services/api";
import { Link } from '@inertiajs/inertia-react';

export default function Header() {
    const [title, setTitle] = useState(""); // قيمة مبدئية فارغة

    useEffect(() => {
        // انتظار تحميل الإعدادات من API
        settingsReady.then(() => {
            setTitle(API_TITLE()); // تحديث العنوان بعد التحميل
        });
    }, []);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    return (
      <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">{title}</div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 space-x-reverse">
          <li>
            <Link href="/" className="hover:text-blue-600 transition">
              الرئيسية
            </Link>
          </li>
          <li>
            <Link href="/pageProduct" className="hover:text-blue-600 transition">
              المنتجات
            </Link>
          </li>
          <li>
            <Link href="#team" className="hover:text-blue-600 transition">
              الفريق
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-blue-600 transition">
              اتصل بنا
            </Link>
          </li>
        </ul>

        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden text-blue-600 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-white shadow-md flex flex-col items-center space-y-4 py-4">
          <li>
            <Link
              href="#home"
              className="hover:text-blue-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="hover:text-blue-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              عن المعرض
            </Link>
          </li>
          <li>
            <Link
              href="#companies"
              className="hover:text-blue-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              الشركات المشاركة
            </Link>
          </li>
          <li>
            <Link
              href="#products"
              className="hover:text-blue-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              المنتجات
            </Link>
          </li>
          <li>
            <Link
              href="#team"
              className="hover:text-blue-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              الفريق
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="hover:text-blue-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              اتصل بنا
            </Link>
          </li>
        </ul>
      )}
    </header>
    );
}
