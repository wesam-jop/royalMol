import { useState, useEffect } from "react";
import {
    API_TITLE,
    API_whatsappDepartments,
    API_Descraption,
    API_location,
    API_LinkFacebook,
    API_LinkInstagram,
    settingsReady,
} from "../../services/api";

export default function Footer() {
    const [title, setTitle] = useState("");
    const [descraption, setDescraption] = useState("");
    const [location, setLocation] = useState("");
    const [whatsappDepartments, setWhatsappDepartments] = useState([]);
    const [linkFacebook, setLinkFacebook] = useState("");
    const [linkInstagram, setLinkInstagram] = useState("");

    useEffect(() => {
        settingsReady.then(() => {
            setTitle(API_TITLE());
            setDescraption(API_Descraption());
            setLocation(API_location());
            setWhatsappDepartments(API_whatsappDepartments());
            setLinkFacebook(API_LinkFacebook());
            setLinkInstagram(API_LinkInstagram());
        });
    }, []);

    const createWhatsAppLink = (phoneNumber) => {
        return `https://wa.me/${phoneNumber}`;
    };

    return (
        // <footer className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-12">
        //     <div className="mx-auto px-4 sm:px-6 lg:px-8">
        //         <div className="flex items-start justify-between gap-8 flex-wrap md:flex-nowrap">
        //             {/* القسم الأول */}
        //             <div className="w-full">
        //                 <h4 className="text-lg md:text-3xl text-[#F0E68C] font-semibold mb-4">
        //                     {title || "جاري التحميل..."}
        //                 </h4>
        //                 <p className="text-white md:text-lg">
        //                     {descraption || "جاري تحميل الوصف..."}
        //                 </p>
        //             </div>

        //             {/* القسم الثاني */}
        //             <div className="w-full">
        //                 <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>

        //                 {/* العنوان */}
        //                 <p className="text-white mb-2 gap-2 flex items-center">
        //                     <i className="fas fa-map-marker-alt mr-2"></i>
        //                     {location || "جاري تحميل العنوان..."}
        //                 </p>

        //                 {/* أقسام الواتساب */}
        //                 {whatsappDepartments.map((department, index) => (
        //                     <div
        //                         key={index}
        //                         className="text-white mb-2 gap-2 flex items-center"
        //                     >
        //                         <i className="fa-brands fa-whatsapp mr-2 text-lg"></i>
        //                         <div>
        //                             <a
        //                                 href={createWhatsAppLink(
        //                                     department.phoneNumber
        //                                 )}
        //                                 target="_blank"
        //                                 rel="noopener noreferrer"
        //                                 className="flex gap-2 underline"
        //                             >
        //                                 <span>{department.title}:</span>
        //                                 <span>+{department.phoneNumber}</span>
        //                             </a>
        //                         </div>
        //                     </div>
        //                 ))}

        //                 {/* فيسبوك */}
        //                 <div className="text-white mb-2 gap-2 flex items-center">
        //                     <i className="fa-brands fa-facebook mr-2 text-lg"></i>
        //                     <div>
        //                         <a
        //                             href={linkFacebook}
        //                             target="_blank"
        //                             rel="noopener noreferrer"
        //                             className="underline"
        //                         >
        //                             {title || "فيسبوك"}
        //                         </a>
        //                     </div>
        //                 </div>

        //                 {/* إنستغرام */}
        //                 <div className="text-white mb-2 gap-2 flex items-center">
        //                     <i className="fa-brands fa-instagram mr-2 text-lg"></i>
        //                     <div>
        //                         <a
        //                             href={linkInstagram}
        //                             target="_blank"
        //                             rel="noopener noreferrer"
        //                             className="underline"
        //                         >
        //                             {title || "إنستغرام"}
        //                         </a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //         {/* الحقوق */}
        //         <div className="border-t border-white mt-8 pt-8 text-center text-sm text-white flex items-center justify-between flex-wrap">
        //             <p>
        //                 &copy; {new Date().getFullYear()}{" "}
        //                 {title || "اسم الشركة"}. جميع الحقوق محفوظة.
        //             </p>
        //             <p className="mt-6 md:mt-0">
        //                 صمم هذا الموقع بواسطة{" "}
        //                 <a href="https://www.facebook.com/share/1MkAoDQycF/">
        //                     وسام شاكر
        //                 </a>{" "}
        //                 بالتعاون مع شركة Smart Tag
        //             </p>
        //         </div>
        //     </div>
        // </footer>
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; 2025 معرض المفروشات. جميع الحقوق محفوظة.</p>
            </div>
        </footer>
    );
}
