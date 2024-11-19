import { Container } from '@/components/shared/Container';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FC } from 'react';

interface TokenAllocation {
    category: string;
    percentage: number;
    description: string;
    color: string;
}

const TOKEN_ALLOCATIONS: TokenAllocation[] = [
    {
        category: 'Public Sale',
        percentage: 30,
        description: 'Allocated for token sale events and public distribution',
        color: '#00A3FF'
    },
    {
        category: 'Ecosystem & Development',
        percentage: 20,
        description: 'Platform development and ecosystem growth',
        color: '#548241'
    },
    {
        category: 'Founder, Team & Advisors',
        percentage: 15,
        description: 'Core team members and project advisors with vesting schedule',
        color: '#FF6B6B'
    },
    {
        category: 'Strategic Partnership',
        percentage: 5,
        description: 'Partnerships and strategic collaborations',
        color: '#FFD93D'
    },
    {
        category: 'Staking Rewards',
        percentage: 20,
        description: 'Staking rewards and community incentives',
        color: '#6C5DD3'
    },
    {
        category: 'Reserve Funds',
        percentage: 10,
        description: 'Saving for emergency purpose',
        color: '#4ECDC4'
    }
] as const;

const TOKEN_DETAILS = [
    { label: 'Token Name', value: 'CarbonFi' },
    { label: 'Token Symbol', value: 'CAFI' },
    { label: 'Total Supply', value: '99,999,999' },
    { label: 'Initial Price', value: '$0.33' },
    { label: 'Blockchain', value: 'Multi-chain' },
    { label: 'Token Type', value: 'RWA Token' }
] as const;

const VESTING_SCHEDULE = [
    { phase: 'TGE', release: '15%', date: 'Day 1' },
    { phase: 'Cliff Period', release: '0%', date: '6 months' },
    { phase: 'Linear Vesting', release: '85%', date: '18 months' }
] as const;

interface TooltipProps {
    active?: boolean;
    payload?: Array<{ payload: TokenAllocation }>;
}

const CustomTooltip: FC<TooltipProps> = ({ active, payload }) => {
    if (active && payload?.[0]) {
        const data = payload[0].payload;
        return (
            <div className="bg-black/90 backdrop-blur-sm p-4 rounded-lg border border-primary/20 shadow-xl">
                <div className="font-semibold text-white mb-1">{data.category}</div>
                <div className="text-primary text-lg font-bold">{data.percentage}%</div>
                <div className="text-gray-400 text-sm mt-2 max-w-xs">
                    {data.description}
                </div>
            </div>
        );
    }
    return null;
};

const TokenDetailsCard: FC = () => (
    <div className="rounded-2xl p-8 bg-white/80 backdrop-blur-sm border border-gray-100
                    shadow-lg shadow-primary/5 hover:shadow-primary/10
                    transition-all duration-500 hover:scale-[1.02]">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Token Details</h3>
        <div className="space-y-6">
            {TOKEN_DETAILS.map((detail, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center pb-3
                                         border-b border-gray-200 last:border-0
                                          p-2 rounded-lg
                                         transition-colors duration-300">
                    <span className="text-gray-600">{detail.label}</span>
                    <span className="text-gray-900 font-medium">{detail.value}</span>
                </div>
            ))}
        </div>
    </div>
);

const PieChartSection: FC = () => {
    // Calculate radii based on viewport size
    const outerRadius = window.innerWidth >= 1280 ? 240 : // xl
        window.innerWidth >= 1024 ? 200 : // lg
            160; // default

    return (
        <div className="h-[400px] lg:h-[500px] xl:h-[600px] relative">
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={TOKEN_ALLOCATIONS}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={outerRadius}
                        paddingAngle={0}
                        dataKey="percentage"
                        strokeWidth={0}
                    >
                        {TOKEN_ALLOCATIONS.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                className="transition-all duration-300 hover:opacity-80"
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        content={<CustomTooltip />}
                        wrapperStyle={{ zIndex: 30 }}
                    />
                </PieChart>
            </ResponsiveContainer>

            {/* Center Content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          text-center bg-white rounded-full
                          p-6 lg:p-8 xl:p-10 border border-primary/20
                          w-[140px] h-[140px] lg:w-[180px] lg:h-[180px] xl:w-[200px] xl:h-[200px]
                          flex flex-col items-center justify-center">
                <div className="text-sm lg:text-base text-gray-600">Total Supply</div>
                <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mt-1">
                    99,999,999
                </div>
                <div className="text-lg lg:text-xl xl:text-2xl font-bold text-primary">
                    CAFI
                </div>
            </div>
        </div>
    );
};

const VestingScheduleCard: FC = () => (
    <div className="rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm
                    border border-gray-100 shadow-lg shadow-primary/5
                    hover:shadow-primary/10 transition-all duration-500">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 px-8 py-6">
            <h3 className="text-2xl font-bold text-gray-900 text-center">
                Token Release Schedule
            </h3>
        </div>
        <div className="p-8 lg:p-12">
            <div className="grid md:grid-cols-3 gap-8">
                {VESTING_SCHEDULE.map((schedule, index) => (
                    <div
                        key={index}
                        className="text-center p-6 rounded-2xl bg-white border
                                            border-gray-100 hover:border-primary/20
                                            hover:bg-primary/5 transition-all duration-300
                                            hover:scale-105">
                        <div className="text-primary font-medium mb-2">{schedule.phase}</div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{schedule.release}</div>
                        <div className="text-gray-600">{schedule.date}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const Tokenomics = () => {
    return (
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0">
                <img
                    src="/images/roadmap-bg.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                />
                {/*<div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />*/}
            </div>
            {/* Animated Blobs */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full
                          blur-3xl animate-blob" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full
                          blur-3xl animate-blob animation-delay-2000" />

            <Container className="relative z-10">
                <div className="text-center mb-10 pb-6 border-b border-gray-200">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <img src="/images/sub-title-shape.png" alt=""
                             className="w-6 animate-pulse" draggable={false}/>
                        <span className="text-primary font-medium tracking-wider">
                            TOKENOMICS
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Token Distribution
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        CarbonFi $CAFI token distribution is designed to ensure long-term
                        sustainability and fair allocation across different stakeholders
                    </p>
                </div>

                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border
                                  border-gray-100 p-8 lg:p-12 shadow-xl shadow-primary/5">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div className="lg:col-span-1">
                                <PieChartSection/>
                            </div>
                            <div className="lg:col-span-1">
                                <TokenDetailsCard/>
                            </div>
                        </div>

                        <div className="mt-12 pt-12 border-t border-gray-200">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                {TOKEN_ALLOCATIONS.map((item) => (
                                    <div key={item.category}
                                         className="text-center transform transition-all
                                                  duration-300 hover:scale-105">
                                        <div
                                            className="w-3 h-3 rounded-full mx-auto mb-3"
                                            style={{backgroundColor: item.color}}
                                        />
                                        <div className="text-gray-900 text-sm font-medium mb-1">
                                            {item.category}
                                        </div>
                                        <div className="text-primary font-bold">
                                            {item.percentage}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <VestingScheduleCard/>
                </div>
            </Container>
        </section>
    );
};