import {useState, useEffect, FC} from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaPaperPlane,
    FaXTwitter,
    FaDiscord,
    FaYoutube,
} from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { FaBars } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { Container } from '../shared/Container';
import { Button } from '../shared/Button';
import { ConnectButton } from '../shared/ConnectButton';

interface HeaderProps {
    isTransparent?: boolean;
}

interface SocialLinksProps {
    className?: string;
    isDark?: boolean;
    isTransparent?: boolean;
    isSticky?: boolean;
}

const SOCIAL_LINKS = [
    { icon: <FaXTwitter />, url: 'https://x.com/CarbonFiHQ' },
    { icon: <FaDiscord />, url: 'https://discord.gg/BwxVYJ7H' },
    { icon: <FaYoutube />, url: 'https://www.youtube.com/@CarbonFiHQ' },
] as const;

const NAV_LINKS = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/news', label: 'News' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
] as const;

const SocialLinks : FC<SocialLinksProps> = ({
    className = '',
    isDark = false,
    isTransparent = false,
    isSticky = false
}) => (
    <ul className={`flex items-center gap-3 ${className}`}>
        {SOCIAL_LINKS.map((social, index) => (
            <li key={index}>
                <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-all duration-300 hover:text-primary
                    ${isDark ? 'text-gray-600' :
                        isSticky ? 'text-gray-600' :
                            isTransparent ? 'text-white' : 'text-gray-600'}`}
                >
                    {social.icon}
                </a>
            </li>
        ))}
    </ul>
);

export const Header: FC<HeaderProps> = ({ isTransparent = false }) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY >= 100);
            if (isOpen) setIsOpen(false);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const nav = document.getElementById('mobile-menu');
            if (isOpen && nav && !nav.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }, [isOpen]);

    const TopBar = () => (
        <header className={`
        overflow-hidden transition-all duration-300 border-b
        hidden md:block
        ${isTransparent ? 'border-white/10 bg-transparent' : 'border-gray-200 bg-white'}
        ${isSticky ? 'h-0 opacity-0 bg-white/80' : 'h-[50px] opacity-100 bg-transparent'}
    `}>
            <Container>
                <div className="flex items-center justify-between h-[50px]">
                    <div className="flex items-center gap-4 lg:gap-6">
                        <a href="mailto:hq@carbonfi.io"
                           className={`text-sm lg:text-[15px] flex items-center gap-2
                                transition-colors
                                ${isTransparent ? 'text-white bg-transparent' : 'text-gray-600 bg-white'}
                                ${isSticky ? 'text-gray-600 hover:text-primary' : 'text-gray-600 hover:text-primary'}`}>
                            <HiOutlineMailOpen size={16} className="text-primary" />
                            <span className="hidden sm:inline">hq@carbonfi.io</span>
                        </a>
                        <a href="https://t.me/CarbonFiHQ"
                           className={`text-sm lg:text-[15px] flex items-center gap-2
                                transition-colors
                                ${isTransparent ? 'text-white bg-transparent' : 'text-gray-600 bg-white'}
                                ${isSticky ? 'text-gray-600 hover:text-primary' : 'text-gray-600 hover:text-primary'}`}>
                            <FaPaperPlane className="text-primary" />
                            <span className="hidden sm:inline">CarbonfiHQ</span>
                        </a>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-6">
                        <a href="/carbonfi-whitepaper.pdf"
                           className={`text-sm lg:text-[15px] transition-colors hidden md:block
                                ${isTransparent ? 'text-white bg-transparent' : 'text-gray-600 bg-white'}
                                ${isSticky ? 'text-gray-600 hover:text-primary' : 'text-gray-600 hover:text-primary'}`}>
                            Whitepaper
                        </a>
                        <SocialLinks
                            isSticky={isSticky}
                            isTransparent={isTransparent}
                        />
                    </div>
                </div>
            </Container>
        </header>
    );

    return (
        <nav className={`
            w-full transition-all duration-300 fixed top-0 left-0 z-[99999]
            ${isSticky
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : isTransparent
                ? 'bg-transparent'
                : 'bg-white shadow-lg'}
        `}>
            <TopBar />

            {/* Main Navigation */}
            <header className={`
                transition-all duration-300 border-b
                ${isSticky
                ? 'border-gray-100 bg-white/80'
                : isTransparent
                    ? 'border-white/10 bg-transparent'
                    : 'border-gray-100 bg-white'}
            `}>
                <Container>
                    <div className="h-[100px] flex items-center justify-between">
                        {/* Desktop Logo */}
                        <div className="hidden lg:block w-[240px]">
                            <NavLink to="/">
                                <img
                                    src={isSticky || !isTransparent ? "/images/logo-primary.png" : "/images/logo-white.png"}
                                    alt="CarbonFi"
                                    className="h-[40px] w-auto"
                                    draggable={false}
                                />
                            </NavLink>
                        </div>

                        {/* Mobile Logo and Controls */}
                        <div className="flex lg:hidden w-full items-center justify-between">
                            <NavLink to="/" className="w-[60px]">
                                <img
                                    src="/images/logo-square.png"
                                    alt="CarbonFi"
                                    className="h-[50px] w-[50px]"
                                    draggable={false}
                                />
                            </NavLink>

                            <div className="flex items-center gap-3">
                                <ConnectButton />
                                <Button
                                    variant={isTransparent && !isSticky ? "outline" : "primary"}
                                    size="sm"
                                    className="!p-0 w-10 h-10"
                                    onClick={() => setIsOpen(!isOpen)}
                                    aria-label="Toggle menu"
                                >
                                    {isOpen
                                        ? <IoMdClose className="w-6 h-6"/>
                                        : <FaBars className="w-5 h-5"/>
                                    }
                                </Button>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex gap-6 items-center">
                            <ul className="flex items-center space-x-1">
                                {NAV_LINKS.map((link) => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        className={({isActive}) => `
                                            px-4 py-2 rounded-full transition-all duration-300
                                            ${isSticky || !isTransparent
                                            ? `text-gray-700 hover:text-primary ${isActive ? 'text-primary bg-primary/10' : ''}`
                                            : `text-white hover:text-primary ${isActive ? 'text-primary bg-white/10' : ''}`
                                        }
                                        `}
                                    >
                                        {link.label}
                                    </NavLink>
                                ))}
                            </ul>
                            <ConnectButton />
                        </div>
                    </div>
                </Container>

                {/* Mobile Menu */}
                <div className={`
    fixed inset-0 backdrop-blur-sm transition-opacity duration-300 lg:hidden
    ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
    bg-white/60
`} onClick={() => setIsOpen(false)}/>

                <div id="mobile-menu" className={`
    fixed top-[70px] left-0 w-full 
    backdrop-blur-md transition-all duration-300 
    lg:hidden overflow-hidden bg-white/95 shadow-lg
    ${isOpen ? 'max-h-[calc(100vh-70px)]' : 'max-h-0'}
`}>
                    <Container className="py-6">
                        <ul className="space-y-4">
                            {NAV_LINKS.map((link) => (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
                                        className={({isActive}) => `
                            block w-full px-4 py-3 rounded-lg 
                            transition-all duration-300
                            ${isActive
                                            ? 'text-primary bg-primary/10'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }
                        `}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 px-4">
                            <ConnectButton />
                        </div>

                        <div className="mt-6 px-4 py-6 border-t border-gray-500">
                            <SocialLinks
                                className="justify-center"
                                isDark={true} // Add this prop for dark icons
                            />
                        </div>
                    </Container>
                </div>
            </header>
        </nav>
    );
};