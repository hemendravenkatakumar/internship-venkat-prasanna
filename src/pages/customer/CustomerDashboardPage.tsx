import React, { useState, useEffect, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/common';
import { authService, UserProfile } from '@/services/authService';
import { complaintsService, ComplaintRecord } from '@/services/complaintsService';
import { servicesService, ServiceRecord } from '@/services/servicesService';
import {
  FilePlus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Building2,
  Wrench,
  Layers,
  Phone,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const authUser = authService.getCurrentUser();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(authUser);

  const [complaints, setComplaints] = useState<ComplaintRecord[]>(() =>
    authUser ? complaintsService.getUserComplaints(authUser.id) : []
  );

  const [activeServices, setActiveServices] = useState<ServiceRecord[]>(() =>
    authUser ? servicesService.getActiveServices(authUser.location) : []
  );

  const [lastRefreshed, setLastRefreshed] = useState<string>(() => new Date().toLocaleTimeString());

  const loadData = useCallback(() => {
    const user = authService.getCurrentUser();
    if (!user) return;
    setCurrentUser(user);
    setComplaints(complaintsService.getUserComplaints(user.id));
    setActiveServices(servicesService.getActiveServices(user.location));
    setLastRefreshed(new Date().toLocaleTimeString());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      loadData();
    }, 4000);
    return () => clearInterval(timer);
  }, [loadData]);

  if (!currentUser) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  const totalComplaints = complaints.length;
  const inProgressCount = complaints.filter(
    (c) => c.status === 'In Progress' || c.status === 'Under Review'
  ).length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;

  return (
    <div className="space-y-8">
      {/* Welcome & User Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="amber" icon={<Sparkles className="w-3.5 h-3.5" />}>
              ReliefNet Client Operations
            </Badge>
            <span className="text-xs font-mono text-slate-500">
              Account ID: {currentUser.id}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {currentUser.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.company || 'Industrial Facility Client'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.location || 'Tadepalligudem, AP'}</span>
            </span>
            <span>•</span>
            <span className="text-slate-400">
              Updated: {lastRefreshed || 'Just now'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={loadData}
            className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            title="Refresh dashboard data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
            <Button variant="industrial" size="md" rightIcon={<FilePlus className="w-4 h-4" />}>
              Submit Complaint
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Status Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="default" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              My Total Complaints
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-slate-900">{totalComplaints}</span>
            <p className="text-xs text-slate-500 mt-1">Logged incident tickets</p>
          </div>
        </Card>

        <Card variant="industrial" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active / Under Triage
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-amber-600">{inProgressCount}</span>
            <p className="text-xs text-slate-500 mt-1">Under review or dispatch</p>
          </div>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Resolved Tickets
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-emerald-700">{resolvedCount}</span>
            <p className="text-xs text-slate-500 mt-1">Closed & verified repairs</p>
          </div>
        </Card>
      </div>

      {/* Recent Complaints Section */}
      <Card variant="default">
        <CardHeader className="border-b border-slate-100 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base sm:text-lg">Recent Complaint Submissions</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Track real-time status changes and technician remarks for your facility.
              </p>
            </div>
            <Link to={ROUTES.CUSTOMER.REQUESTS}>
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                View All My Complaints
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {complaints.length === 0 ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">No complaints submitted yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Submit an equipment malfunction or breakdown complaint to mobilize on-site technical support.
              </p>
              <div className="pt-2">
                <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                  <Button variant="industrial" size="sm" leftIcon={<FilePlus className="w-4 h-4" />}>
                    Submit Complaint Now
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {complaints.slice(0, 3).map((item) => (
                <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                        {item.token}
                      </span>
                      <Badge
                        variant={
                          item.status === 'Resolved'
                            ? 'success'
                            : item.status === 'In Progress'
                            ? 'amber'
                            : item.status === 'Under Review'
                            ? 'info'
                            : 'default'
                        }
                      >
                        {item.status}
                      </Badge>
                      <span className="text-xs text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-1">
                      {item.description}
                    </p>

                    {item.adminRemarks && (
                      <div className="mt-2 bg-amber-50/70 border border-amber-200/80 rounded-lg p-2.5 text-xs text-amber-900 flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Admin Update: </span>
                          <span>{item.adminRemarks}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="sm:self-center shrink-0">
                    <Link to={ROUTES.CUSTOMER.REQUESTS}>
                      <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Track Status
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Services in Your Location (Dynamically Loaded from Services Service) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-amber-600" />
              <span>Available Active Services in Your Area</span>
            </h3>
            <p className="text-xs text-slate-500">
              Active engineering services provided for location: <strong className="text-slate-800">{currentUser.location || 'All Locations'}</strong>
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded">
            {activeServices.length} Active Services
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeServices.map((service) => (
            <Card key={service.id} variant="default" className="p-5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {service.id.toUpperCase()}
                  </span>
                  <Badge variant="success">Active Service</Badge>
                </div>

                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {service.name}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{service.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{service.locations.join(', ')}</span>
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{service.contactInfo || 'Direct Dispatch Hotline'}</span>
                </span>
                <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                  <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Request
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
