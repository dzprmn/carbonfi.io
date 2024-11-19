    import { Container } from '@/components/shared/Container';
    import { FaDownload } from 'react-icons/fa6';
    import { FC } from 'react';
    import { Button } from '@/components/shared/Button';

    const DOCUMENT_FEATURES = [
        'Technical Architecture',
        'Token Economics',
        'Carbon Credit Trading Mechanism',
        'Environmental Impact Analysis'
    ] as const;

    const FeatureList: FC = () => (
        <div className="space-y-4 mb-8">
            {DOCUMENT_FEATURES.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3 text-gray-600 group
                             transform transition-all duration-300 hover:translate-x-2"
                >
                    <div className="w-2 h-2 rounded-full bg-primary
                                  transform transition-all duration-300
                                  group-hover:scale-150 group-hover:bg-primary-light" />
                    <span className="group-hover:text-gray-800 transition-colors duration-300">
                        {item}
                    </span>
                </div>
            ))}
        </div>
    );

    export const Whitepaper = () => {
        return (
            <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
                {/* Background with Image and Overlay */}
                <div className="fixed inset-0">
                    <img
                        src="/images/about-bg.jpg"
                        alt=""
                        className="w-full h-full object-cover object-center"
                    />
                    {/*<div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95"/>*/}
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] bg-repeat opacity-5"/>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-blob"/>
                <div
                    className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-blob animation-delay-2000"/>

                <Container className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/images/sub-title-shape.png"
                                    alt=""
                                    className="w-6 animate-pulse"
                                    draggable={false}
                                />
                                <span className="text-primary font-medium tracking-wider">
                                    WHITEPAPER
                                </span>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 pb-8 border-b border-gray-200">
                                    Download Our Whitepaper
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    Explore the comprehensive details of CarbonFi's technology,
                                    tokenomics, and vision for revolutionizing the carbon credit
                                    market in our detailed whitepaper.
                                </p>
                            </div>

                            <FeatureList/>

                            {/* Download Button */}
                            <Button
                                onClick={() => window.open('/carbonfi-whitepaper.pdf', '_blank')}
                                className="inline-flex items-center gap-3 px-8 py-4
                                     bg-primary hover:bg-primary-dark text-white rounded-full
                                     transition-all duration-300 shadow-lg shadow-primary/10
                                     hover:shadow-primary/20 group"
                            >
                                Download Whitepaper
                                <FaDownload className="transition-transform duration-300
                                               group-hover:translate-y-1" />
                            </Button>
                        </div>

                        {/* Right Image with Enhanced Animation */}
                        <div className="relative group">
                            {/* Decorative gradient behind image */}
                            <div className="absolute inset-4 bg-gradient-to-r from-primary/20
                                          to-primary-dark/20 rounded-2xl blur-xl
                                          transition-all duration-500 group-hover:inset-2"/>

                            {/* Main image with hover effects */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/20 rounded-2xl transform rotate-3
                                    transition-transform duration-300 group-hover:rotate-6"/>
                                <img
                                    src="/images/about2.png"
                                    alt="About CarbonFi"
                                    className="relative w-full rounded-2xl shadow-xl transform transition-transform
                                     duration-300 group-hover:translate-y-[-5px]"
                                    draggable={false}
                                />
                            </div>

                            {/* Animated decorative elements */}
                            <div className="absolute -top-8 -right-8 w-32 h-32
                                          bg-primary/10 rounded-full blur-3xl
                                          animate-pulse animation-delay-100"/>
                            <div className="absolute -bottom-8 -left-8 w-32 h-32
                                          bg-primary/10 rounded-full blur-3xl
                                          animate-pulse animation-delay-300"/>
                        </div>
                    </div>
                </Container>

                <style>{`
                    @keyframes subtle-zoom {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                    
                    @keyframes blob {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        25% { transform: translate(20px, 0) scale(1.1); }
                        50% { transform: translate(20px, 20px) scale(1); }
                        75% { transform: translate(0, 20px) scale(0.9); }
                    }
    
                    .animate-subtle-zoom {
                        animation: subtle-zoom 20s infinite;
                    }
    
                    .animate-blob {
                        animation: blob 7s infinite;
                    }
    
                    .animation-delay-100 {
                        animation-delay: 100ms;
                    }
    
                    .animation-delay-300 {
                        animation-delay: 300ms;
                    }
    
                    .animation-delay-2000 {
                        animation-delay: 2s;
                    }
                `}</style>
            </section>
        );
    };