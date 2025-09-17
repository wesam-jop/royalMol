import React, { useState, useEffect } from "react";
import {
    Phone,
    MapPin,
    Facebook,
    Instagram,
    MessageCircle,
} from "lucide-react";

// الثوابت من ملف الإعدادات
const URL = "http://127.0.0.1:8000";
const API_TITLE = "شركة ايلاف للزيوت";
const Numper_Phone = "963949596489";
const API_Descraption = `شركة ايلاف للزيوت هي شركة متخصصة في تجارة وبيع الزيوت الطبيعية والزيوت الصناعية، ويقع مقرها الرئيسي في مدينة إدلب، سوريا. تأسست الشركة لتقديم حلول زيتية مبتكرة تلبي احتياجات العملاء من الأفراد والشركات على حد سواء، مع التركيز على الجودة والتصاميم الراقية.`;
const API_location = `فرع اول سرمدا السوق التجاري فرع ثاني ادلب شرق دوار المحراب`;
const API_LinkFacebook = `https://www.facebook.com/guclu.insaat.sarmada.20`;
const API_LinkInstagram = `https://www.facebook.com/guclu.insaat.sarmada.20`;
const API_whatsappDepartments = [
    {
        title: "قسم مبيعات المفرق",
        phoneNumber: "963949596489",
    },
    {
        title: "قسم مبيعات الجملة",
        phoneNumber: "352681614700",
    },
];

const SettingsDisplay = () => {
    const [settings, setSettings] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);
    const [whatsappDepartments, setWhatsappDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [useApiData, setUseApiData] = useState(false);

    // دالة لجلب جميع الإعدادات
    const fetchSettings = async () => {
        try {
            const response = await fetch(`${URL}/api/settings`);
            if (!response.ok) throw new Error("فشل في جلب الإعدادات");
            const data = await response.json();
            setSettings(data);
        } catch (err) {
            console.error("خطأ في جلب الإعدادات:", err);
        }
    };

    // دالة لجلب معلومات الشركة
    const fetchCompanyInfo = async () => {
        try {
            const response = await fetch(`${URL}/api/settings/company`);
            if (!response.ok) throw new Error("فشل في جلب معلومات الشركة");
            const data = await response.json();
            setCompanyInfo(data);
        } catch (err) {
            console.error("خطأ في جلب معلومات الشركة:", err);
        }
    };

    // دالة لجلب معلومات الاتصال
    const fetchContactInfo = async () => {
        try {
            const response = await fetch(`${URL}/api/settings/contact`);
            if (!response.ok) throw new Error("فشل في جلب معلومات الاتصال");
            const data = await response.json();
            setContactInfo(data);
        } catch (err) {
            console.error("خطأ في جلب معلومات الاتصال:", err);
        }
    };

    // دالة لجلب أقسام الواتساب
    const fetchWhatsappDepartments = async () => {
        try {
            const response = await fetch(`${URL}/api/settings/whatsapp`);
            if (!response.ok) throw new Error("فشل في جلب أقسام الواتساب");
            const data = await response.json();
            setWhatsappDepartments(data);
        } catch (err) {
            console.error("خطأ في جلب أقسام الواتساب:", err);
            // استخدام البيانات المحلية في حالة فشل الـ API
            setWhatsappDepartments(API_whatsappDepartments);
        }
    };

    // جلب البيانات عند تحميل المكون
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            if (useApiData) {
                try {
                    await Promise.all([
                        fetchSettings(),
                        fetchCompanyInfo(),
                        fetchContactInfo(),
                        fetchWhatsappDepartments(),
                    ]);
                } catch (err) {
                    setError("حدث خطأ في جلب البيانات من الخادم");
                }
            } else {
                // استخدام البيانات المحلية
                setWhatsappDepartments(API_whatsappDepartments);
            }

            setLoading(false);
        };

        fetchData();
    }, [useApiData]);

    // عرض حالة التحميل
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
                </div>
            </div>
        );
    }

    // البيانات المعروضة (من الـ API أو المحلية)
    const displayData = useApiData
        ? {
              title: companyInfo?.name || settings?.company_name || API_TITLE,
              description:
                  companyInfo?.description ||
                  settings?.description ||
                  API_Descraption,
              location:
                  contactInfo?.address || settings?.address || API_location,
              phone: contactInfo?.phone || settings?.phone || Numper_Phone,
              facebook:
                  contactInfo?.facebook ||
                  settings?.facebook_link ||
                  API_LinkFacebook,
              instagram:
                  contactInfo?.instagram ||
                  settings?.instagram_link ||
                  API_LinkInstagram,
              whatsappDepts:
                  whatsappDepartments.length > 0
                      ? whatsappDepartments
                      : API_whatsappDepartments,
          }
        : {
              title: API_TITLE,
              description: API_Descraption,
              location: API_location,
              phone: Numper_Phone,
              facebook: API_LinkFacebook,
              instagram: API_LinkInstagram,
              whatsappDepts: API_whatsappDepartments,
          };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* رأس الصفحة */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        {displayData.title}
                    </h1>
                    <div className="flex justify-center items-center space-x-4 mb-6">
                        <button
                            onClick={() => setUseApiData(false)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                !useApiData
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            البيانات المحلية
                        </button>
                        <button
                            onClick={() => setUseApiData(true)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                useApiData
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            بيانات من الـ API
                        </button>
                    </div>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}
                </div>

                <div className="grid gap-6">
                    {/* بطاقة معلومات الشركة */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            نبذة عن الشركة
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-right">
                            {displayData.description}
                        </p>
                    </div>

                    {/* بطاقة معلومات الاتصال */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            معلومات الاتصال
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* الهاتف */}
                            <div className="flex items-center space-x-3 space-x-reverse">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <Phone className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        رقم الهاتف
                                    </p>
                                    <p
                                        className="text-lg font-semibold text-gray-800"
                                        dir="ltr"
                                    >
                                        +{displayData.phone}
                                    </p>
                                </div>
                            </div>

                            {/* الموقع */}
                            <div className="flex items-start space-x-3 space-x-reverse">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        العنوان
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800 text-right">
                                        {displayData.location}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* روابط التواصل الاجتماعي */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                تابعنا على
                            </h3>
                            <div className="flex space-x-4 space-x-reverse">
                                <a
                                    href={displayData.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 space-x-reverse bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Facebook className="w-5 h-5" />
                                    <span>فيسبوك</span>
                                </a>
                                <a
                                    href={displayData.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                                >
                                    <Instagram className="w-5 h-5" />
                                    <span>انستغرام</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* أقسام الواتساب */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            أقسام الواتساب
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            {displayData.whatsappDepts.map((dept, index) => (
                                <div
                                    key={index}
                                    className="bg-green-50 rounded-lg p-4 border border-green-200"
                                >
                                    <div className="flex items-center space-x-3 space-x-reverse">
                                        <div className="bg-green-100 p-2 rounded-full">
                                            <MessageCircle className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">
                                                {dept.title}
                                            </h3>
                                            <p
                                                className="text-green-600 font-medium"
                                                dir="ltr"
                                            >
                                                +{dept.phoneNumber}
                                            </p>
                                        </div>
                                        <a
                                            href={`https://wa.me/${dept.phoneNumber}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors"
                                        >
                                            محادثة
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* عرض البيانات الخام (للاختبار) */}
                    {useApiData && (settings || companyInfo || contactInfo) && (
                        <div className="bg-gray-100 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                البيانات من الـ API (للاختبار)
                            </h2>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                                {settings && (
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            جميع الإعدادات:
                                        </h3>
                                        <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-32">
                                            {JSON.stringify(settings, null, 2)}
                                        </pre>
                                    </div>
                                )}
                                {companyInfo && (
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            معلومات الشركة:
                                        </h3>
                                        <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-32">
                                            {JSON.stringify(
                                                companyInfo,
                                                null,
                                                2
                                            )}
                                        </pre>
                                    </div>
                                )}
                                {contactInfo && (
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            معلومات الاتصال:
                                        </h3>
                                        <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-32">
                                            {JSON.stringify(
                                                contactInfo,
                                                null,
                                                2
                                            )}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsDisplay;
