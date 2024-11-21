// src/components/shared/Accordion.tsx
import { useState, useEffect, FC } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

interface AccordionProps {
    title: string;
    isInitiallyOpen?: boolean;
    children: React.ReactNode;
}

export const Accordion: FC<AccordionProps> = ({
                                                  children,
                                                  title,
                                                  isInitiallyOpen = false
                                              }) => {
    const [isOpen, setIsOpen] = useState(isInitiallyOpen);

    useEffect(() => {
        setIsOpen(isInitiallyOpen);
    }, [isInitiallyOpen]);

    return (
        <div className="mb-4 rounded-xl overflow-hidden border border-gray-200
                      hover:border-primary/30 transition-all duration-300">
            <button
                className="w-full px-6 py-4 text-left flex items-center justify-between
                         bg-white hover:bg-gray-50 transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="text-lg font-semibold text-gray-900">
                    {title}
                </span>
                <FaChevronDown className={`
                    text-primary transition-transform duration-300
                    ${isOpen ? 'rotate-180' : ''}
                `} />
            </button>

            <div className={`
                grid transition-all duration-300 ease-in-out bg-white
                ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
            `}>
                <div className="overflow-hidden">
                    <div className="p-6 pt-2 text-gray-600">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};