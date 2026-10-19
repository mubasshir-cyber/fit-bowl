import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export function Container({
  children,
  className = '',
  size = 'default',
  ...props
}: ContainerProps) {
  const maxClass =
    size === 'narrow'
      ? 'max-w-4xl'
      : size === 'wide'
      ? 'max-w-7xl'
      : 'max-w-[1280px]';

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${maxClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
