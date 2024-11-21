import { Container } from '@/components/shared/Container';
import { Button } from '@/components/shared/Button';
import { FaCalendarDays, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { IoSearchOutline } from 'react-icons/io5';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    date: string;
    image: string;
    slug: string;
    tags: string[];
}

const ITEMS_PER_PAGE = 9;

// Example expanded news data
const NEWS_ITEMS: NewsItem[] = [
    {
        id: 1,
        title: "CarbonFi Launches Revolutionary Carbon Credit Trading Platform",
        excerpt: "A groundbreaking platform that brings transparency and efficiency to carbon credit trading through blockchain technology.",
        content: "Full article content here...",
        category: "Platform Update",
        date: "March 15, 2024",
        image: "/images/news-1.jpg",
        slug: "carbonfi-platform-launch",
        tags: ["Platform", "Launch", "Trading"]
    },
    {
        id: 2,
        title: "Strategic Partnership Announced with Global Environmental Fund",
        excerpt: "CarbonFi partners with leading environmental fund to accelerate carbon credit market adoption.",
        content: "Full article content here...",
        category: "Partnership",
        date: "March 12, 2024",
        image: "/images/news-2.jpg",
        slug: "environmental-fund-partnership",
        tags: ["Partnership", "Environment", "Funding"]
    },
    {
        id: 3,
        title: "Strategic Partnership Announced with Global Environmental Fund",
        excerpt: "CarbonFi partners with leading environmental fund to accelerate carbon credit market adoption.",
        content: "Full article content here...",
        category: "Partnership",
        date: "March 12, 2024",
        image: "/images/news-2.jpg",
        slug: "environmental-fund-partnership",
        tags: ["Partnership", "Environment", "Funding"]
    },
    {
        id: 4,
        title: "Strategic Partnership Announced with Global Environmental Fund",
        excerpt: "CarbonFi partners with leading environmental fund to accelerate carbon credit market adoption.",
        content: "Full article content here...",
        category: "Partnership",
        date: "March 12, 2024",
        image: "/images/news-2.jpg",
        slug: "environmental-fund-partnership",
        tags: ["Partnership", "Environment", "Funding"]
    },
    {
        id: 5,
        title: "Strategic Partnership Announced with Global Environmental Fund",
        excerpt: "CarbonFi partners with leading environmental fund to accelerate carbon credit market adoption.",
        content: "Full article content here...",
        category: "Partnership",
        date: "March 12, 2024",
        image: "/images/news-2.jpg",
        slug: "environmental-fund-partnership",
        tags: ["Partnership", "Environment", "Funding"]
    },
    {
        id: 6,
        title: "Strategic Partnership Announced with Global Environmental Fund",
        excerpt: "CarbonFi partners with leading environmental fund to accelerate carbon credit market adoption.",
        content: "Full article content here...",
        category: "Partnership",
        date: "March 12, 2024",
        image: "/images/news-2.jpg",
        slug: "environmental-fund-partnership",
        tags: ["Partnership", "Environment", "Funding"]
    },
    {
        id: 7,
        title: "Strategic Partnership Announced with Global Environmental Fund",
        excerpt: "CarbonFi partners with leading environmental fund to accelerate carbon credit market adoption.",
        content: "Full article content here...",
        category: "Partnership",
        date: "March 12, 2024",
        image: "/images/news-2.jpg",
        slug: "environmental-fund-partnership",
        tags: ["Partnership", "Environment", "Funding"]
    },
    {
        id: 8,
        title: "Strategic Partnership Announced with Global Environmental Fund",
        excerpt: "CarbonFi partners with leading environmental fund to accelerate carbon credit market adoption.",
        content: "Full article content here...",
        category: "Partnership",
        date: "March 12, 2024",
        image: "/images/news-2.jpg",
        slug: "environmental-fund-partnership",
        tags: ["Partnership", "Environment", "Funding"]
    },
    {
        id: 9,
        title: "Strategic Partnership Announced with Global Environmental Fund",
        excerpt: "CarbonFi partners with leading environmental fund to accelerate carbon credit market adoption.",
        content: "Full article content here...",
        category: "Partnership",
        date: "March 12, 2024",
        image: "/images/news-2.jpg",
        slug: "environmental-fund-partnership",
        tags: ["Partnership", "Environment", "Funding"]
    },
    {
        id: 10,
        title: "Strategic Partnership Announced with Global Environmental Fund",
        excerpt: "CarbonFi partners with leading environmental fund to accelerate carbon credit market adoption.",
        content: "Full article content here...",
        category: "Partnership",
        date: "March 12, 2024",
        image: "/images/news-2.jpg",
        slug: "environmental-fund-partnership",
        tags: ["Partnership", "Environment", "Funding"]
    },
    // Add more news items...
] as const;

const CATEGORIES = ["All", "Platform Update", "Partnership", "Technology", "Community"] as const;

const Pagination: React.FC<{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2">
            <Button
                variant="secondary"
                className="!p-2"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FaChevronLeft className="w-5 h-5" />
            </Button>

            {pages.map((page) => (
                <Button
                    key={page}
                    variant={currentPage === page ? "primary" : "secondary"}
                    className={`w-10 h-10 ${currentPage === page ? '' : 'hover:text-primary'}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
            ))}

            <Button
                variant="secondary"
                className="!p-2"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FaChevronRight className="w-5 h-5" />
            </Button>
        </div>
    );
};

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => (
    <Link
        to={`/news/${item.slug}`}
        className="group block bg-white/90 rounded-3xl overflow-hidden border border-gray-100
                 hover:border-primary/30 transition-all duration-300 hover:shadow-xl
                 hover:shadow-primary/10 hover:-translate-y-1 backdrop-blur-sm"
    >
        <div className="relative w-full aspect-[16/9] overflow-hidden">
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500
                         group-hover:scale-110"
            />
            <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-white/90
                          backdrop-blur-sm text-sm text-primary font-medium
                          border border-primary/20">
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

            <p className="text-gray-600 text-sm line-clamp-3">
                {item.excerpt}
            </p>

            <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-3 py-1 rounded-full bg-primary/5
                                               text-primary">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </Link>
);

export const NewsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredNews, setFilteredNews] = useState(NEWS_ITEMS);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    // Filter news based on search term and category
    useEffect(() => {
        const filtered = NEWS_ITEMS.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        setFilteredNews(filtered);
    }, [searchTerm, selectedCategory]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedNews = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <main>
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/about-shape-1.png"
                        alt=""
                        className="absolute top-32 right-20 animate-pulse hidden 2xl:block"
                        draggable={false}
                    />
                    <img
                        src="/images/roadmap-bg.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/50 to-white/55"/>
                </div>

                <Container className="relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Latest News & Updates
                        </h1>
                        <p className="text-lg text-gray-600 mb-12">
                            Stay informed about CarbonFi's latest developments, partnerships,
                            and innovations in the carbon credit market.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search news..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-4 pl-12 rounded-full border border-gray-200
                 focus:outline-none focus:border-primary transition-all
                 shadow-sm"
                            />
                            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2
                               text-gray-400"/>
                        </div>
                    </div>
                </Container>
            </section>

            {/* News Listing Section */}
            <section className="py-16 bg-gray-50">
                <Container>
                    {/* Categories Filter */}
                    <div className="flex flex-wrap gap-3 mb-12 justify-center">
                        {CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "primary" : "secondary"}
                                onClick={() => setSelectedCategory(category)}
                                className="rounded-full"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    {/* Results info */}
                    {/*<div className="text-gray-600 mb-8 text-center">*/}
                    {/*    Showing {paginatedNews.length} of {filteredNews.length} articles*/}
                    {/*</div>*/}

                    {/* News Grid */}
                    {paginatedNews.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {paginatedNews.map((item) => (
                                    <NewsCard key={item.id} item={item}/>
                                ))}
                            </div>

                            {/* Show pagination if there are multiple pages */}
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <h3 className="text-xl text-gray-600">
                                No news articles found matching your criteria.
                            </h3>
                        </div>
                    )}
                </Container>
            </section>
        </main>
    );
};