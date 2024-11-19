// src/components/layout/PageWrapper.tsx
import { FC, ReactNode } from 'react';

interface PageWrapperProps {
    children: ReactNode;
    className?: string;
}

export const PageWrapper: FC<PageWrapperProps> = ({ children, className = '' }) => (
    <main className={`pt-[100px] min-h-screen ${className}`}>
        {children}
    </main>
);