import { useState, useEffect } from "react";
import { API_TITLE, settingsReady } from "../../services/api";
import { Link } from '@inertiajs/inertia-react';
import logo from '../../assets/images/logo.png';


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
    <header className=" shadow-md sticky top-0 z-50 bg-[#fef9f3]">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <Link href="/" className="text-2xl font-bold text-[#082755] transition hover:text-[#fe8668] flex items-center gap-2">
            <div>
              <img src={logo} alt="" className="w-10 h=10" />
            </div>
            <div>
              {title}
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 space-x-reverse">
          <li>
            <Link href="/" className="text-[#082755] hover:text-[#fe8668] transition">
              الرئيسية
            </Link>
          </li>
          <li>
            <Link href="/pageProduct" className="text-[#082755] hover:text-[#fe8668] transition">
              المنتجات
            </Link>
          </li>
          <li>
            <Link href="/pagecategory" className="text-[#082755] hover:text-[#fe8668] transition">
              الشركات
            </Link>
          </li>
        </ul>

        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden text-[#082755] hover:text-[#fe8668] focus:outline-none"
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
        <ul className="bg-[#fef9f3] md:hidden bg-white shadow-md flex flex-col items-center space-y-4 py-4">
          <li className="block w-full text-center">
            <Link href="/" className="text-[#082755] transition hover:bg-[#fe8668] block w-full py-4 text-lg font-bold">
              الرئيسية
            </Link>
          </li>
          <li className="block w-full text-center">
            <Link href="/pageProduct" className="text-[#082755] transition hover:bg-[#fe8668] block w-full py-4 text-lg font-bold">
              المنتجات
            </Link>
          </li>
          <li className="block w-full text-center">
            <Link href="/pagecategory" className="text-[#082755] transition hover:bg-[#fe8668] block w-full py-4 text-lg font-bold">
              الشركات
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
