import { Container } from '@/components/shared/Container';
import { FaLeaf, FaArrowRight } from 'react-icons/fa6';
import { FC } from 'react';
import { Button } from '@/components/shared/Button';

interface Project {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    credits: string;
    status: 'active' | 'upcoming' | 'completed';
}

const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Indonesian Rainforest Conservation',
        description: 'Protection and restoration of rainforest ecosystems in Sumatra, generating high-quality carbon credits through avoided deforestation.',
        category: 'Forest Conservation',
        image: '/images/project-1.png',
        credits: '500,000',
        status: 'active'
    },
    {
        id: 2,
        title: 'Solar Energy Farm Development',
        description: 'Large-scale solar energy installation replacing coal-based power generation, reducing carbon emissions significantly.',
        category: 'Renewable Energy',
        image: '/images/project-2.png',
        credits: '750,000',
        status: 'active'
    },
    {
        id: 3,
        title: 'Mangrove Restoration Project',
        description: 'Coastal ecosystem restoration project focusing on mangrove reforestation and blue carbon sequestration.',
        category: 'Blue Carbon',
        image: '/images/project-3.png',
        credits: '300,000',
        status: 'upcoming'
    }
] as const;

const StatusBadge: FC<{ status: Project['status'] }> = ({ status }) => {
    const statusStyles = {
        active: 'bg-green-100 text-green-700 border-green-200',
        upcoming: 'bg-blue-100 text-blue-700 border-blue-200',
        completed: 'bg-gray-100 text-gray-700 border-gray-200'
    };

    return (
        <div className={`
            absolute top-4 right-4 px-3 py-1.5 rounded-full 
            backdrop-blur-sm text-sm font-medium border
            transform translate-x-full opacity-0 transition-all duration-500
            group-hover:translate-x-0 group-hover:opacity-100
            ${statusStyles[status]}
        `}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
    );
};

const ProjectCard: FC<{ project: Project }> = ({ project }) => (
    <div className="group relative bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden
                    border border-gray-100 hover:border-primary/30 transition-all duration-500
                    hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
        <div className="relative w-full aspect-[1/1] overflow-hidden">
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700
                         group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20" />

            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full
                          bg-white/90 backdrop-blur-sm text-sm text-primary
                          flex items-center gap-2 font-medium border border-primary/20
                          transform -translate-x-full opacity-0
                          transition-all duration-500 group-hover:translate-x-0
                          group-hover:opacity-100">
                <FaLeaf className="text-xs" />
                {project.category}
            </div>

            <StatusBadge status={project.status} />
        </div>

        <div className="p-6 lg:p-8 space-y-6">
            <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2
                           group-hover:text-primary transition-colors duration-300">
                    {project.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                    {project.description}
                </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="space-y-1">
                    <div className="text-sm text-gray-500">Carbon Credits</div>
                    <div className="text-lg font-bold text-gray-900">
                        {parseInt(project.credits).toLocaleString()} tCO₂e
                    </div>
                </div>
                <Button
                    variant="primary"
                    className="!p-0 w-10 h-10 rounded-full !bg-primary/90 hover:!bg-primary text-primary
                             hover:text-white group/btn"
                >
                    <FaArrowRight className="transform transition-transform duration-300
                                         group-hover/btn:translate-x-1" />
                </Button>
            </div>
        </div>
    </div>
);

export const Projects = () => {
    return (
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
            {/* Background with Image and Overlay */}
            <div className="fixed inset-0">
                <img
                    src="/images/roadmap-bg.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                />
                {/*<div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/90 to-white/95" />*/}
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] bg-repeat opacity-5" />

            {/* Animated Blobs */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full
                          blur-3xl animate-blob" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full
                          blur-3xl animate-blob animation-delay-2000" />

            <Container className="relative z-10">
                <div className="text-center space-y-6 mb-10 pb-6 border-b border-gray-200">
                    <div className="flex items-center justify-center gap-2">
                        <img
                            src="/images/sub-title-shape.png"
                            alt=""
                            className="w-6 animate-pulse"
                            draggable={false}
                        />
                        <span className="text-primary font-medium tracking-wider">
                            OUR PROJECTS
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                        Tokenized Carbon Credits
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Explore our curated portfolio of high-impact carbon credit projects,
                        each tokenized and verified for maximum transparency and trust
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        variant="primary"
                        className="!bg-primary/90 hover:!bg-primary group"
                    >
                        <span className="inline-flex items-center gap-2">
                            View All Projects
                            <FaArrowRight className="transform transition-transform
                                                 duration-300 group-hover:translate-x-2" />
                        </span>
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