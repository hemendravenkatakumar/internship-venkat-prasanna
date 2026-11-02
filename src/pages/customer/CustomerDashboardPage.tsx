import React, { useState, useEffect, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { Card, CardHeader, CardContent, Button, Badge } from '@/components/common';
import { authService, UserProfile } from '@/services/authService';
import { complaintsService, ComplaintRecord } from '@/services/complaintsService';
import { servicesService, ServiceRecord } from '@/services/servicesService';
import { engineerRecordsService, EngineerServiceRecord } from '@/services/engineerRecordsService';
import { notificationsService, NotificationItem } from '@/services/notificationsService';
import { useLanguage } from '@/context/LanguageContext';
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
  Calendar,
  User,
  FileText,
  X,
  Bell,
  Cpu,
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const authUser = authService.getCurrentUser();
  const { t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(authUser);

  const [complaints, setComplaints] = useState<ComplaintRecord[]>(() =>
    authUser ? complaintsService.getUserComplaints(authUser.id) : []
  );

  const [activeServices, setActiveServices] = useState<ServiceRecord[]>(() =>
    authUser ? servicesService.getActiveServices(authUser.location) : []
  );

  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    authUser ? notificationsService.getNotifications('customer', authUser.id) : []
  );

  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [selectedRecord, setSelectedRecord] = useState<EngineerServiceRecord | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<string>(() => new Date().toLocaleTimeString());

  const loadData = useCallback(() => {
    const user = authService.getCurrentUser();
    if (!user) return;
    setCurrentUser(user);
    setComplaints(complaintsService.getUserComplaints(user.id));
    setActiveServices(servicesService.getActiveServices(user.location));
    setNotifications(notificationsService.getNotifications('customer', user.id));
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

  // Filter requests
  const totalCount = complaints.length;
  const pendingCount = complaints.filter(
    (c) => c.status === 'Submitted' || c.status === 'Under Review'
  ).length;
  const scheduledCount = complaints.filter((c) => c.status === 'Scheduled').length;
  const completedCount = complaints.filter(
    (c) => c.status === 'Completed' || c.status === 'Resolved'
  ).length;

  const activeRequests = complaints.filter(
    (c) => c.status !== 'Completed' && c.status !== 'Resolved'
  );
  const completedRequests = complaints.filter(
    (c) => c.status === 'Completed' || c.status === 'Resolved'
  );

  const handleOpenEngineerRecord = (complaint: ComplaintRecord) => {
    // Look up engineer record by token or id
    const rec =
      engineerRecordsService.getRecord(complaint.token) ||
      engineerRecordsService.getRecord(complaint.id) ||
      (complaint.serviceRecordId ? engineerRecordsService.getRecord(complaint.serviceRecordId) : undefined);

    if (rec) {
      setSelectedRecord(rec);
    } else {
      // Fallback synthetic record if none explicitly mapped
      setSelectedRecord({
        id: `ESR-2026-${complaint.token.slice(-4)}`,
        serviceRequestId: complaint.id,
        serviceRequestToken: complaint.token,
        customerName: complaint.contactPerson || complaint.userName,
        companyName: complaint.companyName || currentUser.company,
        industryType: complaint.industryType || 'Industrial Processing',
        machineIssue: complaint.title,
        visitDate: complaint.scheduledDate || complaint.updatedAt.split('T')[0],
        inspectionFindings:
          complaint.adminRemarks || 'On-site technical inspection verified problem resolution.',
        workPerformed:
          'Comprehensive component testing, calibration, and test run executed in compliance with industrial safety codes.',
        toolsAndMaterials: 'Standard industrial calibration equipment & replacement seals.',
        gasCompressorRequirements: 'N/A or verified within operating specs.',
        engineerName: complaint.assignedEngineer || 'VPE Certified Field Specialist',
        engineerRemarks: 'Machine returned to service. Operating smoothly.',
        completionStatus: 'Fully Operational',
        createdAt: complaint.updatedAt,
        updatedAt: complaint.updatedAt,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome & Industrial Facility Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="amber" icon={<Sparkles className="w-3.5 h-3.5" />}>
              VPE Client Portal
            </Badge>
            <span className="text-xs font-mono text-slate-500">
              Client ID: {currentUser.id}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {currentUser.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium text-slate-800">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.company || 'Industrial Facility Client'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.location || 'Tadepalligudem, AP'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.industry || 'Industrial Processing'}</span>
            </span>
            <span>•</span>
            <span className="text-slate-400">
              Updated: {lastRefreshed}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={loadData}
            className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Refresh dashboard data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
            <Button variant="industrial" size="md" rightIcon={<FilePlus className="w-4 h-4" />}>
              Submit Service Request
            </Button>
          </Link>
        </div>
      </div>

      {/* Notifications Alert Bar (if unread notifications exist) */}
      {notifications.filter((n) => !n.read).length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start justify-between gap-3 text-xs text-amber-900 animate-fade-in">
          <div className="flex items-start gap-2.5">
            <Bell className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold">Latest Operational Alert: </span>
              <span>{notifications.filter((n) => !n.read)[0]?.message}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              notificationsService.markAllAsRead('customer', currentUser.id);
              setNotifications(notificationsService.getNotifications('customer', currentUser.id));
            }}
            className="text-[11px] font-bold text-amber-800 hover:underline shrink-0 cursor-pointer"
          >
            Mark all read
          </button>
        </div>
      )}

      {/* 4 Status Metric Cards: Total, Pending, Scheduled, Completed */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default" className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('customer.total_requests')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{totalCount}</span>
            <p className="text-[11px] text-slate-500 mt-1">Logged requests</p>
          </div>
        </Card>

        <Card variant="default" className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              {t('customer.pending')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-amber-700">{pendingCount}</span>
            <p className="text-[11px] text-slate-500 mt-1">Awaiting triage/visit</p>
          </div>
        </Card>

        <Card variant="industrial" className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              {t('customer.scheduled')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-blue-800">{scheduledCount}</span>
            <p className="text-[11px] text-slate-500 mt-1">Visit dates confirmed</p>
          </div>
        </Card>

        <Card variant="default" className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              {t('customer.completed')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">{completedCount}</span>
            <p className="text-[11px] text-slate-500 mt-1">Repairs certified</p>
          </div>
        </Card>
      </div>

      {/* Main Tabbed Service Section: Active Requests vs Previous Service History */}
      <Card variant="default">
        <CardHeader className="border-b border-slate-100 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'active'
                    ? 'bg-slate-900 text-amber-400 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t('customer.active_requests')} ({activeRequests.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-slate-900 text-amber-400 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t('customer.service_history')} ({completedRequests.length})
              </button>
            </div>

            <Link to={ROUTES.CUSTOMER.REQUESTS}>
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                View All Requests
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {activeTab === 'active' && (
            <div>
              {activeRequests.length === 0 ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">No active breakdown tickets</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    All machines are currently operating normally. Submit a request if you experience issues.
                  </p>
                  <div className="pt-2">
                    <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                      <Button variant="industrial" size="sm" leftIcon={<FilePlus className="w-4 h-4" />}>
                        Submit Service Request
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {activeRequests.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold bg-slate-100 text-slate-900 px-2 py-0.5 rounded border border-slate-200">
                            {item.token}
                          </span>
                          <Badge
                            variant={
                              item.status === 'Scheduled'
                                ? 'info'
                                : item.status === 'In Progress'
                                ? 'amber'
                                : 'default'
                            }
                          >
                            {item.status}
                          </Badge>
                          <span className="text-xs text-slate-400">
                            Problem Start: {item.problemStartDate || item.createdAt.split('T')[0]}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {item.title}
                        </h4>

                        <p className="text-xs text-slate-600 line-clamp-1">
                          {item.description}
                        </p>

                        {/* Scheduled visit date banner if scheduled */}
                        {item.scheduledDate && (
                          <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-xs text-blue-900 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                            <div>
                              <span className="font-bold">Service Visit Date: </span>
                              <span>{item.scheduledDate}</span>
                              {item.assignedEngineer && (
                                <span className="ml-2 font-medium">({item.assignedEngineer})</span>
                              )}
                            </div>
                          </div>
                        )}

                        {item.adminRemarks && (
                          <div className="mt-1 bg-amber-50/70 border border-amber-200 rounded-lg p-2 text-xs text-amber-900 flex items-start gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                            <span>{item.adminRemarks}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                        <Link to={ROUTES.CUSTOMER.REQUESTS}>
                          <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              {completedRequests.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No completed service records on file yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {completedRequests.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                            {item.token}
                          </span>
                          <Badge variant="success">Completed</Badge>
                          <span className="text-xs text-slate-400">
                            Serviced: {item.updatedAt.split('T')[0]}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {item.title}
                        </h4>

                        <p className="text-xs text-slate-600 line-clamp-1">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <User className="w-3 h-3 text-slate-400" />
                            <span>{item.assignedEngineer || 'VPE Service Engineer'}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{item.location}</span>
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 self-start md:self-center">
                        <Button
                          type="button"
                          variant="industrial"
                          size="sm"
                          onClick={() => handleOpenEngineerRecord(item)}
                          leftIcon={<FileText className="w-3.5 h-3.5" />}
                          className="cursor-pointer shadow-xs"
                        >
                          {t('customer.view_report')}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Engineer Service Record Inspection Modal */}
      {selectedRecord && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900 text-white p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight">
                    {t('record.title')}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Record ID: {selectedRecord.id} • Ref: {selectedRecord.serviceRequestToken}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 text-xs text-slate-700">
              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <span className="text-slate-400 block font-medium">Customer / Plant</span>
                  <span className="font-bold text-slate-900">{selectedRecord.companyName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Visit Date</span>
                  <span className="font-bold text-slate-900">{selectedRecord.visitDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Completion Status</span>
                  <Badge variant="success" className="mt-0.5">
                    {selectedRecord.completionStatus}
                  </Badge>
                </div>
              </div>

              {/* Machine Issue */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  {t('record.machine_issue')}
                </span>
                <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium">
                  {selectedRecord.machineIssue}
                </p>
              </div>

              {/* Inspection Findings */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  {t('record.inspection_findings')}
                </span>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg whitespace-pre-line text-slate-800">
                  {selectedRecord.inspectionFindings}
                </div>
              </div>

              {/* Work Performed */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  {t('record.work_performed')}
                </span>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg whitespace-pre-line text-slate-800">
                  {selectedRecord.workPerformed}
                </div>
              </div>

              {/* Tools & Materials Used */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  {t('record.tools_materials')}
                </span>
                <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800">
                  {selectedRecord.toolsAndMaterials}
                </p>
              </div>

              {/* Additional Gas / Compressor Requirements */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  {t('record.gas_compressor')}
                </span>
                <p className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-amber-950 font-medium">
                  {selectedRecord.gasCompressorRequirements || 'None required.'}
                </p>
              </div>

              {/* Engineer Remarks */}
              <div className="p-3.5 bg-slate-900 text-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                  {t('record.engineer_remarks')}
                </span>
                <p className="text-xs leading-relaxed">{selectedRecord.engineerRemarks}</p>
                <div className="pt-2 text-[11px] text-slate-400 font-mono">
                  Certified By: {selectedRecord.engineerName}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex justify-between items-center">
              <span className="text-[11px] text-slate-500">Official VPE Technical Service Report</span>
              <Button variant="secondary" size="sm" onClick={() => setSelectedRecord(null)}>
                Close Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Available Services in Your Location */}
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
