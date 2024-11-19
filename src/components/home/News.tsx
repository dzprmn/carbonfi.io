import { Container } from '@/components/shared/Container';
import { FaArrowRight, FaCalendarDays } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Button } from '@/components/shared/Button';
import { FC } from 'react';

interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
    slug: string;
}

const NEWS_ITEMS: NewsItem[] = [
    {
        id: 1,
        title: "CarbonFi Launches Revolutionary Carbon Credit Trading Platform",
        excerpt: "A groundbreaking platform that brings transparency and efficiency to carbon credit trading through blockchain technology.",
        category: "Platform Update",
        date: "March 15, 2024",
        image: "/images/news-1.jpg",
        slug: "carbonfi-platform-launch"
    },
    {
        id: 2,
        title: "Strategic Partnership Announced with Global Environmental Fund",
        excerpt: "CarbonFi partners with leading environmental fund to accelerate carbon credit market adoption.",
        category: "Partnership",
        date: "March 12, 2024",
        image: "/images/news-2.jpg",
        slug: "environmental-fund-partnership"
    },
    {
        id: 3,
        title: "New Carbon Credit Verification Standards Implemented",
        excerpt: "Enhanced verification process ensures highest quality carbon credits on the platform.",
        category: "Standards",
        date: "March 10, 2024",
        image: "/images/news-3.jpg",
        slug: "verification-standards-update"
    }
] as const;

const NewsCard: FC<{ item: NewsItem }> = ({ item }) => (
    <Link
        to={`/news/${item.slug}`}
        className="group block bg-white/90 rounded-3xl overflow-hidden border border-gray-100
                 hover:border-primary/30 transition-all duration-300 hover:shadow-xl
                 hover:shadow-primary/10 hover:-translate-y-1 backdrop-blur-sm"
    >
        <div className="relative w-full aspect-[1/1] overflow-hidden">
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500
                         group-hover:scale-110"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Category badge */}
            <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-white/90
                          backdrop-blur-sm text-sm text-primary font-medium
                          border border-primary/20
                          transform -translate-x-full opacity-0 transition-all duration-300
                          group-hover:translate-x-0 group-hover:opacity-100">
                {item.category}
            </div>
        </div>

        <div className="p-6 lg:p-8 space-y-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FaCalendarDays className="text-primary" />
                {item.date}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 line-clamp-2
                         group-hover:text-primary transition-colors">
                {item.title}
            </h3>

            <p className="text-gray-600 text-sm line-clamp-2">
                {item.excerpt}
            </p>

            <div className="flex items-center gap-2 text-primary font-medium pt-2
                          opacity-0 transform translate-y-2 transition-all duration-300
                          group-hover:opacity-100 group-hover:translate-y-0">
                Read More
                <FaArrowRight className="transform transition-transform duration-300
                                     group-hover:translate-x-2" />
            </div>
        </div>
    </Link>
);

const ViewAllButton: FC<{ className?: string }> = ({ className = '' }) => (
    <Link
        to="/news"
        className={`inline-flex items-center gap-2 text-gray-900 hover:text-primary 
                   transition-colors group ${className}`}
    >
        View All News
        <FaArrowRight className="transition-transform duration-300
                              group-hover:translate-x-2" />
    </Link>
);

export const News = () => {
    return (
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
            {/* Background with Image and Overlay */}
            <div className="fixed inset-0">
                <img
                    src="/images/roadmap-bg.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                />
                {/*<div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />*/}
            </div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] bg-repeat opacity-5" />

            {/* Animated Blobs */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full
                          blur-3xl animate-blob" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full
                          blur-3xl animate-blob animation-delay-2000" />

            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-gray-200">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/sub-title-shape.png"
                                alt=""
                                className="w-6 animate-pulse"
                                draggable={false}
                            />
                            <span className="text-primary font-medium tracking-wider">
                                LATEST UPDATES
                            </span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                            News & Articles
                        </h2>
                    </div>

                    <div className="hidden md:block">
                        <ViewAllButton />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {NEWS_ITEMS.map((item) => (
                        <NewsCard key={item.id} item={item} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button
                        variant="primary"
                        className="group bg-white hover:bg-primary text-primary
                                 hover:text-white border-2 border-primary/20
                                 hover:border-primary shadow-lg shadow-primary/5
                                 hover:shadow-primary/10"
                    >
                        <Link to="/news" className="inline-flex items-center gap-2">
                            View All News
                            <FaArrowRight className="transform transition-transform duration-300
                                                 group-hover:translate-x-2" />
                        </Link>
                    </Button>
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
};