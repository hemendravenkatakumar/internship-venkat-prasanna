import React, { useState, useEffect, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { Card, CardHeader, CardContent, Button, Badge } from '@/components/common';
import { authService, UserProfile } from '@/services/authService';
import { complaintsService, ComplaintRecord, ComplaintStatus } from '@/services/complaintsService';
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
  Activity,
  Search,
  Volume2,
  Check,
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
  const [trackedIssueId, setTrackedIssueId] = useState<string>('');
  const [trackSearchQuery, setTrackSearchQuery] = useState<string>('');
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

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

  // Determine tracked issue (defaults to active request or first available request)
  const trackedComplaint =
    complaints.find(
      (c) =>
        c.id === trackedIssueId ||
        (trackSearchQuery.trim() &&
          c.token.toLowerCase() === trackSearchQuery.trim().toLowerCase())
    ) ||
    complaints.find((c) => c.id === trackedIssueId) ||
    activeRequests[0] ||
    complaints[0] ||
    null;

  const handleTrackIssue = (complaintId: string) => {
    setTrackedIssueId(complaintId);
    const element = document.getElementById('issue-tracker-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getTrackingStage = (status: ComplaintStatus): number => {
    switch (status) {
      case 'Submitted':
        return 1;
      case 'Under Review':
        return 2;
      case 'Scheduled':
        return 3;
      case 'In Progress':
        return 4;
      case 'Completed':
      case 'Resolved':
        return 5;
      default:
        return 1;
    }
  };

  const getStatusBadgeVariant = (
    status: ComplaintStatus
  ): 'default' | 'amber' | 'success' | 'danger' | 'info' => {
    switch (status) {
      case 'Completed':
      case 'Resolved':
        return 'success';
      case 'Scheduled':
        return 'info';
      case 'In Progress':
        return 'amber';
      case 'Under Review':
        return 'info';
      default:
        return 'default';
    }
  };

  const trackingSteps = [
    {
      step: 1,
      label: t('customer.tracking_step_1'),
      desc: 'Issue registered in VPE dispatch queue',
    },
    {
      step: 2,
      label: t('customer.tracking_step_2'),
      desc: 'Engineering triage & spare parts preparation',
    },
    {
      step: 3,
      label: t('customer.tracking_step_3'),
      desc: 'Visit date confirmed & specialist assigned',
    },
    {
      step: 4,
      label: t('customer.tracking_step_4'),
      desc: 'On-site technical overhaul & component testing',
    },
    {
      step: 5,
      label: t('customer.tracking_step_5'),
      desc: 'Certified Engineer Service Record issued',
    },
  ];

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

      {/* ============================================================ */}
      {/* LIVE MACHINE ISSUE TRACKER SECTION */}
      {/* ============================================================ */}
      <div id="issue-tracker-section" className="scroll-mt-6">
        <div className="border border-slate-800 bg-slate-900 text-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Live Issue Tracking System
                </span>
                <span className="text-xs text-slate-600">|</span>
                <span className="text-xs text-slate-300 font-mono">
                  {trackedComplaint ? trackedComplaint.token : 'No Issue Selected'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                <span>{t('customer.tracker_title')}</span>
              </h2>
              <p className="text-xs text-slate-400">
                {t('customer.tracker_subtitle')}
              </p>
            </div>

            {/* Quick Selector Dropdown & Search */}
            {complaints.length > 0 && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative min-w-[240px]">
                  <select
                    value={trackedComplaint ? trackedComplaint.id : ''}
                    onChange={(e) => setTrackedIssueId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 pr-8 focus:outline-hidden focus:border-amber-400 cursor-pointer appearance-none"
                  >
                    {complaints.map((c) => (
                      <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                        {c.token} - {c.title.slice(0, 30)} ({c.status})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={trackSearchQuery}
                    onChange={(e) => {
                      setTrackSearchQuery(e.target.value);
                      const found = complaints.find((c) =>
                        c.token.toLowerCase().includes(e.target.value.trim().toLowerCase())
                      );
                      if (found) {
                        setTrackedIssueId(found.id);
                      }
                    }}
                    placeholder={t('customer.track_by_token')}
                    className="bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs rounded-lg px-3 py-2 focus:outline-hidden focus:border-amber-400 font-mono w-full sm:w-48"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Content Body */}
          {complaints.length === 0 ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">No active machine issues reported</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                When you experience machine trouble, submit a service request to track technical triage, scheduling, on-site repairs, and certification in real time.
              </p>
              <div className="pt-2">
                <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                  <Button variant="industrial" size="sm" leftIcon={<FilePlus className="w-4 h-4" />}>
                    Submit Service Request
                  </Button>
                </Link>
              </div>
            </div>
          ) : trackedComplaint ? (
            <div className="p-5 sm:p-6 space-y-6">
              {/* Selected Issue Meta Card */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded shadow-xs">
                      {trackedComplaint.token}
                    </span>
                    <Badge variant={getStatusBadgeVariant(trackedComplaint.status)}>
                      {trackedComplaint.status}
                    </Badge>
                    <span className="text-xs text-slate-400">
                      Problem Started: <strong className="text-slate-200">{trackedComplaint.problemStartDate || trackedComplaint.createdAt.split('T')[0]}</strong>
                    </span>
                    <span className="text-xs text-slate-600">•</span>
                    <span className="text-xs text-slate-400">
                      Facility: <strong className="text-slate-200">{trackedComplaint.location}</strong>
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-white">
                    {trackedComplaint.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {trackedComplaint.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {trackedComplaint.status === 'Completed' || trackedComplaint.status === 'Resolved' ? (
                    <Button
                      type="button"
                      variant="industrial"
                      size="sm"
                      onClick={() => handleOpenEngineerRecord(trackedComplaint)}
                      leftIcon={<FileText className="w-4 h-4" />}
                    >
                      {t('customer.view_report')}
                    </Button>
                  ) : (
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block font-medium">Estimated Visit</span>
                      <span className="text-xs font-bold text-amber-400">
                        {trackedComplaint.scheduledDate ? trackedComplaint.scheduledDate : 'Pending Triage'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Visual 5-Stage Milestone Progress Stepper */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Service Lifecycle Progress
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {getTrackingStage(trackedComplaint.status) * 20}% Complete
                    </span>
                    <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 transition-all duration-500"
                        style={{ width: `${getTrackingStage(trackedComplaint.status) * 20}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Stepper Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                  {trackingSteps.map((stepItem) => {
                    const currentStage = getTrackingStage(trackedComplaint.status);
                    const isDone = currentStage > stepItem.step || (currentStage === 5 && stepItem.step === 5);
                    const isCurrent = currentStage === stepItem.step;

                    return (
                      <div
                        key={stepItem.step}
                        className={`p-3.5 rounded-xl border transition-all ${
                          isDone
                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                            : isCurrent
                            ? 'bg-amber-950/40 border-amber-400 shadow-md text-amber-300 ring-1 ring-amber-400/50'
                            : 'bg-slate-900/40 border-slate-800 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                              isDone
                                ? 'bg-emerald-500 text-slate-950'
                                : isCurrent
                                ? 'bg-amber-400 text-slate-950'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stepItem.step}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded">
                              Current
                            </span>
                          )}
                          {isDone && (
                            <span className="text-[10px] font-mono font-bold text-emerald-400">
                              Completed
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-bold leading-tight">
                          {stepItem.label}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                          {stepItem.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Intelligence Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Panel 1: Technician & Scheduling */}
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Scheduling & Dispatch</span>
                  </span>
                  <div>
                    <span className="text-slate-400 block text-[11px]">On-Site Visit Date</span>
                    <span className="font-bold text-white text-sm">
                      {trackedComplaint.scheduledDate || 'To be confirmed by VPE admin'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Assigned Specialist</span>
                    <span className="font-bold text-amber-300 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      <span>{trackedComplaint.assignedEngineer || 'VPE Technical Team'}</span>
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Emergency Hotline: +91 800-000-0000</span>
                  </div>
                </div>

                {/* Panel 2: Operational Remarks & Diagnostics */}
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-amber-400" />
                    <span>Diagnostic & Engineering Remarks</span>
                  </span>
                  <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300 leading-relaxed min-h-[64px]">
                    {trackedComplaint.adminRemarks ||
                      'Issue registered in high-priority industrial queue. Technical team reviewing machinery symptoms.'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Category: <strong className="text-slate-200">{trackedComplaint.category}</strong>
                  </div>
                </div>

                {/* Panel 3: Voice Recording & Attachments */}
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Audio & Evidence Attached</span>
                  </span>

                  {trackedComplaint.voiceRecording ? (
                    <div className="space-y-1.5">
                      <span className="text-[11px] text-slate-400 block">Machine Fault Audio Recording:</span>
                      <audio
                        controls
                        src={trackedComplaint.voiceRecording}
                        className="w-full h-8 rounded"
                      />
                      <span className="text-[10px] text-emerald-400 block font-mono">
                        ✓ Raw industrial audio stored (No speech-to-text)
                      </span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 italic py-1">
                      No voice recording attached to this ticket.
                    </div>
                  )}

                  {trackedComplaint.images && trackedComplaint.images.length > 0 && (
                    <div className="pt-2 border-t border-slate-700/60 space-y-1.5">
                      <span className="text-[11px] text-slate-400 block">Inspection Photos ({trackedComplaint.images.length}):</span>
                      <div className="flex items-center gap-2 overflow-x-auto">
                        {trackedComplaint.images.map((img, idx) => (
                          <div
                            key={idx}
                            onClick={() => setEnlargedImage(img)}
                            className="w-12 h-12 rounded-lg border border-slate-700 overflow-hidden shrink-0 cursor-pointer hover:border-amber-400"
                          >
                            <img src={img} alt="Attachment" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
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

                      <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-center">
                        <Button
                          type="button"
                          variant="industrial"
                          size="sm"
                          onClick={() => handleTrackIssue(item.id)}
                          leftIcon={<Activity className="w-3.5 h-3.5" />}
                        >
                          {t('customer.track_issue')}
                        </Button>
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

                      <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-center">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleTrackIssue(item.id)}
                          leftIcon={<Activity className="w-3.5 h-3.5 text-amber-600" />}
                        >
                          {t('customer.track_issue')}
                        </Button>
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

      {/* Lightbox for Zoomed Image */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img src={enlargedImage} alt="Enlarged" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
            <button
              type="button"
              onClick={() => setEnlargedImage(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-950 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
