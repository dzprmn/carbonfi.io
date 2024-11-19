import { Container } from '@/components/shared/Container';
import { Link } from "react-router-dom";
import {
    FaArrowRightLong,
    FaChevronRight,
    FaDiscord,
    FaPaperPlane,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Button } from '@/components/shared/Button';
import { FC, FormEvent } from 'react';

interface FooterLink {
    label: string;
    path: string;
}

interface SocialLink {
    icon: JSX.Element;
    url: string;
    label: string;
}

const COMPANY_LINKS: FooterLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Meet Our Team', path: '/team' },
    { label: 'Latest News', path: '/news' },
] as const;

const QUICK_LINKS: FooterLink[] = [
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Careers', path: '/careers' },
] as const;

const SOCIAL_LINKS: SocialLink[] = [
    { icon: <FaPaperPlane />, url: 'https://t.me/CarbonFiHQ', label: 'Telegram' },
    { icon: <FaXTwitter />, url: 'https://x.com/CarbonFiHQ', label: 'X (Twitter)' },
    { icon: <FaDiscord />, url: 'https://discord.gg/BwxVYJ7H', label: 'Discord' },
    { icon: <FaYoutube />, url: 'https://youtube.com/@CarbonFiHQ', label: 'YouTube' },
] as const;

const FooterLinkList: FC<{ title: string; links: FooterLink[] }> = ({ title, links }) => (
    <div className="lg:col-span-2">
        <h4 className="text-xl font-semibold text-white mb-6">{title}</h4>
        <ul className="space-y-3">
            {links.map((link, index) => (
                <li key={index}>
                    <Link
                        to={link.path}
                        className="group flex items-center gap-2 text-gray-400 hover:text-primary
                                 transition-colors duration-300"
                    >
                        <FaChevronRight className="text-xs transition-transform duration-300
                                                group-hover:translate-x-1" />
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const SocialButton: FC<SocialLink> = ({ icon, url, label }) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center
                 text-white transition-all duration-300 hover:bg-white hover:text-primary
                 hover:border-white hover:scale-110 text-lg"
    >
        {icon}
    </a>
);

const NewsletterForm: FC = () => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add newsletter subscription logic here
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full px-6 py-3 rounded-full bg-white/5 border border-primary/30
                         text-white placeholder:text-gray-400 focus:outline-none focus:border-primary
                         transition-all duration-300 hover:border-primary/50"
            />
            <Button
                type="submit"
                variant="primary"
                className="w-full group"
            >
                Subscribe
                <FaArrowRightLong className="transition-transform duration-300
                                          group-hover:translate-x-1" />
            </Button>
        </form>
    );
};

const CommunitySection: FC = () => (
    <div className="relative mb-24">
        <div
            className="relative rounded-2xl overflow-hidden bg-blend-overlay"
            style={{
                background: `linear-gradient(to right, rgba(84, 130, 65, 0.95), rgba(0, 0, 0, 0.80)), 
                           url('/images/footer-social.jpg') center/cover no-repeat`
            }}
        >
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url('/images/pattern.png')`,
                    backgroundSize: '200px',
                    backgroundRepeat: 'repeat'
                }}
            />

            <div className="relative px-8 py-12 lg:px-12 lg:py-16 flex flex-col lg:flex-row
                          lg:items-center lg:justify-between gap-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Join Our Community
                </h2>

                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <span className="font-semibold text-white text-lg uppercase">
                        Join Us:
                    </span>
                    <ul className="flex gap-4">
                        {SOCIAL_LINKS.map((social, index) => (
                            <li key={index}>
                                <SocialButton {...social} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <img
                src="/images/footer-shape2.png"
                alt=""
                className="hidden md:block absolute top-1/4 left-1/3 animate-pulse"
                draggable={false}
            />
        </div>
    </div>
);

export const Footer = () => (
    <footer className="bg-[url('/images/footer-bg.jpg')] bg-no-repeat bg-center bg-cover
                    relative z-10 pt-28 overflow-hidden">
        <img
            src="/images/footer-line.png"
            alt=""
            className="absolute -z-10 right-0 -bottom-20 opacity-70"
            draggable={false}
        />
        <img
            src="/images/footer-shape.png"
            alt=""
            className="absolute -z-10 top-0 left-0 animate-pulse"
            draggable={false}
        />

        <Container>
            <CommunitySection />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                <div className="lg:col-span-5 space-y-8">
                    <Link to="/">
                        <img
                            src="/images/logo-white.png"
                            alt="CarbonFi"
                            className="h-12 md:h-16 transition-transform duration-300 hover:scale-105"
                            draggable={false}
                        />
                    </Link>
                    <p className="text-gray-300 max-w-md text-lg leading-relaxed">
                        CarbonFi is an advanced blockchain-based platform ecosystem
                        designed to transform the carbon credit market and support impactful climate action
                    </p>
                    <div className="space-y-4">
                        {[
                            { icon: <FaPaperPlane />, text: 'CarbonFi HQ', href: 'https://t.me/CarbonFiHQ' },
                            { icon: <MdEmail />, text: 'hq@carbonfi.io', href: 'mailto:hq@carbonfi.io' }
                        ].map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-400 hover:text-primary
                                       transition-colors duration-300 text-lg group"
                            >
                                <span className="text-primary text-xl transition-transform duration-300
                                             group-hover:scale-110">
                                    {item.icon}
                                </span>
                                {item.text}
                            </a>
                        ))}
                    </div>
                </div>

                <FooterLinkList title="Company" links={COMPANY_LINKS} />
                <FooterLinkList title="Quick Links" links={QUICK_LINKS} />

                <div className="lg:col-span-3">
                    <h4 className="text-xl font-semibold text-white mb-6">Newsletter</h4>
                    <p className="text-gray-400 mb-4">
                        Subscribe to Our Newsletter
                    </p>
                    <NewsletterForm />
                </div>
            </div>

            <div className="text-center py-8 mt-16 border-t border-white/10">
                <p className="text-gray-400">
                    © {new Date().getFullYear()}{' '}
                    <Link to="/" className="text-gray-400 hover:text-primary transition-colors">
                        CarbonFi
                    </Link>
                    . All rights reserved.
                </p>
            </div>
        </Container>
    </footer>
);