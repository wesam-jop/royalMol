import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

export default function CategoryDashboard({ category, token }) {
    const [categoryData, setCategoryData] = useState(category || null);
    const [name, setName] = useState(category?.name || '');
    const [email, setEmail] = useState(category?.email || '');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        price: '',
        status: 'active',
        images: [],
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [editImages, setEditImages] = useState([]);
    const [editImagePreviews, setEditImagePreviews] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [productLoading, setProductLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('products'); // إضافة حالة للتبويب النشط

    // إعداد axios مع التوكن + حفظه واستعادته عبر refresh وجلب بيانات الشركة
    useEffect(() => {
        let authToken = token;
        if (authToken) {
            try { localStorage.setItem('category_token', authToken); } catch {}
        } else {
            try { authToken = localStorage.getItem('category_token') || ''; } catch {}
        }

        if (authToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        }
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        const bootstrap = async () => {
            try {
                if (!categoryData && authToken) {
                    const res = await axios.get('/api/categories/me');
                    if (res.data?.success) {
                        const c = res.data.category;
                        setCategoryData(c);
                        setName(c.name || '');
                        setEmail(c.email || '');
                    }
                }
            } catch (e) {
                // ignore
            } finally {
                fetchProducts();
            }
        };

        bootstrap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const fetchProducts = async () => {
        setProductLoading(true);
        try {
            const catId = (categoryData?.id) || (category?.id);
            const response = await axios.get(`/api/products?category_id=${catId ?? ''}`);
            if (response.data.success) {
                setProducts(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.response?.data?.message || 'فشل في جلب المنتجات');
        } finally {
            setProductLoading(false);
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        
        const formData = new FormData();
        if (name !== (categoryData?.name || '')) formData.append('name', name);
        if (email !== (categoryData?.email || '')) formData.append('email', email);
        if (password) formData.append('password', password);
        if (image) formData.append('image', image);

        // إضافة _method للتحديث
        formData.append('_method', 'PUT');

        try {
            const authToken = (() => { try { return localStorage.getItem('category_token'); } catch { return null; } })();
            const headers = { 'Content-Type': 'multipart/form-data' };
            if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
            const response = await axios.post(`/api/categories/${categoryData?.id || category?.id}`, formData, {
                headers,
            });
            
            if (response.data.success) {
                setSuccess('تم تحديث الشركة بنجاح');
                setPassword('');
                setImage(null);
                // تحديث بيانات الشركة المعروضة
                setCategoryData(response.data.category);
            }
        } catch (err) {
            console.error('Error updating category:', err);
            setError(err.response?.data?.message || 'فشل في تحديث الشركة');
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        
        const formData = new FormData();
        formData.append('category_id', (categoryData?.id || category?.id));
        formData.append('title', newProduct.title);
        formData.append('description', newProduct.description);
        formData.append('price', newProduct.price);
        formData.append('status', newProduct.status);
        formData.append('stock', 1);
        
        // إضافة الصور
        newProduct.images.forEach((img, index) => {
            formData.append(`images[${index}]`, img);
        });

        try {
            const response = await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            
            if (response.data.success) {
                setSuccess('تم إضافة المنتج بنجاح');
                setNewProduct({
                    title: '',
                    description: '',
                    price: '',
                    status: 'active',
                    images: [],
                });
                // تنظيف المعاينات
                setImagePreviews([]);
                // إعادة تعيين حقل الملفات
                document.getElementById('product-images').value = '';
                fetchProducts();
                setActiveTab('products'); // الانتقال إلى تبويب المنتجات بعد الإضافة
            }
        } catch (err) {
            console.error('Error adding product:', err);
            setError(err.response?.data?.message || 'فشل في إضافة المنتج');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
        
        setLoading(true);
        setError('');
        setSuccess('');
        
        try {
            const response = await axios.delete(`/api/products/${productId}`);
            if (response.data.success) {
                setSuccess('تم حذف المنتج بنجاح');
                setProducts(products.filter((p) => p.id !== productId));
            }
        } catch (err) {
            console.error('Error deleting product:', err);
            setError(err.response?.data?.message || 'فشل في حذف المنتج');
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (product) => {
        setEditProduct({
            id: product.id,
            title: product.title || '',
            description: product.description || '',
            price: product.price || '',
            status: product.status || 'active',
        });
        setEditImages([]);
        setEditImagePreviews([]);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setEditProduct(null);
        setEditImages([]);
        setEditImagePreviews([]);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        if (!editProduct) return;
        setLoading(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        if (editProduct.title) formData.append('title', editProduct.title);
        if (editProduct.description !== undefined) formData.append('description', editProduct.description);
        if (editProduct.price) formData.append('price', editProduct.price);
        if (editProduct.status) formData.append('status', editProduct.status);
        if (editImages.length > 0) {
            editImages.forEach((file, idx) => formData.append(`images[${idx}]`, file));
        }
        formData.append('_method', 'PUT');

        try {
            const authToken = (() => { try { return localStorage.getItem('category_token'); } catch { return null; } })();
            const headers = { 'Content-Type': 'multipart/form-data' };
            if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
            const response = await axios.post(`/api/products/${editProduct.id}`, formData, { headers });
            if (response.data?.success) {
                setSuccess('تم تحديث المنتج بنجاح');
                closeEditModal();
                fetchProducts();
            }
        } catch (err) {
            console.error('Error updating product:', err);
            setError(err.response?.data?.message || 'فشل في تحديث المنتج');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await axios.post('/api/categories/logout');
        } catch {}
        try { localStorage.removeItem('category_token'); } catch {}
        delete axios.defaults.headers.common['Authorization'];
        setLoading(false);
        Inertia.post('/categories/logout');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* الهيدر */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">لوحة تحكم الشركة</h2>
                        <p className="text-gray-500 mt-1">مرحباً، {(categoryData?.name || category?.name)}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        <span>تسجيل الخروج</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>

                {/* رسائل التنبيه */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {success}
                    </div>
                )}

                {/* التبويبات */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'products' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            المنتجات
                        </button>
                        <button
                            onClick={() => setActiveTab('addProduct')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'addProduct' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            إضافة منتج
                        </button>
                        {/* <button
                            onClick={() => setActiveTab('profile')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            الملف الشخصي
                        </button> */}
                    </nav>
                </div>

                {/* محتوى التبويبات */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* تبويب المنتجات */}
                    {activeTab === 'products' && (
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-xl font-bold">المنتجات الحالية</h3>
                                <span className="text-sm text-gray-500">العدد: {products.length}</span>
                            </div>
                            {productLoading ? (
                                <div className="flex justify-center items-center py-10">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                    <span className="mr-2">جاري تحميل المنتجات...</span>
                                </div>
                            ) : products.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 4h6m-6 4h6" />
                                    </svg>
                                    <p>لا توجد منتجات متاحة</p>
                                    <p className="text-sm mt-2">ابدأ بإضافة منتج جديد من تبويب "إضافة منتج"</p>
                                    <button 
                                        onClick={() => setActiveTab('addProduct')}
                                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        إضافة منتج جديد
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <div key={product.id} className="group bg-gradient-to-b from-white to-gray-50 p-4 rounded-2xl shadow border hover:shadow-lg transition-all duration-300">
                                            <div className="relative mb-3">
                                                {product.images && product.images.length > 0 ? (
                                                    <img
                                                        src={product.images[0].url}
                                                        alt={product.title}
                                                        className="w-full h-48 object-cover rounded-xl border"
                                                    />
                                                ) : (
                                                    <div className="w-full h-48 bg-gray-100 rounded-xl border flex items-center justify-center text-gray-400">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                <span className={`absolute top-2 left-2 px-2 py-1 text-xs rounded-lg ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {product.status === 'active' ? 'متوفر' : 'غير متوفر'}
                                                </span>
                                            </div>
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.title}</h4>
                                                <span className="text-blue-600 font-bold">${parseFloat(product.price).toFixed(2)}</span>
                                            </div>
                                            {product.description && (
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                                            )}
                                            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                                                <span>المخزون: {product.stock ?? 1}</span>
                                                <span>الشركة: {product.category?.name}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-700 disabled:bg-red-300 transition-colors duration-200"
                                                    disabled={loading}
                                                >
                                                    حذف
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200"
                                                >
                                                    تعديل
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* تبويب إضافة منتج */}
                    {activeTab === 'addProduct' && (
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-5">إضافة منتج جديد</h3>
                            <form onSubmit={handleAddProduct} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2">عنوان المنتج</label>
                                        <input
                                            type="text"
                                            value={newProduct.title}
                                            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">السعر</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">الوصف</label>
                                    <textarea
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                        rows="3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">الحالة</label>
                                    <select
                                        value={newProduct.status}
                                        onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                    >
                                        <option value="active">متوفر</option>
                                        <option value="inactive">غير متوفر</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">صور المنتج</label>
                                    <input
                                        id="product-images"
                                        type="file"
                                        multiple
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files || []);
                                            setNewProduct({ ...newProduct, images: files });
                                            // إنشاء معاينات محلية
                                            const previews = files.map((file) => ({
                                                name: file.name,
                                                url: URL.createObjectURL(file),
                                            }));
                                            setImagePreviews(previews);
                                        }}
                                        className="w-full p-2 border rounded-lg transition-colors duration-200"
                                        accept="image/*"
                                    />
                                    <small className="text-gray-500">يمكنك اختيار عدة صور</small>
                                </div>
                                {imagePreviews.length > 0 && (
                                    <div className="mt-3">
                                        <div className="text-sm text-gray-600 mb-2">معاينة الصور ({imagePreviews.length})</div>
                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                            {imagePreviews.map((img, idx) => (
                                                <div key={idx} className="relative group">
                                                    <img src={img.url} alt={img.name} className="w-full h-24 object-cover rounded-lg border" />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const nextImages = [...newProduct.images];
                                                            nextImages.splice(idx, 1);
                                                            setNewProduct({ ...newProduct, images: nextImages });
                                                            const nextPreviews = [...imagePreviews];
                                                            URL.revokeObjectURL(nextPreviews[idx]?.url);
                                                            nextPreviews.splice(idx, 1);
                                                            setImagePreviews(nextPreviews);
                                                        }}
                                                        className="absolute top-1 left-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                                        aria-label="حذف الصورة"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* <div className="text-xs text-gray-500">المخزون مضبوط تلقائياً على 1</div> */}
                                <button
                                    type="submit"
                                    className="w-full md:w-auto bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl shadow hover:from-green-700 hover:to-emerald-700 disabled:from-green-400 disabled:to-emerald-400 transition-all duration-200 flex items-center justify-center gap-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            جاري الإضافة...
                                        </span>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            إضافة المنتج
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* تبويب الملف الشخصي */}
                    {/* {activeTab === 'profile' && (
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-5">بيانات الشركة</h3>
                            <form onSubmit={handleUpdateCategory} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">اسم الشركة</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">الإيميل</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">كلمة المرور الجديدة (اختياري)</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                        placeholder="اترك فارغاً إذا لم ترغب في التغيير"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">صورة الشركة</label>
                                    {(categoryData?.image || category?.image) && (
                                        <img
                                            src={(categoryData?.image || category?.image)}
                                            alt="Category"
                                            className="w-20 h-20 object-cover mb-2 rounded-md border"
                                        />
                                    )}
                                    <input
                                        type="file"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        className="w-full p-2 border rounded-lg transition-colors duration-200"
                                        accept="image/*"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            جاري التحديث...
                                        </span>
                                    ) : 'تحديث الشركة'}
                                </button>
                            </form>
                        </div>
                    )} */}
                </div>
            </div>
            {/* Edit Product Modal */}
            {editModalOpen && editProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h4 className="text-lg font-bold">تعديل المنتج</h4>
                            <button onClick={closeEditModal} className="text-gray-500 hover:text-gray-700">✕</button>
                        </div>
                        <form onSubmit={handleUpdateProduct} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">العنوان</label>
                                    <input
                                        type="text"
                                        value={editProduct.title}
                                        onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">السعر</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        value={editProduct.price}
                                        onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">الوصف</label>
                                <textarea
                                    value={editProduct.description}
                                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">الحالة</label>
                                <select
                                    value={editProduct.status}
                                    onChange={(e) => setEditProduct({ ...editProduct, status: e.target.value })}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="active">متوفر</option>
                                    <option value="inactive">غير متوفر</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">استبدال الصور</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        setEditImages(files);
                                        const previews = files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
                                        setEditImagePreviews(previews);
                                    }}
                                    className="w-full p-2 border rounded-lg"
                                />
                                {editImagePreviews.length > 0 && (
                                    <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                        {editImagePreviews.map((img, idx) => (
                                            <div key={idx} className="relative group">
                                                <img src={img.url} alt={img.name} className="w-full h-24 object-cover rounded-lg border" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-end gap-3 pt-2 border-t mt-2">
                                <button type="button" onClick={closeEditModal} className="px-4 py-2 rounded-lg border hover:bg-gray-50">إلغاء</button>
                                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300" disabled={loading}>
                                    حفظ التعديلات
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}