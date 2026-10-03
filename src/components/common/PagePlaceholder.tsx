import React, { ReactNode } from 'react';
import { Container } from './Container';
import { SectionHeading } from './SectionHeading';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { ArrowLeft, Clock, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';

export interface PagePlaceholderProps {
  title: string;
  subtitle: string;
  badge?: string;
  routePath: string;
  moduleType?: 'Public Informational Page' | 'Client Portal Module' | 'Field Engineer Module' | 'Admin Module' | 'Authentication Module';
  description?: string;
  action?: ReactNode;
  children?: ReactNode;
}

/**
 * Standardized Page Placeholder Component
 * Used across foundation routes to provide structural consistency, route verification,
 * and architectural clarity without fake data or simulated business logic.
 */
export const PagePlaceholder: React.FC<PagePlaceholderProps> = ({
  title,
  subtitle,
  badge = 'Architecture Foundation',
  routePath,
  moduleType = 'Public Informational Page',
  description,
  action,
  children,
}) => {
  return (
    <div className="py-10 sm:py-16">
      <Container size="2xl">
        {/* Breadcrumb / Status Eyebrow */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-slate-500">
          <Link to={ROUTES.PUBLIC.HOME} className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="font-mono text-slate-700">{routePath}</span>
          <span>•</span>
          <Badge variant="amber" icon={<Clock className="w-3 h-3" />}>
            {moduleType}
          </Badge>
        </div>

        {/* Section Heading */}
        <SectionHeading
          badge={badge}
          title={title}
          subtitle={subtitle}
          action={action}
        />

        {/* Foundation Card Specifying Module Boundary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card variant="industrial" className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{title} — Foundation Ready</CardTitle>
                <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-200">
                  {routePath}
                </span>
              </div>
              <CardDescription>
                {description ||
                  'The structural route, design system layout, and container hierarchy for this page are prepared. Production content and service integrations will connect here in subsequent phases.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {children || (
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-sm space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <Code2 className="w-4 h-4 text-amber-600" />
                    <span>Implementation Boundary</span>
                  </div>
                  <p>
                    This route is mounted under standard layout boundaries. No simulated data or mock APIs are used, adhering strictly to production-grade engineering standards.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link to={ROUTES.PUBLIC.HOME}>
                <Button variant="secondary" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back to Overview
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Architecture Status Sidebar */}
          <div className="space-y-4">
            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-base">Route Specifications</CardTitle>
                <CardDescription className="text-xs">
                  Production routing contract
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="font-medium text-slate-500">Route URI:</span>
                  <span className="font-mono text-slate-900">{routePath}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="font-medium text-slate-500">Scope:</span>
                  <span className="text-slate-900">{moduleType}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-slate-500">State:</span>
                  <span className="text-emerald-700 font-semibold">Active & Routed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
