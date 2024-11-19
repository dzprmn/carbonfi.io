import { Container } from '@/components/shared/Container';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
    FaTelegram,
    FaXTwitter,
} from "react-icons/fa6";

interface SocialIcon {
    icon: JSX.Element;
    url: string;
}

interface TeamMember {
    id: number;
    teamThumb: string;
    teamTitle: string;
    teamDesc: string;
    socialIcon: SocialIcon;
    socialIcon2: SocialIcon;
}

const TEAM_DATA: TeamMember[] = [
    {
        id: 1,
        teamThumb: '/images/aditya-p.png',
        teamTitle: "Aditya Perdana",
        socialIcon: { icon: <FaTelegram />, url: "https://t.me/CarbonfiHQ" },
        socialIcon2: { icon: <FaXTwitter />, url: "https://x.com/CarbonfiHQ" },
        teamDesc: "Co Founder",
    },
    {
        id: 2,
        teamThumb: '/images/aditya-r.png',
        teamTitle: "Aditya Rahadhyan",
        socialIcon: { icon: <FaTelegram />, url: "https://t.me/dyorka121" },
        socialIcon2: { icon: <FaXTwitter />, url: "https://x.com/CarbonfiHQ" },
        teamDesc: "Co Founder",
    },
    {
        id: 3,
        teamThumb: '/images/diaz.png',
        teamTitle: "Diaz",
        socialIcon: { icon: <FaTelegram />, url: "https://t.me/Oxliverpool" },
        socialIcon2: { icon: <FaXTwitter />, url: "https://x.com/CarbonfiHQ" },
        teamDesc: "Biz Dev",
    },
] as const;

const TeamCard: FC<Omit<TeamMember, 'id'>> = ({
                                                  teamThumb,
                                                  teamTitle,
                                                  teamDesc,
                                                  socialIcon,
                                                  socialIcon2,
                                              }) => (
    <div className="group bg-white/90 rounded-2xl overflow-hidden backdrop-blur-sm
                    border border-gray-100 hover:border-primary/30 transition-all
                    duration-500 hover:shadow-xl hover:shadow-primary/10
                    hover:-translate-y-1">
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent
                          via-white/5 to-white/20" />
            <img
                src={teamThumb}
                alt={teamTitle}
                className="w-full aspect-square object-cover object-top
                         transition-transform duration-700 group-hover:scale-105"
            />
        </div>

        <div className="p-6 text-center relative">
            {/* Animated underline */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r
                          from-primary/0 via-primary/50 to-primary/0
                          transform scale-x-0 group-hover:scale-x-100
                          transition-transform duration-500" />

            <h3 className="text-xl font-semibold text-gray-900 mb-2
                        group-hover:text-primary transition-colors">
                {teamTitle}
            </h3>
            <p className="text-primary font-medium mb-6">
                {teamDesc}
            </p>

            <div className="flex gap-4 justify-center">
                {[socialIcon, socialIcon2].map((social, index) => (
                    <Link
                        key={index}
                        to={social.url}
                        className="w-10 h-10 rounded-full border border-gray-200
                                 flex items-center justify-center text-gray-600
                                 hover:text-white hover:bg-primary hover:border-primary
                                 transition-all duration-300 group/icon"
                    >
                        <span className="transform transition-transform duration-300
                                     group-hover/icon:scale-110">
                            {social.icon}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

export const TeamMember: FC = () => {
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
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5
                          rounded-full blur-3xl animate-blob" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5
                          rounded-full blur-3xl animate-blob animation-delay-2000" />

            <Container className="relative z-10">
                <div className="text-center mb-10 pb-6 border-b border-gray-200 space-y-4">
                    <div className="flex items-center justify-center gap-2">
                        <img
                            src="/images/sub-title-shape.png"
                            alt=""
                            className="w-6 animate-pulse"
                            draggable={false}
                        />
                        <span className="text-primary font-medium tracking-wider">
                            CARBONFI TEAM
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                        Meet Our Super Team
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Meet the dedicated individuals behind CarbonFi who are working
                        to revolutionize carbon credit trading
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TEAM_DATA.map((member) => (
                        <TeamCard key={member.id} {...member} />
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
};