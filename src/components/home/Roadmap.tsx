import { Container } from '@/components/shared/Container';
import { FC, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

interface Milestone {
    title: string;
    description: string;
}

interface RoadmapItem {
    id: number;
    quarter: string;
    milestones: Milestone[];
    status: 'completed' | 'ongoing' | 'upcoming';
}

const roadmapData: RoadmapItem[] = [
    {
        id: 1,
        quarter: 'Q3 2024',
        status: 'completed',
        milestones: [
            {
                title: 'Concept Development',
                description: 'Finalize the overall vision and mission of CarbonFi, focusing on its role ' +
                    'in carbon credit trading and sustainability.'
            },
            {
                title: 'Research and Analysis',
                description: 'Conduct market research to identify key opportunities and challenges in ' +
                    'the carbon credit space, including competitor analysis and regulatory considerations.'
            },
            {
                title: 'Stakeholder Engagement',
                description: 'Engage with potential stakeholders, including environmental organizations, ' +
                    'carbon credit certification bodies, and early adopters, to gather insights and refine ' +
                    'the project concept.'
            },
            {
                title: 'Hiring Key Personnel',
                description: 'Assemble a diverse team of experts in web3 development, environmental science, ' +
                    'marketing, and finance. This includes hiring developers, project managers, ' +
                    'and sustainability advisors.'
            },
            {
                title: 'Team Workshops',
                description: 'Conduct workshops to align the team on project goals, roles, and responsibilities, ' +
                    'fostering a collaborative culture.'
            },
            {
                title: 'Infrastructure Setup',
                description: 'Establish operational infrastructure, including communication channels, ' +
                    'project management tools, and initial branding elements for CarbonFi.'
            }
        ]
    },
    {
        id: 2,
        quarter: 'Q4 2024',
        status: 'ongoing',
        milestones: [
            {
                title: 'Platform Design',
                description: 'Begin the design phase for the CarbonFi platform, focusing on user experience (UX) ' +
                    'and user interface (UI) to ensure ease of use.'
            },
            {
                title: 'Smart Contract Development',
                description: 'Develop and test the smart contracts that will govern carbon credit tokenization, ' +
                    'trading, and staking functionalities.'
            },
            {
                title: 'Private Sale Preparation',
                description: 'Develop a comprehensive ' +
                    'private sale strategy, including pricing, tokenomics, and incentives for early investors.'
            },
            {
                title: 'Marketing Outreach',
                description: 'Initiate outreach to potential investors, presenting the CarbonFi vision and ' +
                    'business model through detailed presentations and informational materials.'
            },
            {
                title: 'Launch Private Sale',
                description: 'Conduct the private sale of CAFI tokens, aiming to raise initial funding to support ' +
                    'platform development and marketing efforts. Engage with investors to gather feedback and foster ' +
                    'relationships for future rounds.'
            },
            {
                title: 'Backend Development',
                description: 'Initiate backend development ' +
                    'to ensure the platform can handle user registrations, transactions, and data storage securely.'
            },
            {
                title: 'System Implementation',
                description: 'Finalize the implementation of the Tracing - Tracking - Trading system, enabling users ' +
                    'to trace carbon credits from generation to trading.'
            },
            {
                title: 'Alpha Testing Launch',
                description: 'Conduct alpha testing of ' +
                    'the platform with selected users to gather feedback on functionality, security, and performance.'
            },
            {
                title: 'Adjustments and Improvements',
                description: 'Make necessary adjustments to the platform based on user feedback and testing results, ' +
                    'enhancing the overall user experience.'
            },
            {
                title: 'ICO Preparation',
                description: 'Finalize all preparations for the Initial Coin Offering (ICO), including marketing ' +
                    'materials, community engagement strategies, and investor communication plans.'
            },
            {
                title: 'ICO Launch',
                description: 'Conduct the ICO for CAFI tokens, allowing the broader public to invest and participate ' +
                    'in the CarbonFi ecosystem.'
            },
            {
                title: 'Post-ICO Evaluation',
                description: 'After the ICO, evaluate the fundraising results and user engagement, setting the stage ' +
                    'for future developments and initiatives in 2025.'
            }
        ]
    },
    {
        id: 3,
        quarter: 'Q1 2025',
        status: 'upcoming',
        milestones: [
            {
                title: 'Beta Testing Phase',
                description: 'Launch the beta version of the CarbonFi platform for a select group of users, including early adopters and strategic partners.'
            },
            {
                title: 'Feedback Collection',
                description: 'Gather detailed feedback on user experience, functionality, and any technical issues encountered during testing.'
            },
            {
                title: 'Bug Fixes and Improvements',
                description: 'Address identified issues and implement improvements based on user feedback to enhance platform performance.'
            },
            {
                title: 'User Onboarding Sessions',
                description: 'Conduct training sessions and webinars for early adopters to familiarize them with platform features and benefits.'
            },
            {
                title: 'Community Engagement',
                description: 'Build an online community through forums and social media to support early users and gather ongoing feedback.'
            },
            {
                title: 'Partnership Development',
                description: 'Formalize partnerships with carbon credit providers and environmental organizations to enhance the platforms offerings.'
            },
            {
                title: 'Integration of Partners',
                description: 'Begin onboarding carbon credit projects and partners onto the platform, ensuring their credits are ready for tokenization and trading.'
            },
            {
                title: 'Launch Support Materials',
                description: 'Provide documentation, FAQs, and support materials for partners to facilitate their integration into the CarbonFi ecosystem.'
            },
            {
                title: 'Final Adjustments',
                description: 'Make any final adjustments to the platform based on beta testing results and partner feedback.'
            }
        ]
    },
    {
        id: 4,
        quarter: 'Q2 2025',
        status: 'upcoming',
        milestones: [
            {
                title: 'Official Launch',
                description: 'Conduct a public launch of the CarbonFi platform, making it accessible to all users.'
            },
            {
                title: 'Marketing Campaign',
                description: 'Initiate a comprehensive marketing campaign to promote the launch and educate potential users about the benefits of the platform.'
            },
            {
                title: 'User Support Initiatives',
                description: 'Establish a dedicated support team to assist users with onboarding and address any questions or issues.'
            },
            {
                title: 'Blockchain Integration',
                description: 'Complete the integration of the CarbonFi platform with the Dynasty Blockchain, ensuring secure and efficient transactions.'
            },
            {
                title: 'Smart Contract Finalization',
                description: 'Finalize and deploy all smart contracts related to carbon credit trading, staking, and other platform functionalities.'
            },
            {
                title: 'Testing and Validation',
                description: 'Conduct thorough testing of blockchain functionalities to ensure seamless operation and security.'
            },
            {
                title: 'Project Launch',
                description: 'Officially launch the Carbon Initiative Investment project, allowing users to invest in vetted carbon reduction projects.'
            },
            {
                title: 'Investment Opportunities',
                description: 'Provide detailed information on available projects, including potential returns and environmental impact.'
            },
            {
                title: 'Marketing and Outreach',
                description: 'Promote the investment project through targeted marketing campaigns to attract investors and environmentally conscious users.'
            }
        ]
    },
    {
        id: 5,
        quarter: 'Q3 2025',
        status: 'upcoming',
        milestones: [
            {
                title: 'Identify New Partners',
                description: 'Reach out to additional carbon credit certification bodies, NGOs, and businesses in carbon-heavy industries to establish partnerships.'
            },
            {
                title: 'Integration Workshops',
                description: 'Host workshops for new partners to facilitate onboarding and ensure successful integration into the CarbonFi ecosystem.'
            },
            {
                title: 'Collaborative Projects',
                description: 'Initiate collaborative projects with partners to enhance carbon credit generation and increase offerings on the platform.'
            },
            {
                title: 'User Acquisition Campaign',
                description: 'Launch targeted marketing campaigns aimed at attracting new users and investors to the platform.'
            },
            {
                title: 'Educational Content',
                description: 'Develop educational materials, including webinars and blog posts, to inform potential users about carbon credits and the benefits of using CarbonFi.'
            },
            {
                title: 'Community Building',
                description: 'Foster community engagement through social media campaigns, forums, and user events to create a strong CarbonFi community.'
            },
            {
                title: 'Performance Review',
                description: 'Conduct a review of platform performance, user engagement, and market conditions to assess the effectiveness of marketing strategies.'
            },
            {
                title: 'User Feedback Collection',
                description: 'Gather feedback from users regarding their experiences and suggestions for improvement.'
            },
            {
                title: 'Strategy Adjustments',
                description: 'Make necessary adjustments to marketing strategies and platform features based on feedback and performance metrics.'
            }
        ]
    },
    {
        id: 6,
        quarter: 'Q4 2025',
        status: 'upcoming',
        milestones: [
            {
                title: 'Infrastructure Scaling',
                description: 'Optimize platform infrastructure to handle increased user activity and trading volume.'
            },
            {
                title: 'Team Expansion',
                description: 'Hire additional personnel in support, development, and marketing to meet the growing demands of the platform.'
            },
            {
                title: 'Operational Efficiency',
                description: 'Implement processes and tools to improve operational efficiency and customer support.'
            },
            {
                title: 'New Projects Launch',
                description: 'Introduce new carbon reduction projects within the Carbon Initiative Investment program to expand investment opportunities.'
            },
            {
                title: 'Partnership Promotions',
                description: 'Promote collaborative projects with partners to showcase their impact and attract new investors.'
            },
            {
                title: 'User Engagement Initiatives',
                description: 'Host events and webinars to engage users and inform them about new projects and investment opportunities.'
            },
            {
                title: 'User Feedback Integration',
                description: 'Analyze user feedback collected throughout the year and implement improvements to the platform and user experience.'
            },
            {
                title: 'Roadmap Planning for 2026',
                description: 'Develop a strategic roadmap for 2026, outlining goals, new features, and expansion plans for the CarbonFi ecosystem.'
            },
            {
                title: 'Year-End Review',
                description: 'Conduct a comprehensive review of the year’s achievements, challenges, and lessons learned to inform future strategies.'
            }
        ]
    },
    {
        id: 7,
        quarter: '2026 And Beyond',
        status: 'upcoming',
        milestones: [
            {
                title: 'More to come',
                description: 'Execute strategic roadmap for 2026, outlining goals, new features, and expansion plans ' +
                    'for the CarbonFi ecosystem.'
            }
        ]
    }
];

const StatusBadge: FC<{ status: RoadmapItem['status'] }> = ({ status }) => {
    const statusConfig = {
        completed: 'bg-green-100/80 text-green-700 border-green-200/50',
        ongoing: 'bg-primary/10 text-primary border-primary/20 animate-pulse',
        upcoming: 'bg-blue-100/80 text-blue-700 border-blue-200/50'
    };

    return (
        <span className={`
            px-3 py-1 rounded-full text-sm font-medium border 
            backdrop-blur-sm transition-all duration-300
            ${statusConfig[status]}
        `}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

const RoadmapCard: FC<{ item: RoadmapItem; isExpanded: boolean; onToggle: () => void }> = ({
                                                                                               item,
                                                                                               isExpanded,
                                                                                               onToggle
                                                                                           }) => (
    <div className={`
        group backdrop-blur-sm rounded-2xl
        border border-white/60 hover:border-primary/30
        transition-all duration-500 hover:shadow-lg
        ${item.status === 'completed' ? 'bg-white/80' : ''}
        ${item.status === 'ongoing' ? 'bg-primary/5' : ''}
        ${item.status === 'upcoming' ? 'bg-white/70' : ''}
    `}>
        <button
            onClick={onToggle}
            className="w-full p-6 flex items-center justify-between gap-4"
        >
            <div className="flex items-center gap-4 flex-wrap">
                <div className="px-4 py-2 rounded-full bg-primary/90 text-white
                             font-medium backdrop-blur-sm">
                    {item.quarter}
                </div>
                <StatusBadge status={item.status} />
            </div>
            <FaChevronDown className={`
                text-primary/60 transition-transform duration-300
                group-hover:text-primary
                ${isExpanded ? 'rotate-180' : ''}
            `} />
        </button>

        <div className={`
            overflow-hidden transition-all duration-500 ease-in-out
            ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
        `}>
            <div className="p-6 pt-0 space-y-6 border-t border-white/20">
                {item.milestones.map((milestone, index) => (
                    <div key={index} className="group/milestone">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2
                                   group-hover/milestone:text-primary transition-colors">
                            {milestone.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed
                                  group-hover/milestone:text-gray-700">
                            {milestone.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const Roadmap = () => {
    const [expandedId, setExpandedId] = useState<number | null>(2);

    return (
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
            {/* Fixed Background with Overlay */}
            <div className="fixed inset-0">
                <img
                    src="/images/roadmap-bg.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-white/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50" />
            </div>

            {/* Content Container */}
            <Container className="relative z-10">
                <div className="text-center mb-10 space-y-4">
                    <div className="flex items-center justify-center gap-2">
                        <img
                            src="/images/sub-title-shape.png"
                            alt=""
                            className="w-6 animate-pulse"
                            draggable={false}
                        />
                        <span className="text-primary font-medium tracking-wider">
                            ROADMAP
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                        Our Journey
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto pb-6 border-b border-gray-200">
                        Follow our progress as we build the future of carbon credit trading
                        and environmental sustainability.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {roadmapData.map((item) => (
                        <RoadmapCard
                            key={item.id}
                            item={item}
                            isExpanded={expandedId === item.id}
                            onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};