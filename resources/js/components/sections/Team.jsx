import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

const TEAM = [
  
];

// SVG Icons
const FacebookIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const TwitterIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
);

const LinkedinIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.626 5.367 11.991 11.988 11.991s11.991-5.365 11.991-11.991C23.999 5.367 18.642.001 12.017.001zM6.487 21.506A4.512 4.512 0 0 1 1 16.999v-4.507c0-2.473 2.004-4.477 4.487-4.477s4.477 2.004 4.477 4.477v4.507c0 1.245-.752 2.311-1.812 2.781a4.48 4.48 0 0 1-1.675.337zM20.517 11.987c0-2.473-2.004-4.477-4.487-4.477s-4.477 2.004-4.477 4.477v4.507c0 2.473 2.004 4.477 4.477 4.477s4.487-2.004 4.487-4.477V11.987zm-3.549 7.519a.844.844 0 0 1-.844.844.844.844 0 0 1-.844-.844v-2.675a.844.844 0 0 1 .844-.844.844.844 0 0 1 .844.844v2.675z" />
    </svg>
);

const EmailIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
);

// Social Icons Configuration
const socialIcons = [
    {
        icon: FacebookIcon,
        color: 'text-blue-600 hover:text-blue-800',
        key: 'facebook'
    },
    {
        icon: TwitterIcon,
        color: 'text-blue-400 hover:text-blue-600',
        key: 'twitter'
    },
    {
        icon: LinkedinIcon,
        color: 'text-blue-700 hover:text-blue-900',
        key: 'linkedin'
    },
    {
        icon: InstagramIcon,
        color: 'text-pink-600 hover:text-pink-800',
        key: 'instagram'
    },
    {
        icon: EmailIcon,
        color: 'text-red-600 hover:text-red-800',
        key: 'email'
    },
];

export default function Team() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/team');
                const data = await res.json();
                setMembers(Array.isArray(data.data) ? data.data : []);
            } catch (e) {
                setError('فشل في جلب أعضاء الفريق');
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    const SocialLinks = ({ social }) => (
        <div className="flex justify-center space-x-3 space-x-reverse mt-4">
            {socialIcons.map((item, index) => (
                social && social[item.key] && (
                    <a
                        key={index}
                        href={social[item.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 transform hover:scale-110 shadow-sm ${item.color}`}
                        aria-label={`اتبع ${social?.email || ''} على ${item.key}`}
                    >
                        <item.icon />
                    </a>
                )
            ))}
        </div>
    );

    return (
        <section id="team" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="container mx-auto px-6 py-1">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#fe8668] to-[#e55b44] text-white text-sm font-semibold rounded-full mb-4">
                        تعرف على فريقنا
                    </span>
                    <h2 className="text-4xl md:text-5xl py-5 font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                        فريق المعرض
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        مجموعة من المحترفين المبدعين الذين يعملون معًا لتقديم تجربة فنية استثنائية
                    </p>
                </div>

                {/* Swiper */}
                <Swiper
                    modules={[Navigation, Autoplay, Pagination]}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        renderBullet: function (index, className) {
                            return `<span class="${className} bg-gradient-to-r from-blue-500 to-purple-500 "></span>`;
                        }
                    }}
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                        1280: { slidesPerView: 4, spaceBetween: 32 },
                    }}
                    className="team-swiper"
                >
                    {(members.length ? members : TEAM).map((member, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="group my-10 relative">
                                {/* Card */}
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:-translate-y-2">
                                    {/* Image Container */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <SocialLinks social={member.social} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Name & Role */}
                                        <div className="text-center mb-4">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                                {member.name}
                                            </h3>
                                            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
                                                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></span>
                                                {member.role}
                                            </div>
                                        </div>

                                        {/* Bio */}
                                        <p className="text-gray-600 text-sm leading-relaxed text-center line-clamp-3">
                                            {member.bio}
                                        </p>

                                        {/* Bottom Social Links */}
                                        <div className="flex justify-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <SocialLinks social={member.social} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx>{`
        .team-swiper .swiper-button-prev-custom,
        .team-swiper .swiper-button-next-custom {
          color: transparent;
        }
        .team-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: transparent;
          opacity: 1;
          margin: 0 4px;
        }
        .team-swiper .swiper-pagination-bullet-active {
          background: transparent;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            display: none;
          }
        }
      `}</style>
        </section>
    );
}