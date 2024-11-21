import { Container } from '@/components/shared/Container';
import { Button } from '@/components/shared/Button';
import { FC } from 'react';
import {FaArrowRight} from "react-icons/fa6";
import {Link} from "react-router-dom";

interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

const FEATURES: FeatureItem[] = [
    {
        icon: '/images/about-icon.png',
        title: 'Economic Benefits',
        description: 'CarbonFi creates new revenue opportunities by transforming carbon credits into digital assets, enabling transparent trading and sustainable economic growth.'
    },
    {
        icon: '/images/about-icon2.png',
        title: 'Safe Environment',
        description: 'CarbonFi ensures a safe environment by promoting transparency, accountability, and security in carbon credit trading through blockchain technology.'
    }
] as const;

const FeatureCard: FC<{ feature: FeatureItem }> = ({ feature }) => (
    <div className="flex gap-4 md:gap-6 items-start group transition-all duration-300 hover:translate-x-1">
        <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg p-2
                      transition-all duration-300 group-hover:bg-primary/20">
            <img
                src={feature.icon}
                alt={feature.title}
                className="w-full h-full object-contain"
                draggable={false}
            />
        </div>
        <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2
                         transition-colors duration-300 group-hover:text-primary">
                {feature.title}
            </h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {feature.description}
            </p>
        </div>
    </div>
);

export const About = () => {
    return (
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/about-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-80" />

            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

            <img
                src="/images/about-shape-1.png"
                alt=""
                className="absolute top-32 right-20 animate-pulse hidden 2xl:block"
                draggable={false}
            />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl transform rotate-3
                                    transition-transform duration-300 group-hover:rotate-6" />
                        <img
                            src="/images/about2.png"
                            alt="About CarbonFi"
                            className="relative w-full rounded-2xl shadow-xl transform transition-transform
                                     duration-300 group-hover:translate-y-[-5px]"
                            draggable={false}
                        />
                    </div>

                    <div className="relative space-y-8">
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/sub-title-shape.png"
                                alt=""
                                className="w-6"
                                draggable={false}
                            />
                            <span className="text-primary font-medium tracking-wider text-sm md:text-base">
                                ABOUT CARBONFI
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight pb-6 border-b border-gray-200">
                            Environmental Sustainable
                            <br />
                            Forever Green Future
                        </h2>

                        <div className="space-y-6 md:space-y-8">
                            {FEATURES.map((feature, index) => (
                                <FeatureCard key={index} feature={feature} />
                            ))}
                        </div>

                        <Button
                            variant="primary"
                            size="lg"
                            className="transform transition-all duration-300 hover:translate-y-[-2px]"
                        >
                            <Link to="/about" className="inline-flex items-center gap-2">
                                About CarbonFi
                                <FaArrowRight className="transform transition-transform duration-300
                                                 group-hover:translate-x-2" />
                            </Link>

                        </Button>

                        <img
                            src="/images/about-shape.png"
                            alt=""
                            className="absolute -bottom-0 left-1/2 animate-pulse hidden sm:block"
                            draggable={false}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};