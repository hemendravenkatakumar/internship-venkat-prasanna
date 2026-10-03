import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { Container, Button, Typography, Card, CardContent } from '@/components/common';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-20">
      <Container size="md">
        <Card variant="default" className="text-center p-8 sm:p-12">
          <CardContent className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                Error 404 • Resource Not Found
              </span>
              <Typography variant="h2" as="h1" className="text-slate-900 font-extrabold pt-2">
                Page Not Found
              </Typography>
              <Typography variant="body" className="text-slate-600 max-w-md mx-auto">
                The requested URL or operational endpoint does not exist on the Venkata Prasanna Enterprises portal.
              </Typography>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link to={ROUTES.PUBLIC.HOME}>
                <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
                  Return to Home
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="md"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};
