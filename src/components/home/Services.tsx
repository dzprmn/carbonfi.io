import { Container } from '@/components/shared/Container';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';

interface ServiceItem {
    id: number;
    serviceImg: string;
    serviceIcon: string;
    serviceUrl: string;
    serviceTitle: string;
    serviceDesc: string;
    serviceShape: string;
}

const SERVICES: ServiceItem[] = [
    {
        id: 1,
        serviceImg: '/images/services-thumb.png',
        serviceIcon: '/images/service-icon1.png',
        serviceUrl: '/',
        serviceTitle: 'Tracing - Tracking - Trading',
        serviceDesc: 'CarbonFi enables seamless Tracing and Tracking of carbon credits from the generation to the certification using blockchain technology. This ensures transparency and accountability, while the Trading feature allows easy and secure exchange of tokenized carbon credits in decentralized marketplace.',
        serviceShape: '/images/service-shape.png',
    },
    {
        id: 2,
        serviceImg: '/images/services-thumb2.png',
        serviceIcon: '/images/service-icon2.png',
        serviceUrl: '/',
        serviceTitle: 'Carbon Initiative Project',
        serviceDesc: 'The Carbon Initiative Project by CarbonFi supports green investments by funding projects that actively reduce carbon emissions. This initiative empowers businesses and individuals to contribute to environmental sustainability while generating financial returns through carbon credits.',
        serviceShape: '/images/service-shape.png',
    },
] as const;

const ServiceCard: FC<ServiceItem> = ({
                                          serviceImg,
                                          serviceIcon,
                                          serviceTitle,
                                          serviceDesc,
                                          serviceShape,
                                          serviceUrl,
                                      }) => (
    <Link
        to={serviceUrl}
        className="group block relative z-10 h-full transform transition-all duration-500
                 hover:translate-y-[-8px]"
    >
        <div className="p-6 sm:p-8 rounded-2xl bg-[#f5f8ed] h-full relative overflow-hidden
                     transition-all duration-500 shadow-xl hover:shadow-2xl
                     before:absolute before:inset-0 before:bg-[#1a1a1a]/95 before:-z-10
                     before:transform before:translate-y-full before:transition-transform
                     before:duration-500 hover:before:translate-y-0">
            <div className="overflow-hidden rounded-xl relative group-hover:shadow-lg">
                <div className="absolute inset-0 bg-black/20 transform scale-0 transition-transform
                            duration-500 group-hover:scale-100 z-10" />
                <img
                    src={serviceImg}
                    alt={serviceTitle}
                    draggable={false}
                    className="w-full h-[280px] sm:h-[320px] lg:h-[280px] object-cover
                             transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 p-1 transform transition-all duration-500
                                  group-hover:scale-110">
                        <img
                            src={serviceIcon}
                            alt=""
                            draggable={false}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <h3 className="flex-1 relative font-semibold text-xl sm:text-2xl text-primary/80
                                pb-3 transition-colors duration-500 group-hover:text-primary
                                after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5
                                after:bg-primary after:transition-all after:duration-500
                                group-hover:after:bg-primary/80 group-hover:after:w-12">
                        {serviceTitle}
                    </h3>
                </div>

                <p className="text-gray-500 leading-relaxed transition-colors duration-500
                          group-hover:text-gray-900">
                    {serviceDesc}
                </p>

                <div className="flex items-center gap-2 text-primary font-medium pt-4
                            opacity-0 transform translate-y-4 transition-all duration-500
                            group-hover:opacity-100 group-hover:translate-y-0">
                    Learn More
                    <FaArrowRight className="transition-transform duration-300
                                         group-hover:translate-x-2" />
                </div>
            </div>

            <img
                src={serviceShape}
                alt=""
                draggable={false}
                className="absolute -z-10 rotate-90 -bottom-28 -right-28 transition-all
                         duration-500 opacity-30 group-hover:-bottom-[14px]
                         group-hover:-right-2 group-hover:opacity-10"
            />
        </div>
    </Link>
);

export const Services = () => (
    <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[url('/images/service-bg.jpg')] bg-cover
                      bg-center bg-fixed opacity-90" />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

        {/* Animated blobs */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full
                      blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full
                      blur-3xl animate-blob animation-delay-2000" />

        <Container className="relative z-10">
            <div className="mb-16 space-y-4">
                <div className="flex items-center gap-2">
                    <img
                        src="/images/sub-title-shape.png"
                        alt=""
                        className="w-6 animate-pulse"
                        draggable={false}
                    />
                    <span className="text-primary font-medium tracking-wider">
                        MAIN PROJECT
                    </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 pb-6
                           border-b border-gray-200">
                    CarbonFi Core Projects
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {SERVICES.map((service) => (
                    <ServiceCard key={service.id} {...service} />
                ))}
            </div>
        </Container>

        <style>{`
            @keyframes blob {
                0%, 100% { transform: translate(0, 0) scale(1); }
                25% { transform: translate(20px, 0) scale(1.1); }
                50% { transform: translate(20px, 20px) scale(1); }
                75% { transform: translate(0, 20px) scale(0.9); }
            }
            .animate-blob {
                animation: blob 7s infinite;
            }
            .animation-delay-2000 {
                animation-delay: 2s;
            }
        `}</style>
    </section>
);