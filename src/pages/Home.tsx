// src/pages/Home.tsx
import { Banner } from '@/components/home/Banner';
import { About } from '@/components/home/About';
import { Services } from '@/components/home/Services';
import { Roadmap } from '@/components/home/Roadmap';
import { Whitepaper } from '@/components/home/Whitepaper';
import { Tokenomics } from '@/components/home/Tokenomics';
import { Projects } from '@/components/home/Projects';
import { TeamMember } from '@/components/home/Team';
import { News } from '@/components/home/News';

export const Home = () => {
    return (
        <main>
            <Banner />
            <About />
            <Services />
            <Roadmap />
            <Whitepaper />
            <Tokenomics />
            <Projects />
            <TeamMember />
            <News />
        </main>
    );
};