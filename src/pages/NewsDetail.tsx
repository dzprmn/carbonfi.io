// src/pages/NewsDetail.tsx
import { Container } from '@/components/shared/Container';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarDays, FaArrowLeft } from 'react-icons/fa6';
import { NEWS_ITEMS } from '@/config/constants'; // We'll move the news data here

export const NewsDetail = () => {
    const { slug } = useParams();
    const article = NEWS_ITEMS.find(item => item.slug === slug);

    if (!article) {
        return (
            <Container className="py-24">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
                    <Link to="/news" className="text-primary hover:underline">
                        Return to News
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <main>
            <div className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img src={article.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />
                </div>

                <Container className="relative z-10">
                    <Link
                        to="/news"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary
                     transition-colors mb-8 group"
                    >
                        <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
                        Back to News
                    </Link>

                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                            <FaCalendarDays className="text-primary" />
                            {article.date}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {article.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-sm px-4 py-1 rounded-full bg-primary/5 text-primary"
                                >
                  {tag}
                </span>
                            ))}
                        </div>

                        <div className="prose prose-lg max-w-none">
                            {article.content}
                        </div>
                    </div>
                </Container>
            </div>
        </main>
    );
};