import { ReactNode } from 'react';

/**
 * Navigation item structure for header, mobile drawer, and footer.
 */
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  isExternal?: boolean;
}

/**
 * Standard public layout props.
 */
export interface LayoutProps {
  children: ReactNode;
}

/**
 * Design system component variant types.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'industrial';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'lead'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'mono';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type CardVariant = 'default' | 'industrial' | 'flat' | 'elevated' | 'interactive';
