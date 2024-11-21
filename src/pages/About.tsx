import { Container } from '@/components/shared/Container';
import { FaLeaf, FaUsers, FaChartLine } from 'react-icons/fa6';
// import {TeamMember} from "@/components/home/Team.tsx";

const MISSION_POINTS = [
    {
        icon: <FaLeaf className="w-16 h-16" />,
        title: "Environmental Impact",
        description: "Leading the charge in carbon credit trading to create meaningful environmental change through blockchain technology."
    },
    {
        icon: <FaUsers className="w-16 h-16" />,
        title: "Community Driven",
        description: "Building a global community of environmentally conscious individuals and organizations committed to sustainability."
    },
    {
        icon: <FaChartLine className="w-16 h-16" />,
        title: "Market Innovation",
        description: "Revolutionizing the carbon credit market with transparent, efficient, and accessible trading solutions."
    }
];

const TEAM_MEMBERS = [
    {
        name: "Aditya Perdana",
        role: "Co Founder",
        image: "/images/aditya-p.png",
        bio: "Expert in carbon markets and sustainable development."
    },
    {
        name: "Aditya Rahadhyan",
        role: "Co Founder",
        image: "/images/aditya-r.png",
        bio: "Experienced blockchain developer and environmental enthusiast."
    },
    {
        name: "Diaz",
        role: "Biz Dev",
        image: "/images/diaz.png",
        bio: "Business development specialist with focus on environmental projects."
    }
];

export const AboutPage = () => {
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
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            About CarbonFi
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            CarbonFi is revolutionizing the carbon credit market through blockchain technology,
                            making environmental impact accessible, transparent, and efficient.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Empowering global sustainability through innovative blockchain solutions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {MISSION_POINTS.map((point, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50
                                         transform hover:-translate-y-1 transition-all duration-300
                                         text-center" // Added text-center here
                            >
                                <div className="w-24 h-24 bg-primary/10 rounded-xl
                                            flex items-center justify-center
                                            text-primary mb-6
                                            mx-auto" // Added mx-auto for centering
                                >
                                    {point.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {point.title}
                                </h3>
                                <p className="text-gray-600">
                                    {point.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Team Section */}
            <section className="py-16">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Dedicated professionals working towards a sustainable future
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {TEAM_MEMBERS.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50
                                         transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="aspect-square overflow-hidden text-center">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1 text-center">
                                        {member.name}
                                    </h3>
                                    <p className="text-primary font-medium mb-4 text-center">
                                        {member.role}
                                    </p>
                                    <p className="text-gray-600 text-center">
                                    {member.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Vision Section */}
            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Our Vision
                            </h2>
                            <p className="text-lg text-gray-600">
                                To create a world where environmental sustainability is accessible,
                                measurable, and rewarding for everyone.
                            </p>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-justify">
                                At CarbonFi, we envision a future where carbon credit trading is not just
                                a market mechanism but a powerful tool for environmental change. Our platform
                                bridges the gap between traditional carbon markets and blockchain technology,
                                creating new opportunities for individuals and organizations to participate
                                in climate action.
                            </p>
                            <p className="text-justify">
                                Through our innovative approach, we're making it easier than ever to track,
                                trade, and verify carbon credits, ensuring that environmental initiatives
                                receive the support they deserve while maintaining the highest standards
                                of transparency and efficiency.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
};