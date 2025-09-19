import axios from 'axios';

const axiosClient = axios.create({
    withCredentials: true, // للـ session cookies
    baseURL: '/', // أو window.location.origin
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
        'Accept': 'application/json',
    },
});

// ✅ Interceptor لإضافة الـ Bearer token تلقائياً
axiosClient.interceptors.request.use((config) => {
    // جيب الـ token من localStorage
    const token = localStorage.getItem('category_token');
    if (token && !config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // للـ FormData، خلي الـ Content-Type يتحدد تلقائياً
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    
    console.log('Axios Request:', config.method.toUpperCase(), config.url, 'Token:', token ? '✅' : '❌');
    
    return config;
});

// ✅ Interceptor لمعالجة الـ 401 (token منتهي)
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // مسح الـ token وإعادة توجيه للـ login
            localStorage.removeItem('category_token');
            delete axiosClient.defaults.headers.common['Authorization'];
            window.location.href = '/categories/login';
        }
        return Promise.reject(error);
    }
);

export default axiosClient;