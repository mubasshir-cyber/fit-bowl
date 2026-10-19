import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer rounded-full select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F32] focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 gap-2',
    lg: 'text-base sm:text-lg px-7 py-3.5 sm:px-8 sm:py-4 gap-2.5',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-[#F47738] text-white hover:bg-[#E06324] shadow-[0_4px_14px_rgba(244,119,56,0.35)] hover:shadow-[0_6px_20px_rgba(244,119,56,0.45)] hover:-translate-y-0.5',
    secondary:
      'border-2 border-[#173F32] text-[#173F32] hover:bg-[#173F32] hover:text-white',
    outline:
      'border border-[#E3D8C4] text-[#173F32] bg-white/70 hover:bg-white hover:border-[#173F32]',
    ghost:
      'text-[#173F32] hover:bg-[#173F32]/10',
    dark:
      'bg-[#173F32] text-[#FFF7E8] hover:bg-[#0F2C23] shadow-md hover:-translate-y-0.5',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}
