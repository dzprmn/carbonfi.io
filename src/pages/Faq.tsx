// src/pages/Faq.tsx
import { Container } from '@/components/shared/Container';
import { Accordion } from '@/components/shared/Accordion';

interface FaqItem {
    title: string;
    content: string;
    isOpen?: boolean;
}

const FAQ_ITEMS: FaqItem[] = [
    {
        title: "What is CarbonFi?",
        content: "CarbonFi is a blockchain-based platform designed to tokenize carbon credits, allowing for transparent tracing, tracking, and trading of verified carbon credits while promoting sustainable investments.",
        isOpen: true
    },
    {
        title: "What is Carbon Certification?",
        content: "Carbon certification ensures that all carbon credits on the CarbonFi platform are verified by trusted certification bodies, guaranteeing that emissions reductions are genuine and meet global standards."
    },
    {
        title: "How does the Carbon Registry work?",
        content: "The Carbon Registry on CarbonFi tracks the creation, transfer, and retirement of carbon credits, providing a transparent, immutable ledger to ensure credibility and compliance in carbon trading."
    },
    {
        title: "What is the Tracing - Tracking - Trading system?",
        content: "CarbonFi's Tracing - Tracking - Trading system allows users to trace the origin of carbon credits, track their journey through the carbon market, and trade them in a secure, decentralized environment."
    },
    {
        title: "How does Carbon Trading work on CarbonFi?",
        content: "Carbon trading on CarbonFi involves buying and selling tokenized carbon credits, where companies or individuals can offset their carbon footprint by purchasing verified credits from the marketplace."
    },
    {
        title: "What is the Carbon Initiative Investment Program?",
        content: "The Carbon Initiative Investment Program on CarbonFi enables users to invest in vetted environmental projects that reduce carbon emissions, offering both financial returns and positive environmental impact."
    },
    {
        title: "What are the economic benefits of using CarbonFi?",
        content: "CarbonFi provides economic benefits by creating a transparent market for carbon credits, incentivizing carbon reductions through financial returns, and supporting sustainable practices globally"
    }
];

export const FaqPage = () => {
    return (
        <main>
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/roadmap-bg.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/50 to-white/55"/>
                </div>

                <Container className="relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg text-gray-600">
                            Find answers to common questions about CarbonFi, carbon credits,
                            and our platform's features.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Split FAQ Section */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Left Image Section */}
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

                        {/* Right Accordion Section */}
                        <div className="lg:max-h-[800px] overflow-y-auto pr-4 space-y-4
                                    scrollbar-thin scrollbar-thumb-primary/20
                                    scrollbar-track-gray-100">
                            {FAQ_ITEMS.map((item, index) => (
                                <Accordion
                                    key={index}
                                    title={item.title}
                                    isInitiallyOpen={item.isOpen}
                                >
                                    {item.content}
                                </Accordion>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
};