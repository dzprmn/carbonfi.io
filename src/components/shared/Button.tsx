import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    isLoading?: boolean;
}

const sizeClasses: Record<Size, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-base',
};

const variantClasses: Record<Variant, string> = {
    primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20 hover:shadow-primary/40',
    secondary: 'border bg-white/10 hover:bg-white/20 text-gray-900',
    outline: 'border border-white/20 hover:bg-white/10 text-white',
};

export const Button = ({
                           variant = 'primary',
                           size = 'md',
                           fullWidth = false,
                           leftIcon,
                           rightIcon,
                           isLoading,
                           className = '',
                           children,
                           ...props
                       }: ButtonProps) => {
    return (
        <button
            className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        rounded-full
        font-medium
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {leftIcon && !isLoading && leftIcon}
            {children}
            {rightIcon && !isLoading && rightIcon}
        </button>
    );
};