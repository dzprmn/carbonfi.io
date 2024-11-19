import React from "react";

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className }) => {
    return (
        <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
            {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
            {children}
        </div>
    );
};