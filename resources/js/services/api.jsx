// API Configuration

export const API_URL = `${window.location.origin}`;
const BASE_URL = `${window.location.origin}/api`;

// Settings object that will hold the API values
let settings = {};

// API fetching functions
const fetchSettings = async () => {
    try {
        const response = await fetch(`${BASE_URL}/settings`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "API returned success: false");
        }

        return result.data;
    } catch (error) {
        console.error("Error fetching general settings:", error);
        throw error;
    }
};

const fetchCompanyInfo = async () => {
    try {
        const response = await fetch(`${BASE_URL}/settings/company`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "API returned success: false");
        }

        return result.data;
    } catch (error) {
        console.error("Error fetching company info:", error);
        throw error;
    }
};

const fetchContactInfo = async () => {
    try {
        const response = await fetch(`${BASE_URL}/settings/contact`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "API returned success: false");
        }

        return result.data;
    } catch (error) {
        console.error("Error fetching contact info:", error);
        throw error;
    }
};

const fetchWhatsappDepartments = async () => {
    try {
        const response = await fetch(`${BASE_URL}/settings/whatsapp`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "API returned success: false");
        }

        return result.data;
    } catch (error) {
        console.error("Error fetching WhatsApp departments:", error);
        throw error;
    }
};

// Function to initialize settings from API
const initializeSettings = async () => {
    try {
        console.log("Fetching settings from API...");

        // Try to fetch all settings at once
        try {
            const apiData = await fetchSettings();

            // Map API response to settings object - exact field names from controller
            settings.API_TITLE = apiData.API_TITLE;
            settings.API_Descraption = apiData.API_Descraption;
            settings.Numper_Phone = apiData.Numper_Phone;
            settings.API_location = apiData.API_location;
            settings.API_LinkFacebook = apiData.API_LinkFacebook;
            settings.API_LinkInstagram = apiData.API_LinkInstagram;
            settings.API_whatsappDepartments =
                apiData.API_whatsappDepartments || [];
        } catch (error) {
            // If general endpoint fails, try specific endpoints
            console.log("Main endpoint failed, trying specific endpoints...");

            try {
                const [companyInfo, contactInfo, whatsappDepartments] =
                    await Promise.all([
                        fetchCompanyInfo(),
                        fetchContactInfo(),
                        fetchWhatsappDepartments(),
                    ]);

                // Map company info (different field names in specific endpoints)
                settings.API_TITLE = companyInfo.company_name;
                settings.API_Descraption = companyInfo.description;
                settings.API_location = companyInfo.location;

                // Map contact info
                settings.Numper_Phone = contactInfo.phone;
                settings.API_LinkFacebook = contactInfo.facebook;
                settings.API_LinkInstagram = contactInfo.instagram;

                // Map WhatsApp departments
                settings.API_whatsappDepartments = whatsappDepartments || [];
            } catch (specificError) {
                console.error("All endpoints failed:", specificError);
                throw new Error("فشل في جلب البيانات من جميع المسارات");
            }
        }

        console.log("Settings loaded from API:", settings);
        return settings;
    } catch (error) {
        console.error("Failed to load settings from API:", error);
        throw error;
    }
};

// Export URL
export const URL = BASE_URL;

// Getter functions that return API values only (with safe defaults)
export const getSettings = () => settings;
export const API_TITLE = () => settings.API_TITLE || "";
export const Numper_Phone = () => settings.Numper_Phone || "";
export const API_Descraption = () => settings.API_Descraption || "";
export const API_location = () => settings.API_location || "";
export const API_LinkFacebook = () => settings.API_LinkFacebook || "";
export const API_LinkInstagram = () => settings.API_LinkInstagram || "";
export const API_whatsappDepartments = () =>
    settings.API_whatsappDepartments || [];

// Initialize function
export const init = initializeSettings;

// Auto-initialize when module loads (with silent error handling)
export const settingsReady = initializeSettings().catch((error) => {
    console.warn("Settings could not be loaded from API:", error.message);
    console.warn("Using empty values until API is available");
    return settings; // Return empty settings object
});

/*
استخدام محدث:

// الطريقة الأولى - انتظار التحميل مع التعامل مع الأخطاء
import { settingsReady, getSettings, API_whatsappDepartments } from './settings';

// استخدام البيانات مباشرة (حتى لو لم تُحمل بعد)
const whatsappDeps = API_whatsappDepartments(); // سيرجع [] إذا لم تُحمل
console.log('أقسام الواتساب:', whatsappDeps);

// أو انتظار التحميل للحصول على البيانات الكاملة
settingsReady.then((apiSettings) => {
    console.log('تم تحميل البيانات بنجاح:', apiSettings);
    console.log('اسم الشركة:', apiSettings.API_TITLE || 'غير متوفر');
}).catch((error) => {
    // هذا لن يحدث الآن لأننا نتعامل مع الأخطاء داخلياً
    console.log('API غير متوفر، استخدام قيم فارغة');
});

// الطريقة الثانية - استخدام مباشر (آمن)
import { API_TITLE, Numper_Phone, API_whatsappDepartments } from './settings';

// هذه الدوال آمنة ولن تسبب أخطاء
const companyName = API_TITLE(); // '' إذا لم تُحمل
const phone = Numper_Phone(); // '' إذا لم تُحمل
const departments = API_whatsappDepartments(); // [] إذا لم تُحمل

// في React Component:
const MyComponent = () => {
    const [settings, setSettings] = useState(getSettings());

    useEffect(() => {
        settingsReady.then(() => {
            setSettings(getSettings()); // تحديث البيانات عندما تُحمل
        });
    }, []);

    return (
        <div>
            <h1>{settings.API_TITLE || 'جاري التحميل...'}</h1>
            <p>{settings.API_Descraption || 'جاري تحميل الوصف...'}</p>
            {settings.API_whatsappDepartments?.map((dept, index) => (
                <div key={index}>{dept.title}</div>
            ))}
        </div>
    );
};
*/
