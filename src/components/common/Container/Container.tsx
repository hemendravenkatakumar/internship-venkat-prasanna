import { ElementType, forwardRef, HTMLAttributes } from 'react';
import { ContainerSize } from '@/types';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: ContainerSize;
  className?: string;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  '2xl': 'max-w-7xl',
  full: 'max-w-full',
};

export const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ as: Component = 'div', size = '2xl', className = '', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';
