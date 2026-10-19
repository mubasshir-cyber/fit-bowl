import React from 'react';

export type BadgeVariant =
  | 'veg'
  | 'non-veg'
  | 'popular'
  | 'friday'
  | 'macro'
  | 'kicker'
  | 'neutral';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = 'neutral',
  children,
  className = '',
  ...props
}: BadgeProps) {
  const baseClasses =
    'inline-flex items-center font-bold tracking-tight select-none';

  switch (variant) {
    case 'veg':
      return (
        <span
          className={`${baseClasses} text-xs px-2.5 py-0.5 rounded-full bg-[#E8F5E9] border border-[#C8E6C9] text-[#1B5E20] gap-1.5 ${className}`}
          {...props}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
          {children}
        </span>
      );

    case 'non-veg':
      return (
        <span
          className={`${baseClasses} text-xs px-2.5 py-0.5 rounded-full bg-[#FFEDD5] border border-[#FED7AA] text-[#9A3412] gap-1.5 ${className}`}
          {...props}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]" />
          {children}
        </span>
      );

    case 'popular':
      return (
        <span
          className={`${baseClasses} text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-[#F47738] text-white shadow-sm font-extrabold ${className}`}
          {...props}
        >
          {children}
        </span>
      );

    case 'friday':
      return (
        <span
          className={`${baseClasses} text-xs px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E] font-extrabold ${className}`}
          {...props}
        >
          ⭐ {children}
        </span>
      );

    case 'macro':
      return (
        <span
          className={`${baseClasses} text-xs px-2.5 py-1 rounded-full bg-[#173F32]/6 text-[#173F32] font-semibold ${className}`}
          {...props}
        >
          {children}
        </span>
      );

    case 'kicker':
      return (
        <span
          className={`${baseClasses} text-[11px] sm:text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#DCEBCF] text-[#173F32] font-extrabold ${className}`}
          {...props}
        >
          {children}
        </span>
      );

    case 'neutral':
    default:
      return (
        <span
          className={`${baseClasses} text-xs px-2.5 py-0.5 rounded-full bg-white/80 border border-[#E3D8C4] text-[#173F32] ${className}`}
          {...props}
        >
          {children}
        </span>
      );
  }
}
