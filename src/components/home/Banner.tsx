import { useState } from "react";
import FsLightbox from "fslightbox-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { SwiperOptions } from 'swiper/types';
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import 'swiper/css';
import 'swiper/css/pagination';

export const Banner = () => {
    const [lightboxToggler, setLightboxToggler] = useState(false);

    // Keep existing swiper settings
    const swiperSettings: SwiperOptions = {
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 16000,
            disableOnInteraction: false,
        },
        pagination: {
            clickable: true,
            renderBullet: function (_index: number, className: string) {
                return `<span class="${className} !w-2 !h-2 !bg-primary !opacity-50 hover:!opacity-100 !rounded-full"></span>`;
            },
            verticalClass: 'swiper-pagination-vertical',
        },
        modules: [Pagination, Autoplay],
    };

    const slides = [
        {
            bgImage: '/images/banner-bg.jpg',
            title: 'CarbonFi',
            subtitle: 'DECENTRALIZED CARBON FINANCE',
            description: 'CarbonFi is an advanced blockchain-based platform ecosystem designed to transform the carbon credit market and support impactful climate action'
        },
        {
            bgImage: '/images/banner-bg2.jpg',
            title: 'CarbonFi',
            subtitle: 'BLOCKCHAIN-POWERED SOLUTIONS',
            description: 'Join the future of sustainable finance with our innovative carbon credit trading platform'
        }
    ];

    const handleWhitepaperClick = () => {
        window.open('/carbonfi-whitepaper.pdf', '_blank');
    };

    return (
        <div className="h-screen w-full relative">
            <Swiper {...swiperSettings} className="h-full w-full">
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {/* Keep existing section structure */}
                        <section
                            className="relative h-full w-full flex items-center"
                            style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${slide.bgImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black opacity-30" />

                            <Container className="relative z-10">
                                <div className="flex flex-col justify-center h-full">
                                    <div className="lg:ml-[calc((100%-1280px)/2)] px-4 sm:px-6 lg:px-8 pt-20">
                                        <div className="w-full lg:max-w-[650px]">
                                            <span className="inline-block text-primary font-medium tracking-wider mb-4 text-sm
                                                         animate-[slideDown_1s_ease-out] opacity-0 [animation-fill-mode:forwards]">
                                                {slide.subtitle}
                                            </span>

                                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4
                                                       animate-[slideUp_1s_ease-out] opacity-0 [animation-fill-mode:forwards]
                                                       [animation-delay:0.3s] leading-tight">
                                                {slide.title}
                                            </h1>

                                            <p className="text-base md:text-lg text-gray-100 mb-8 max-w-[540px] leading-relaxed
                                                      animate-[slideUp_1s_ease-out] opacity-0 [animation-fill-mode:forwards]
                                                      [animation-delay:0.5s]">
                                                {slide.description}
                                            </p>

                                            <div className="flex flex-col sm:flex-row gap-4
                                                        animate-[slideUp_1s_ease-out] opacity-0
                                                        [animation-fill-mode:forwards] [animation-delay:0.7s]">
                                                <Button
                                                    variant="primary"
                                                    size="lg"
                                                    onClick={handleWhitepaperClick}
                                                    className="bg-primary hover:bg-primary-dark font-medium px-8 py-3 text-base
                                                           rounded-full shadow-lg shadow-primary/20
                                                           hover:shadow-primary/40 transition-all duration-300"
                                                >
                                                    Read Whitepaper
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="lg"
                                                    onClick={() => setLightboxToggler(!lightboxToggler)}
                                                    className="border-2 border-white text-white hover:bg-white/10
                                                           px-8 py-3 text-base rounded-full transition-all duration-300"
                                                >
                                                    Watch Video
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Container>

                            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent" />
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent" />
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Keep existing pagination styles */}
            <style>
                {`
                    .swiper-pagination {
                        right: 2rem !important;
                        left: auto !important;
                        top: auto !important;
                        bottom: auto !important;
                        transform: none !important;
                        width: auto !important;
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        height: fit-content;
                        position: absolute !important;
                        top: 50% !important;
                        margin-top: 2rem;
                    }
                    .swiper-pagination-bullet {
                        margin: 0 !important;
                        transition: all 0.3s ease;
                        position: relative;
                    }
                    .swiper-pagination-bullet::after {
                        content: '';
                        position: absolute;
                        inset: -4px;
                        border: 1px solid transparent;
                        border-radius: 9999px;
                        transition: all 0.3s ease;
                    }
                    .swiper-pagination-bullet:hover::after {
                        border-color: rgba(84, 130, 65, 0.3);
                    }
                    .swiper-pagination-bullet-active {
                        background: #548241 !important;
                        opacity: 1 !important;
                    }
                    .swiper-pagination-bullet-active::after {
                        border-color: rgba(84, 130, 65, 0.5);
                    }
                `}
            </style>

            <FsLightbox
                toggler={lightboxToggler}
                sources={[
                    "https://www.youtube.com/watch?v=YOUR_VIDEO_ID" // Replace with your YouTube video ID
                ]}
            />
        </div>
    );
};