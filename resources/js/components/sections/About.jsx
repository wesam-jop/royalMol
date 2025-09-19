import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* عناصر زخرفية */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#fe8668] rounded-full -translate-y-1/2 translate-x-1/3 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fe8668] rounded-full translate-y-1/2 -translate-x-1/2 opacity-30"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#fe8668] to-[#e55b44] text-white text-sm font-semibold rounded-full mb-4">
            تعرف على بازارلي
          </span>
          <div>
            <h2 className="text-5xl font-bold text-[#082755] mb-4 relative inline-block py-10">
              عن بازارلي
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              بازارلي هو وجهتك المثالية للتسوق عبر الإنترنت حيث تجد كل ما تحتاجه من مكان واحد بسهولة وأمان.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 gap-2">
                <div className="bg-[#fe8668] p-3 rounded-full mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-[#082755]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">منتجات متنوعة</h3>
                  <p className="text-gray-600">كل ما تحتاجه من أزياء، إلكترونيات، مستلزمات منزلية وأكثر في مكان واحد.</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 gap-2">
                <div className="bg-[#fe8668] p-3 rounded-full mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-[#082755]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">بائعون موثوقون</h3>
                  <p className="text-gray-600">نحرص على أن يكون جميع البائعين معتمدين لضمان جودة المنتجات وخدمة العملاء.</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 gap-2">
                <div className="bg-[#fe8668] p-3 rounded-full mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-[#082755]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">دعم متواصل</h3>
                  <p className="text-gray-600">فريق خدمة عملاء جاهز لمساعدتك والإجابة على استفساراتك في أي وقت.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="تسوق من بازارلي"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-semibold">تجربة سلسة</h3>
                    <p className="text-sm">واجهة سهلة الاستخدام تناسب جميع الأعمار</p>
                  </div>
                </div>
              </div>

              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg mt-10 transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="منتجات بازارلي"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-semibold">أسعار منافسة</h3>
                    <p className="text-sm">عروض وتخفيضات يومية على مختلف المنتجات</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-[#fe8668] rounded-2xl -z-10"></div>
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#082755] rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
