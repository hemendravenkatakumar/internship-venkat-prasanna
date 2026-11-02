import React, { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Card,
  Button,
  Badge,
  Input,
  Select,
  Textarea,
  FormField,
  LanguageSelector,
} from '@/components/common';
import { authService, StoredUserAccount } from '@/services/authService';
import {
  complaintsService,
  ComplaintRecord,
  ComplaintStatus,
  ComplaintStats,
} from '@/services/complaintsService';
import {
  servicesService,
  ServiceRecord,
  NewServicePayload,
} from '@/services/servicesService';
import {
  engineerRecordsService,
  EngineerServiceRecord,
  NewEngineerRecordPayload,
} from '@/services/engineerRecordsService';
import {
  reviewsService,
  CustomerReview,
  ReviewStatus,
} from '@/services/reviewsService';
import {
  industriesService,
  IndustryRecord,
} from '@/services/industriesService';
import {
  vendorRegistrationsService,
  VendorRegistrationRecord,
  VendorStatus,
} from '@/services/vendorRegistrationsService';
import {
  notificationsService,
  NotificationItem,
} from '@/services/notificationsService';
import { useLanguage } from '@/context/LanguageContext';
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  ClipboardCheck,
  Wrench,
  Factory,
  Truck,
  Star,
  Bell,
  BarChart3,
  Settings,
  Plus,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  X,
  Volume2,
  Edit,
  Download,
  Eye,
  Check,
} from 'lucide-react';

export type AdminModuleTab =
  | 'dashboard'
  | 'customers'
  | 'requests'
  | 'scheduling'
  | 'records'
  | 'services'
  | 'industries'
  | 'vendors'
  | 'reviews'
  | 'notifications'
  | 'reports'
  | 'settings';

export const AdminDashboardPage: React.FC = () => {
  const { t } = useLanguage();

  // Authentication check: Must be an authenticated administrator
  const authUser = authService.getCurrentUser();

  const [activeTab, setActiveTab] = useState<AdminModuleTab>('dashboard');

  // Core Service Data States
  const [complaints, setComplaints] = useState<ComplaintRecord[]>(() => complaintsService.getComplaints());
  const [stats, setStats] = useState<ComplaintStats>(() => complaintsService.getStats());
  const [services, setServices] = useState<ServiceRecord[]>(() => servicesService.getAllServices());
  const [engineerRecords, setEngineerRecords] = useState<EngineerServiceRecord[]>(() =>
    engineerRecordsService.getAllRecords()
  );
  const [reviews, setReviews] = useState<CustomerReview[]>(() => reviewsService.getAllReviews());
  const [industries, setIndustries] = useState<IndustryRecord[]>(() => industriesService.getIndustries());
  const [vendors, setVendors] = useState<VendorRegistrationRecord[]>(() =>
    vendorRegistrationsService.getVendors()
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    notificationsService.getNotifications('admin')
  );
  const [accounts, setAccounts] = useState<StoredUserAccount[]>(() => authService.getAccounts());
  const [lastRefreshed, setLastRefreshed] = useState<string>(() => new Date().toLocaleTimeString());

  // Search & Filter States
  const [requestSearch, setRequestSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | ComplaintStatus>('All');
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [customerSearch, setCustomerSearch] = useState('');

  // Modals
  const [inspectedRequest, setInspectedRequest] = useState<ComplaintRecord | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [inspectedRecord, setInspectedRecord] = useState<EngineerServiceRecord | null>(null);

  // Status & Remark Editing State
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('Submitted');
  const [adminRemarks, setAdminRemarks] = useState('');

  // Scheduling Modal State
  const [schedulingRequest, setSchedulingRequest] = useState<ComplaintRecord | null>(null);
  const [scheduleDate, setScheduleDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [scheduleEngineer, setScheduleEngineer] = useState('K. Srinivas (Lead Automation & Sortex Specialist)');
  const [scheduleNotes, setScheduleNotes] = useState('');

  // New Engineer Record Modal State
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [newRecordPayload, setNewRecordPayload] = useState<NewEngineerRecordPayload>({
    serviceRequestId: '',
    serviceRequestToken: '',
    customerName: '',
    companyName: '',
    industryType: 'Rice Milling & Grain Processing',
    machineIssue: '',
    visitDate: new Date().toISOString().split('T')[0],
    inspectionFindings: '',
    workPerformed: '',
    toolsAndMaterials: '',
    gasCompressorRequirements: '',
    engineerName: 'K. Srinivas (Lead Automation & Sortex Specialist)',
    engineerRemarks: '',
    completionStatus: 'Fully Operational',
  });

  // Services Management State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceRecord | null>(null);
  const [serviceFormData, setServiceFormData] = useState<NewServicePayload>({
    name: '',
    company: 'VPE Core Operations',
    locations: ['Tadepalligudem', 'All Locations'],
    description: '',
    contactInfo: '+91 800-000-0000',
    status: 'active',
    baseCharge: '₹2,500',
    hourlyRate: '₹600/hr',
    emergencySurcharge: '₹1,000',
    estimatedDuration: '2 - 3 Hours',
  });
  const [locationsInput, setLocationsInput] = useState('Tadepalligudem, AP');

  // Industries Management State
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false);
  const [industryFormData, setIndustryFormData] = useState({
    name: '',
    description: '',
    primaryMachinery: 'Sortex Optical Sorter, Grain Pre-cleaner',
    keyChallenges: 'Dust ingress, sensor blindness',
    standardSLA: '2 to 4 Hours Response',
    status: 'active' as const,
  });

  // Settings State
  const [emergencyPhone, setEmergencyPhone] = useState('+91 800-000-0000');
  const [dispatchEmail, setDispatchEmail] = useState('dispatch@vpe.com');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Load Authoritative Persistent Data
  const loadAuthoritativeData = useCallback(() => {
    setComplaints(complaintsService.getComplaints());
    setStats(complaintsService.getStats());
    setServices(servicesService.getAllServices());
    setEngineerRecords(engineerRecordsService.getAllRecords());
    setReviews(reviewsService.getAllReviews());
    setIndustries(industriesService.getIndustries());
    setVendors(vendorRegistrationsService.getVendors());
    setNotifications(notificationsService.getNotifications('admin'));
    setAccounts(authService.getAccounts());
    setLastRefreshed(new Date().toLocaleTimeString());
  }, []);

  useEffect(() => {
    const interval = setInterval(loadAuthoritativeData, 3500);
    return () => clearInterval(interval);
  }, [loadAuthoritativeData]);

  if (!authUser || authUser.role !== 'admin') {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  // Filtered requests
  const filteredRequests = complaints.filter((c) => {
    const query = requestSearch.toLowerCase();
    const matchesSearch =
      c.token.toLowerCase().includes(query) ||
      c.title.toLowerCase().includes(query) ||
      c.companyName.toLowerCase().includes(query) ||
      c.contactPerson.toLowerCase().includes(query) ||
      c.location.toLowerCase().includes(query);
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesIndustry = industryFilter === 'All' || c.industryType === industryFilter;
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  // Filtered customers
  const customerAccounts = accounts.filter((a) => a.role === 'user');
  const filteredCustomers = customerAccounts.filter((c) => {
    const q = customerSearch.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q)
    );
  });

  // Count unread notifications
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;
  const pendingReviewsCount = reviews.filter((r) => r.status === 'Pending').length;
  const unscheduledRequestsCount = complaints.filter(
    (c) => c.status === 'Submitted' || c.status === 'Under Review'
  ).length;

  // Handle scheduling submission
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulingRequest) return;
    complaintsService.scheduleService(
      schedulingRequest.id,
      scheduleDate,
      scheduleEngineer,
      scheduleNotes,
      'Owner & Admin'
    );
    loadAuthoritativeData();
    setSchedulingRequest(null);
  };

  // Handle status update
  const handleStatusUpdate = () => {
    if (!inspectedRequest) return;
    complaintsService.updateComplaintStatus(
      inspectedRequest.id,
      newStatus,
      adminRemarks,
      'Owner & Admin'
    );
    loadAuthoritativeData();
    setInspectedRequest(null);
  };

  // Handle new engineer service record submission
  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const created = engineerRecordsService.createRecord(newRecordPayload);
    // Mark related request as completed
    if (newRecordPayload.serviceRequestId) {
      complaintsService.updateComplaintStatus(
        newRecordPayload.serviceRequestId,
        'Completed',
        `Engineer service record ${created.id} executed and certified.`,
        newRecordPayload.engineerName,
        created.id
      );
    }
    loadAuthoritativeData();
    setIsAddRecordOpen(false);
  };

  // Handle review approval / rejection
  const handleReviewAction = (id: string, status: ReviewStatus) => {
    reviewsService.updateReviewStatus(id, status, 'Owner & Admin');
    loadAuthoritativeData();
  };

  // Handle vendor status update
  const handleVendorAction = (id: string, status: VendorStatus) => {
    vendorRegistrationsService.updateStatus(id, status);
    loadAuthoritativeData();
  };

  // Handle service add / edit submit
  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanLocs = locationsInput.split(',').map((l) => l.trim()).filter(Boolean);
    const payload = {
      ...serviceFormData,
      locations: cleanLocs.length > 0 ? cleanLocs : ['All Locations'],
    };

    if (editingService) {
      servicesService.updateService(editingService.id, payload);
    } else {
      servicesService.addService(payload);
    }
    loadAuthoritativeData();
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  // Handle industry add submit
  const handleIndustrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    industriesService.addIndustry({
      name: industryFormData.name,
      description: industryFormData.description,
      primaryMachinery: industryFormData.primaryMachinery.split(',').map((m) => m.trim()).filter(Boolean),
      keyChallenges: industryFormData.keyChallenges.split(',').map((k) => k.trim()).filter(Boolean),
      standardSLA: industryFormData.standardSLA,
      status: industryFormData.status,
    });
    loadAuthoritativeData();
    setIsIndustryModalOpen(false);
    setIndustryFormData({
      name: '',
      description: '',
      primaryMachinery: 'Sortex Optical Sorter, Grain Pre-cleaner',
      keyChallenges: 'Dust ingress, sensor blindness',
      standardSLA: '2 to 4 Hours Response',
      status: 'active',
    });
  };

  // Handle export reports
  const handleExportCSV = () => {
    const headers = ['Token', 'Company', 'Contact', 'Category', 'Status', 'Visit Date', 'Engineer', 'Created'];
    const rows = complaints.map((c) => [
      c.token,
      `"${c.companyName}"`,
      `"${c.contactPerson}"`,
      `"${c.category}"`,
      c.status,
      c.scheduledDate || 'Not Scheduled',
      `"${c.assignedEngineer || 'Unassigned'}"`,
      c.createdAt.split('T')[0],
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VPE_Service_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Single Unified Role Indicator & Refresh Control */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              {t('admin.unified_role')}
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-300">HQ: Tadepalligudem, AP</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <Wrench className="w-6 h-6 text-amber-400" />
            <span>{t('admin.portal_name')}</span>
          </h1>
          <p className="text-xs text-slate-400">
            Real-time control over requests, customer accounts, technician scheduling, service records, and statutory compliance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
          <span className="text-[11px] font-mono text-slate-400">
            Updated: {lastRefreshed}
          </span>
          <button
            type="button"
            onClick={loadAuthoritativeData}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title="Refresh database records"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Container with Industrial Module Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Navigation Tabs Bar */}
        <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-2.5 overflow-x-auto scrollbar-thin">
          <div className="flex items-center gap-1.5 min-w-max">
            {[
              { id: 'dashboard', label: t('admin.tab_dashboard'), icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'customers', label: t('admin.tab_customers'), icon: <Users className="w-4 h-4" /> },
              {
                id: 'requests',
                label: t('admin.tab_requests'),
                icon: <FileText className="w-4 h-4" />,
                badge: complaints.filter((c) => c.status === 'Submitted').length,
              },
              {
                id: 'scheduling',
                label: t('admin.tab_scheduling'),
                icon: <Calendar className="w-4 h-4" />,
                badge: unscheduledRequestsCount,
              },
              { id: 'records', label: t('admin.tab_records'), icon: <ClipboardCheck className="w-4 h-4" /> },
              { id: 'services', label: t('admin.tab_services'), icon: <Wrench className="w-4 h-4" /> },
              { id: 'industries', label: t('admin.tab_industries'), icon: <Factory className="w-4 h-4" /> },
              { id: 'vendors', label: t('admin.tab_vendors'), icon: <Truck className="w-4 h-4" /> },
              {
                id: 'reviews',
                label: t('admin.tab_reviews'),
                icon: <Star className="w-4 h-4" />,
                badge: pendingReviewsCount,
              },
              {
                id: 'notifications',
                label: t('admin.tab_notifications'),
                icon: <Bell className="w-4 h-4" />,
                badge: unreadNotifsCount,
              },
              { id: 'reports', label: t('admin.tab_reports'), icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'settings', label: t('admin.tab_settings'), icon: <Settings className="w-4 h-4" /> },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as AdminModuleTab)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-amber-400 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {Boolean(tab.badge && tab.badge > 0) && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-amber-400 text-slate-950 font-black' : 'bg-red-500 text-white'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* MODULE CONTENT */}
        <div className="p-6">
          {/* ============================================================ */}
          {/* 1. DASHBOARD MODULE */}
          {/* ============================================================ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card variant="default" className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Total Requests
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-3xl font-black text-slate-900">{stats.total}</span>
                    <p className="text-[11px] text-slate-500 mt-1">Total registered tickets</p>
                  </div>
                </Card>

                <Card variant="default" className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Pending Requests
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-3xl font-black text-amber-700">
                      {stats.submitted + stats.underReview}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">Awaiting triage/dispatch</p>
                  </div>
                </Card>

                <Card variant="industrial" className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      Scheduled Visits
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-3xl font-black text-blue-800">{stats.scheduled}</span>
                    <p className="text-[11px] text-slate-500 mt-1">Confirmed on-site dates</p>
                  </div>
                </Card>

                <Card variant="default" className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Completed Services
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-3xl font-black text-emerald-700">{stats.completed}</span>
                    <p className="text-[11px] text-slate-500 mt-1">Formally signed off</p>
                  </div>
                </Card>
              </div>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button
                  variant="industrial"
                  size="sm"
                  onClick={() => setActiveTab('scheduling')}
                  leftIcon={<Calendar className="w-4 h-4" />}
                  className="justify-center"
                >
                  Schedule Visits ({unscheduledRequestsCount})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsAddRecordOpen(true);
                  }}
                  leftIcon={<ClipboardCheck className="w-4 h-4 text-emerald-600" />}
                  className="justify-center"
                >
                  + New Service Record
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingService(null);
                    setIsServiceModalOpen(true);
                  }}
                  leftIcon={<Wrench className="w-4 h-4 text-amber-600" />}
                  className="justify-center"
                >
                  + Add Service / Rate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportCSV}
                  leftIcon={<Download className="w-4 h-4 text-slate-600" />}
                  className="justify-center"
                >
                  Export Activity CSV
                </Button>
              </div>

              {/* Recent Breakdown Activity Feed */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Recent Service Requests</h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('requests')}
                    className="text-xs text-amber-800 font-bold hover:underline"
                  >
                    View All ({complaints.length})
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {complaints.slice(0, 5).map((req) => (
                    <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded border">
                            {req.token}
                          </span>
                          <Badge
                            variant={
                              req.status === 'Completed'
                                ? 'success'
                                : req.status === 'Scheduled'
                                ? 'info'
                                : req.status === 'In Progress'
                                ? 'amber'
                                : 'default'
                            }
                          >
                            {req.status}
                          </Badge>
                          <span className="text-slate-400">{req.createdAt.split('T')[0]}</span>
                        </div>
                        <p className="font-bold text-slate-900">{req.title}</p>
                        <p className="text-slate-500 font-medium">{req.companyName} ({req.contactPerson})</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {req.voiceRecording && (
                          <span className="flex items-center gap-1 text-[11px] text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200 font-medium">
                            <Volume2 className="w-3.5 h-3.5" /> Audio Note
                          </span>
                        )}
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setInspectedRequest(req);
                            setNewStatus(req.status);
                            setAdminRemarks(req.adminRemarks || '');
                          }}
                          leftIcon={<Eye className="w-3.5 h-3.5" />}
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 2. CUSTOMERS MODULE */}
          {/* ============================================================ */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Registered Plant & Facility Customers</h3>
                  <p className="text-xs text-slate-500">
                    Manage client profiles, plants, and their lifetime breakdown requests.
                  </p>
                </div>
                <div className="w-full sm:w-72">
                  <Input
                    placeholder="Search by company, contact, or location..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    leftIcon={<Search className="w-4 h-4 text-slate-400" />}
                  />
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Company / Plant</th>
                      <th className="p-3.5">Contact Person</th>
                      <th className="p-3.5">Industry Sector</th>
                      <th className="p-3.5">Phone & Email</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">Total Calls</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCustomers.map((cust) => {
                      const userComplaints = complaints.filter((c) => c.userId === cust.id);
                      return (
                        <tr key={cust.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-3.5 font-bold text-slate-900">{cust.company}</td>
                          <td className="p-3.5 font-medium text-slate-800">{cust.name}</td>
                          <td className="p-3.5">
                            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                              {cust.industry || 'Industrial'}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono text-slate-600">
                            <div>{cust.phone}</div>
                            <div className="text-[10px] text-slate-400">{cust.email}</div>
                          </td>
                          <td className="p-3.5 text-slate-600">{cust.location}</td>
                          <td className="p-3.5">
                            <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                              {userComplaints.length} Requests
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setRequestSearch(cust.name);
                                setActiveTab('requests');
                              }}
                            >
                              View Tickets
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 3. SERVICE REQUESTS MODULE */}
          {/* ============================================================ */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              {/* Search & Filter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <Input
                    placeholder="Search requests by token, company, machine issue..."
                    value={requestSearch}
                    onChange={(e) => setRequestSearch(e.target.value)}
                    leftIcon={<Search className="w-4 h-4 text-slate-400" />}
                  />
                </div>
                <div>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Select>
                </div>
                <div>
                  <Select
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                  >
                    <option value="All">All Industries</option>
                    <option value="Rice Milling & Grain Processing">Rice Milling & Grain</option>
                    <option value="Cold Storage & Refrigeration Plants">Cold Storage</option>
                    <option value="Biomass & Co-Generation Power">Biomass Power</option>
                    <option value="Agro-Industrial Processing">Agro-Industrial</option>
                  </Select>
                </div>
              </div>

              {/* Requests Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">ID / Token</th>
                      <th className="p-3.5">Customer & Plant</th>
                      <th className="p-3.5">Machine Issue</th>
                      <th className="p-3.5">Start Date</th>
                      <th className="p-3.5">Scheduled Visit</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-slate-900">{req.token}</td>
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900">{req.companyName}</div>
                          <div className="text-[11px] text-slate-500">{req.contactPerson} ({req.userPhone})</div>
                        </td>
                        <td className="p-3.5 max-w-xs truncate font-medium text-slate-800" title={req.description}>
                          {req.title}
                        </td>
                        <td className="p-3.5 text-slate-600">{req.problemStartDate}</td>
                        <td className="p-3.5 text-slate-600">
                          {req.scheduledDate ? (
                            <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                              {req.scheduledDate}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">Not set</span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <Badge
                            variant={
                              req.status === 'Completed'
                                ? 'success'
                                : req.status === 'Scheduled'
                                ? 'info'
                                : req.status === 'In Progress'
                                ? 'amber'
                                : 'default'
                            }
                          >
                            {req.status}
                          </Badge>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <Button
                            type="button"
                            variant="industrial"
                            size="sm"
                            onClick={() => {
                              setInspectedRequest(req);
                              setNewStatus(req.status);
                              setAdminRemarks(req.adminRemarks || '');
                            }}
                            leftIcon={<Eye className="w-3.5 h-3.5" />}
                          >
                            Inspect
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 4. SCHEDULING MODULE */}
          {/* ============================================================ */}
          {activeTab === 'scheduling' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Field Service Visit Scheduling</h3>
                  <p className="text-xs text-slate-500">
                    Assign certified field engineers and lock on-site inspection/repair visit dates.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-amber-50 text-amber-900 px-3 py-1.5 rounded-lg border border-amber-200">
                  {unscheduledRequestsCount} Unscheduled Tickets
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Token</th>
                      <th className="p-3.5">Customer / Plant</th>
                      <th className="p-3.5">Machine Problem</th>
                      <th className="p-3.5">Reported Start Date</th>
                      <th className="p-3.5">Current Schedule</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {complaints.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-slate-900">{item.token}</td>
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900">{item.companyName}</div>
                          <div className="text-[11px] text-slate-500">{item.location}</div>
                        </td>
                        <td className="p-3.5 font-medium text-slate-800">{item.title}</td>
                        <td className="p-3.5 text-slate-600">{item.problemStartDate}</td>
                        <td className="p-3.5">
                          {item.scheduledDate ? (
                            <div>
                              <span className="font-bold text-blue-700">{item.scheduledDate}</span>
                              <div className="text-[10px] text-slate-500">{item.assignedEngineer}</div>
                            </div>
                          ) : (
                            <Badge variant="amber">Needs Date</Badge>
                          )}
                        </td>
                        <td className="p-3.5 text-right">
                          <Button
                            type="button"
                            variant="industrial"
                            size="sm"
                            onClick={() => {
                              setSchedulingRequest(item);
                              if (item.scheduledDate) setScheduleDate(item.scheduledDate);
                              if (item.assignedEngineer) setScheduleEngineer(item.assignedEngineer);
                            }}
                            leftIcon={<Calendar className="w-3.5 h-3.5" />}
                          >
                            Set Visit Date
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 5. SERVICE RECORDS (ENGINEER RECORDS) MODULE */}
          {/* ============================================================ */}
          {activeTab === 'records' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{t('record.title')}</h3>
                  <p className="text-xs text-slate-500">
                    {t('record.subtitle')}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="industrial"
                  size="sm"
                  onClick={() => setIsAddRecordOpen(true)}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  {t('record.create_btn')}
                </Button>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Record ID</th>
                      <th className="p-3.5">Ref Token</th>
                      <th className="p-3.5">Customer / Company</th>
                      <th className="p-3.5">Machine Issue</th>
                      <th className="p-3.5">Visit Date</th>
                      <th className="p-3.5">Engineer</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {engineerRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-slate-900">{rec.id}</td>
                        <td className="p-3.5 font-mono text-slate-600">{rec.serviceRequestToken}</td>
                        <td className="p-3.5 font-bold text-slate-900">{rec.companyName}</td>
                        <td className="p-3.5 max-w-xs truncate font-medium text-slate-800">{rec.machineIssue}</td>
                        <td className="p-3.5 text-slate-600">{rec.visitDate}</td>
                        <td className="p-3.5 text-slate-700 font-medium">{rec.engineerName}</td>
                        <td className="p-3.5">
                          <Badge variant="success">{rec.completionStatus}</Badge>
                        </td>
                        <td className="p-3.5 text-right">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => setInspectedRecord(rec)}
                            leftIcon={<FileText className="w-3.5 h-3.5" />}
                          >
                            View Report
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 6. SERVICES & CHARGES MODULE */}
          {/* ============================================================ */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Manage Industrial Services & Charges</h3>
                  <p className="text-xs text-slate-500">
                    Configure service descriptions, diagnostic rates, hourly billing, and emergency surcharges.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="industrial"
                  size="sm"
                  onClick={() => {
                    setEditingService(null);
                    setServiceFormData({
                      name: '',
                      company: 'VPE Industrial Division',
                      locations: ['Tadepalligudem', 'All Locations'],
                      description: '',
                      contactInfo: '+91 800-000-0000',
                      status: 'active',
                      baseCharge: '₹2,500',
                      hourlyRate: '₹600/hr',
                      emergencySurcharge: '₹1,000',
                      estimatedDuration: '2 - 3 Hours',
                    });
                    setLocationsInput('Tadepalligudem, AP');
                    setIsServiceModalOpen(true);
                  }}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Add New Service
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((srv) => (
                  <Card key={srv.id} variant="default" className="p-5 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                          {srv.id.toUpperCase()}
                        </span>
                        <Badge variant={srv.status === 'active' ? 'success' : 'default'}>
                          {srv.status}
                        </Badge>
                      </div>

                      <h4 className="text-base font-bold text-slate-900">{srv.name}</h4>
                      <p className="text-xs text-slate-600">{srv.description}</p>

                      {/* Charges Breakdown */}
                      <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-center text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Base Charge</span>
                          <span className="font-bold text-slate-900">{srv.baseCharge || '₹2,500'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Hourly Rate</span>
                          <span className="font-bold text-slate-900">{srv.hourlyRate || '₹600/hr'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Emergency Fee</span>
                          <span className="font-bold text-amber-700">{srv.emergencySurcharge || '₹1,000'}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500">
                        <span className="font-medium text-slate-700">Locations: </span>
                        <span>{srv.locations.join(', ')}</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          servicesService.toggleServiceStatus(srv.id);
                          loadAuthoritativeData();
                        }}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        Toggle {srv.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingService(srv);
                          setServiceFormData({
                            name: srv.name,
                            company: srv.company,
                            locations: srv.locations,
                            description: srv.description,
                            contactInfo: srv.contactInfo,
                            status: srv.status,
                            baseCharge: srv.baseCharge,
                            hourlyRate: srv.hourlyRate,
                            emergencySurcharge: srv.emergencySurcharge,
                            estimatedDuration: srv.estimatedDuration,
                          });
                          setLocationsInput(srv.locations.join(', '));
                          setIsServiceModalOpen(true);
                        }}
                        leftIcon={<Edit className="w-3.5 h-3.5" />}
                      >
                        Edit Service & Rates
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 7. INDUSTRIES MODULE */}
          {/* ============================================================ */}
          {activeTab === 'industries' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Manage Industries & Machinery Profiles</h3>
                  <p className="text-xs text-slate-500">
                    Maintain industrial sector specializations, machinery catalogs, and SLA terms.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="industrial"
                  size="sm"
                  onClick={() => setIsIndustryModalOpen(true)}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Add Industry Sector
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industries.map((ind) => (
                  <Card key={ind.id} variant="default" className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {ind.id.toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                        {ind.activePlantsServiced} Active Plants Serviced
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{ind.name}</h4>
                    <p className="text-xs text-slate-600">{ind.description}</p>

                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-slate-700 block">Primary Machinery Handled:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {ind.primaryMachinery.map((m, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px]">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Standard SLA: <strong>{ind.standardSLA}</strong></span>
                      <Badge variant="success">Active Sector</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 8. VENDOR REGISTRATIONS MODULE */}
          {/* ============================================================ */}
          {activeTab === 'vendors' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Vendor & Contractor Registrations</h3>
                  <p className="text-xs text-slate-500">
                    Verify statutory registrations (GSTIN, MSME) and industrial sub-contractor applications.
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Vendor Name</th>
                      <th className="p-3.5">Category / Trade</th>
                      <th className="p-3.5">Contact Person</th>
                      <th className="p-3.5">GSTIN / MSME</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Approval Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {vendors.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">{v.vendorName}</td>
                        <td className="p-3.5 font-medium text-slate-700">{v.category}</td>
                        <td className="p-3.5">
                          <div className="font-medium text-slate-800">{v.contactPerson}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{v.phone}</div>
                        </td>
                        <td className="p-3.5 font-mono text-slate-600">
                          <div>{v.gstin || 'GST on file'}</div>
                          {v.msmeNumber && <div className="text-[10px] text-slate-400">{v.msmeNumber}</div>}
                        </td>
                        <td className="p-3.5 text-slate-600">{v.location}</td>
                        <td className="p-3.5">
                          <Badge variant={v.status === 'Approved' ? 'success' : v.status === 'Rejected' ? 'danger' : 'amber'}>
                            {v.status}
                          </Badge>
                        </td>
                        <td className="p-3.5 text-right space-x-1.5">
                          {v.status !== 'Approved' && (
                            <button
                              type="button"
                              onClick={() => handleVendorAction(v.id, 'Approved')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[11px] cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          {v.status !== 'Rejected' && (
                            <button
                              type="button"
                              onClick={() => handleVendorAction(v.id, 'Rejected')}
                              className="px-2.5 py-1 bg-slate-200 hover:bg-red-100 text-slate-700 hover:text-red-700 font-bold rounded text-[11px] cursor-pointer"
                            >
                              Reject
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 9. REVIEWS MODULE */}
          {/* ============================================================ */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Customer Review Moderation</h3>
                  <p className="text-xs text-slate-500">
                    Approve or reject customer reviews before public display on the official Reviews page.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <Card key={rev.id} variant="default" className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < rev.rating ? 'fill-current' : 'text-slate-200'}`}
                          />
                        ))}
                      </div>
                      <Badge variant={rev.status === 'Approved' ? 'success' : rev.status === 'Rejected' ? 'danger' : 'amber'}>
                        {rev.status}
                      </Badge>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">"{rev.title}"</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.feedback}</p>

                    <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
                      <div>
                        <strong>{rev.customerName}</strong> • {rev.companyName}
                      </div>
                      <span className="font-mono text-slate-400">{rev.serviceRecordId}</span>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <Button
                        type="button"
                        variant={rev.status === 'Approved' ? 'secondary' : 'industrial'}
                        size="sm"
                        onClick={() => handleReviewAction(rev.id, 'Approved')}
                        leftIcon={<Check className="w-3.5 h-3.5" />}
                        disabled={rev.status === 'Approved'}
                      >
                        {rev.status === 'Approved' ? 'Approved' : 'Approve Review'}
                      </Button>
                      {rev.status !== 'Rejected' && (
                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          onClick={() => handleReviewAction(rev.id, 'Rejected')}
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 10. NOTIFICATIONS MODULE */}
          {/* ============================================================ */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">System Notifications & Operational Alerts</h3>
                  <p className="text-xs text-slate-500">
                    Incoming service requests, emergency alerts, review submissions, and scheduling updates.
                  </p>
                </div>
                {unreadNotifsCount > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      notificationsService.markAllAsRead('admin');
                      loadAuthoritativeData();
                    }}
                  >
                    Mark All as Read
                  </Button>
                )}
              </div>

              <div className="border border-slate-200 rounded-xl divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 flex items-start justify-between gap-3 text-xs transition-colors ${
                      n.read ? 'bg-white' : 'bg-amber-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          n.type === 'new_service_request'
                            ? 'bg-red-100 text-red-700'
                            : n.type === 'new_review'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900">{n.title}</h4>
                          {!n.read && (
                            <span className="px-1.5 py-0.2 bg-red-500 text-white rounded text-[10px] font-bold">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                          {new Date(n.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {!n.read && (
                      <button
                        type="button"
                        onClick={() => {
                          notificationsService.markAsRead(n.id);
                          loadAuthoritativeData();
                        }}
                        className="text-[11px] font-bold text-slate-500 hover:text-slate-900 p-1 cursor-pointer"
                      >
                        Dismiss
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 11. REPORTS MODULE */}
          {/* ============================================================ */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Service Activity & Customer Reports</h3>
                  <p className="text-xs text-slate-500">
                    Comprehensive maintenance metrics, turnaround times, and CSV report export.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="industrial"
                  size="sm"
                  onClick={handleExportCSV}
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Download Full CSV Report
                </Button>
              </div>

              {/* Status Breakdown Progress Bars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="default" className="p-4 space-y-2">
                  <span className="text-xs font-bold uppercase text-slate-500">Resolution Rate</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-emerald-700">
                      {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                    </span>
                    <span className="text-xs text-slate-500">of requests completed</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </Card>

                <Card variant="default" className="p-4 space-y-2">
                  <span className="text-xs font-bold uppercase text-slate-500">Scheduled Dispatch</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-blue-700">
                      {stats.total > 0 ? Math.round((stats.scheduled / stats.total) * 100) : 0}%
                    </span>
                    <span className="text-xs text-slate-500">confirmed visit dates</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all"
                      style={{ width: `${stats.total > 0 ? (stats.scheduled / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </Card>

                <Card variant="default" className="p-4 space-y-2">
                  <span className="text-xs font-bold uppercase text-slate-500">Pending Triage</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-amber-600">
                      {stats.total > 0
                        ? Math.round(((stats.submitted + stats.underReview) / stats.total) * 100)
                        : 0}
                      %
                    </span>
                    <span className="text-xs text-slate-500">awaiting schedule</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all"
                      style={{
                        width: `${
                          stats.total > 0 ? ((stats.submitted + stats.underReview) / stats.total) * 100 : 0
                        }%`,
                      }}
                    />
                  </div>
                </Card>
              </div>

              {/* Service Activity Log Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Ticket</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Industry</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Visit Date</th>
                      <th className="p-3.5">Engineer Assigned</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {complaints.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-mono font-bold text-slate-900">{c.token}</td>
                        <td className="p-3.5 font-semibold text-slate-800">{c.companyName}</td>
                        <td className="p-3.5 text-slate-600">{c.industryType}</td>
                        <td className="p-3.5 text-slate-600">{c.category}</td>
                        <td className="p-3.5">
                          <Badge variant={c.status === 'Completed' ? 'success' : 'amber'}>
                            {c.status}
                          </Badge>
                        </td>
                        <td className="p-3.5 text-slate-600">{c.scheduledDate || 'Pending'}</td>
                        <td className="p-3.5 font-medium text-slate-800">{c.assignedEngineer || 'Unassigned'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 12. SETTINGS MODULE */}
          {/* ============================================================ */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">{t('admin.tab_settings')}</h3>
                <p className="text-xs text-slate-500">
                  Configure multi-language options, emergency dispatch hotlines, and notifications.
                </p>
              </div>

              {settingsSaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Application settings saved successfully.</span>
                </div>
              )}

              <Card variant="default" className="p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Language & Internationalization
                </h4>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Default Portal Language</span>
                    <span className="text-[11px] text-slate-500">
                      Supports English, Telugu (తెలుగు), and Hindi (हिन्दी)
                    </span>
                  </div>
                  <LanguageSelector variant="light" />
                </div>
              </Card>

              <Card variant="default" className="p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Emergency Dispatch & Operations Configuration
                </h4>
                <FormField id="cfg-phone" label="Emergency Breakdown Hotline">
                  <Input
                    id="cfg-phone"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
                  />
                </FormField>

                <FormField id="cfg-email" label="Operations Notification Email">
                  <Input
                    id="cfg-email"
                    value={dispatchEmail}
                    onChange={(e) => setDispatchEmail(e.target.value)}
                    leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                  />
                </FormField>

                <div className="pt-2">
                  <Button
                    type="button"
                    variant="industrial"
                    size="md"
                    onClick={() => {
                      setSettingsSaved(true);
                      setTimeout(() => setSettingsSaved(false), 3000);
                    }}
                  >
                    Save Application Settings
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODAL: INSPECT SERVICE REQUEST WITH PURE AUDIO PLAYBACK */}
      {/* ============================================================ */}
      {inspectedRequest && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setInspectedRequest(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900 text-white p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-amber-400 text-slate-950 px-2.5 py-1 rounded">
                  {inspectedRequest.token}
                </span>
                <Badge variant={inspectedRequest.status === 'Completed' ? 'success' : 'amber'}>
                  {inspectedRequest.status}
                </Badge>
              </div>
              <button
                type="button"
                onClick={() => setInspectedRequest(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 text-xs text-slate-700">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  {inspectedRequest.industryType} • {inspectedRequest.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{inspectedRequest.title}</h3>
                <p className="text-slate-500">
                  {inspectedRequest.companyName} | Contact: {inspectedRequest.contactPerson} ({inspectedRequest.userPhone})
                </p>
              </div>

              {/* Problem Description */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl whitespace-pre-wrap text-slate-800">
                {inspectedRequest.description}
              </div>

              {/* Problem Start Date & Location */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div>
                  <span className="text-slate-400 block font-medium">Problem Start Date</span>
                  <span className="font-bold text-slate-800">{inspectedRequest.problemStartDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Plant Location</span>
                  <span className="font-bold text-slate-800">{inspectedRequest.location}</span>
                </div>
              </div>

              {/* Voice Recording Playback (Pure audio, zero speech-to-text) */}
              {inspectedRequest.voiceRecording && (
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <Volume2 className="w-4 h-4 text-amber-700" />
                    <span>Customer Voice Note (Pure Audio Stored & Received)</span>
                  </div>
                  <audio controls src={inspectedRequest.voiceRecording} className="w-full h-8" />
                  <p className="text-[10px] text-amber-800">
                    Direct audio recording without text conversion.
                  </p>
                </div>
              )}

              {/* Attachments / Images */}
              {inspectedRequest.images.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold text-slate-800 block">Uploaded Evidence:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {inspectedRequest.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg overflow-hidden border border-slate-200 aspect-video cursor-pointer hover:opacity-90"
                        onClick={() => setEnlargedImage(img)}
                      >
                        <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Update & Admin Remarks Section */}
              <div className="p-4 bg-slate-100 rounded-xl space-y-3">
                <h4 className="font-bold text-slate-900">Update Status & Dispatch Remarks</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField id="modal-status" label="New Status">
                    <Select
                      id="modal-status"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </Select>
                  </FormField>

                  <FormField id="modal-engineer" label="Assigned Field Engineer">
                    <Input
                      id="modal-engineer"
                      value={inspectedRequest.assignedEngineer || 'K. Srinivas'}
                      readOnly
                    />
                  </FormField>
                </div>

                <FormField id="modal-remarks" label="Administrative / Engineer Remarks">
                  <Textarea
                    id="modal-remarks"
                    value={adminRemarks}
                    onChange={(e) => setAdminRemarks(e.target.value)}
                    rows={2}
                    placeholder="Enter inspection remarks or parts requisition notes..."
                  />
                </FormField>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="industrial"
                    size="sm"
                    onClick={handleStatusUpdate}
                  >
                    Save & Notify Client
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: SCHEDULING VISIT DATE */}
      {/* ============================================================ */}
      {schedulingRequest && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSchedulingRequest(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                <span>Schedule Service Visit: {schedulingRequest.token}</span>
              </h3>
              <button
                type="button"
                onClick={() => setSchedulingRequest(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">{schedulingRequest.companyName}</span>
                <span className="text-slate-600 block">{schedulingRequest.title}</span>
                <span className="text-slate-400 block">{schedulingRequest.location}</span>
              </div>

              <FormField id="sch-date" label="On-Site Visit Date" required>
                <Input
                  id="sch-date"
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  required
                />
              </FormField>

              <FormField id="sch-engineer" label="Assign Certified Field Engineer" required>
                <Select
                  id="sch-engineer"
                  value={scheduleEngineer}
                  onChange={(e) => setScheduleEngineer(e.target.value)}
                >
                  <option value="K. Srinivas (Lead Automation & Sortex Specialist)">
                    K. Srinivas (Lead Automation & Sortex Specialist)
                  </option>
                  <option value="M. Venkatesh (Hydraulics & Mechanical Systems)">
                    M. Venkatesh (Hydraulics & Mechanical Systems)
                  </option>
                  <option value="R. Krishna Rao (Compressor & Chiller Engineer)">
                    R. Krishna Rao (Compressor & Chiller Engineer)
                  </option>
                </Select>
              </FormField>

              <FormField id="sch-notes" label="Dispatch & Preparation Notes">
                <Textarea
                  id="sch-notes"
                  value={scheduleNotes}
                  onChange={(e) => setScheduleNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. Bring optical sensor calibration kit STX-OP-442 and lens seals."
                />
              </FormField>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setSchedulingRequest(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="industrial" size="sm">
                  Confirm Visit & Send Notification
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ADD INDUSTRY SECTOR */}
      {/* ============================================================ */}
      {isIndustryModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsIndustryModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Factory className="w-5 h-5 text-amber-500" />
                <span>Add Industry Sector</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsIndustryModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIndustrySubmit} className="space-y-3 text-xs">
              <FormField id="ind-name" label="Industry Sector Name" required>
                <Input
                  id="ind-name"
                  value={industryFormData.name}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Cotton Ginning & Spinning Mills"
                  required
                />
              </FormField>

              <FormField id="ind-desc" label="Description" required>
                <Textarea
                  id="ind-desc"
                  value={industryFormData.description}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, description: e.target.value }))}
                  rows={2}
                  placeholder="Industry sector overview, machinery context, and operational environment..."
                  required
                />
              </FormField>

              <FormField id="ind-mach" label="Primary Machinery (Comma-separated)" required>
                <Input
                  id="ind-mach"
                  value={industryFormData.primaryMachinery}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, primaryMachinery: e.target.value }))}
                  placeholder="High-speed lint cleaner, bale press, humidifier"
                  required
                />
              </FormField>

              <FormField id="ind-chal" label="Key Technical Challenges (Comma-separated)" required>
                <Input
                  id="ind-chal"
                  value={industryFormData.keyChallenges}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, keyChallenges: e.target.value }))}
                  placeholder="Hydraulic ram leakage, bearing overheating"
                  required
                />
              </FormField>

              <FormField id="ind-sla" label="Standard SLA Target" required>
                <Input
                  id="ind-sla"
                  value={industryFormData.standardSLA}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, standardSLA: e.target.value }))}
                  placeholder="2 to 4 Hours Response"
                  required
                />
              </FormField>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsIndustryModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="industrial" size="sm">
                  Add Industry
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: NEW ENGINEER SERVICE RECORD (10 Industrial Fields) */}
      {/* ============================================================ */}
      {isAddRecordOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsAddRecordOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900 text-white p-5 flex items-center justify-between z-10">
              <h3 className="text-base font-bold flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-amber-400" />
                <span>{t('record.create_btn')}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddRecordOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField id="rec-req-select" label="Link to Service Request (Optional)">
                  <Select
                    id="rec-req-select"
                    value={newRecordPayload.serviceRequestToken}
                    onChange={(e) => {
                      const selected = complaints.find((c) => c.token === e.target.value);
                      if (selected) {
                        setNewRecordPayload((prev) => ({
                          ...prev,
                          serviceRequestId: selected.id,
                          serviceRequestToken: selected.token,
                          customerName: selected.contactPerson,
                          companyName: selected.companyName,
                          industryType: selected.industryType,
                          machineIssue: selected.title,
                          visitDate: selected.scheduledDate || new Date().toISOString().split('T')[0],
                        }));
                      } else {
                        setNewRecordPayload((prev) => ({
                          ...prev,
                          serviceRequestToken: e.target.value,
                        }));
                      }
                    }}
                  >
                    <option value="">-- Standalone Service --</option>
                    {complaints.map((c) => (
                      <option key={c.id} value={c.token}>
                        {c.token} - {c.companyName} ({c.title.slice(0, 30)})
                      </option>
                    ))}
                  </Select>
                </FormField>

                <FormField id="rec-visit-date" label={t('record.visit_date')} required>
                  <Input
                    id="rec-visit-date"
                    type="date"
                    value={newRecordPayload.visitDate}
                    onChange={(e) =>
                      setNewRecordPayload((p) => ({ ...p, visitDate: e.target.value }))
                    }
                    required
                  />
                </FormField>

                <FormField id="rec-company" label={t('record.company')} required>
                  <Input
                    id="rec-company"
                    value={newRecordPayload.companyName}
                    onChange={(e) =>
                      setNewRecordPayload((p) => ({ ...p, companyName: e.target.value }))
                    }
                    placeholder="e.g. Prasanna Agro Industries Ltd."
                    required
                  />
                </FormField>

                <FormField id="rec-cust" label="Customer Contact Person" required>
                  <Input
                    id="rec-cust"
                    value={newRecordPayload.customerName}
                    onChange={(e) =>
                      setNewRecordPayload((p) => ({ ...p, customerName: e.target.value }))
                    }
                    placeholder="e.g. Venkat Prasanna"
                    required
                  />
                </FormField>
              </div>

              <FormField id="rec-issue" label={t('record.machine_issue')} required>
                <Input
                  id="rec-issue"
                  value={newRecordPayload.machineIssue}
                  onChange={(e) =>
                    setNewRecordPayload((p) => ({ ...p, machineIssue: e.target.value }))
                  }
                  placeholder="e.g. Sortex Optical Sensor E-402 Malfunction"
                  required
                />
              </FormField>

              <FormField id="rec-findings" label={t('record.inspection_findings')} required>
                <Textarea
                  id="rec-findings"
                  value={newRecordPayload.inspectionFindings}
                  onChange={(e) =>
                    setNewRecordPayload((p) => ({ ...p, inspectionFindings: e.target.value }))
                  }
                  rows={2}
                  placeholder="Describe technical observations, component degradation, electrical measurements..."
                  required
                />
              </FormField>

              <FormField id="rec-work" label={t('record.work_performed')} required>
                <Textarea
                  id="rec-work"
                  value={newRecordPayload.workPerformed}
                  onChange={(e) =>
                    setNewRecordPayload((p) => ({ ...p, workPerformed: e.target.value }))
                  }
                  rows={2}
                  placeholder="Disassembly steps, replacements, calibration procedures, dry run results..."
                  required
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField id="rec-tools" label={t('record.tools_materials')} required>
                  <Input
                    id="rec-tools"
                    value={newRecordPayload.toolsAndMaterials}
                    onChange={(e) =>
                      setNewRecordPayload((p) => ({ ...p, toolsAndMaterials: e.target.value }))
                    }
                    placeholder="Oscilloscope, calibration jig, Viton seals..."
                    required
                  />
                </FormField>

                <FormField id="rec-gas" label={t('record.gas_compressor')}>
                  <Input
                    id="rec-gas"
                    value={newRecordPayload.gasCompressorRequirements}
                    onChange={(e) =>
                      setNewRecordPayload((p) => ({
                        ...p,
                        gasCompressorRequirements: e.target.value,
                      }))
                    }
                    placeholder="e.g. Compressed air line checked at 6.2 Bar / R-404A top-up"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField id="rec-eng" label="Certified Engineer Name" required>
                  <Input
                    id="rec-eng"
                    value={newRecordPayload.engineerName}
                    onChange={(e) =>
                      setNewRecordPayload((p) => ({ ...p, engineerName: e.target.value }))
                    }
                    required
                  />
                </FormField>

                <FormField id="rec-status" label={t('record.completion_status')} required>
                  <Select
                    id="rec-status"
                    value={newRecordPayload.completionStatus}
                    onChange={(e) =>
                      setNewRecordPayload((p) => ({
                        ...p,
                        completionStatus: e.target.value as any,
                      }))
                    }
                  >
                    <option value="Fully Operational">Fully Operational</option>
                    <option value="Requires Follow-up">Requires Follow-up</option>
                    <option value="Under Observation">Under Observation</option>
                    <option value="Decommissioned">Decommissioned</option>
                  </Select>
                </FormField>
              </div>

              <FormField id="rec-remarks" label={t('record.engineer_remarks')} required>
                <Textarea
                  id="rec-remarks"
                  value={newRecordPayload.engineerRemarks}
                  onChange={(e) =>
                    setNewRecordPayload((p) => ({ ...p, engineerRemarks: e.target.value }))
                  }
                  rows={2}
                  placeholder="Operating recommendations, filter cleaning schedule, next preventive visit..."
                  required
                />
              </FormField>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsAddRecordOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="industrial" size="sm">
                  Save & Certify Service Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ADD INDUSTRY SECTOR */}
      {/* ============================================================ */}
      {isIndustryModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsIndustryModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Factory className="w-5 h-5 text-amber-500" />
                <span>Add Industry Sector</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsIndustryModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIndustrySubmit} className="space-y-3 text-xs">
              <FormField id="ind-name" label="Industry Sector Name" required>
                <Input
                  id="ind-name"
                  value={industryFormData.name}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Cotton Ginning & Spinning Mills"
                  required
                />
              </FormField>

              <FormField id="ind-desc" label="Description" required>
                <Textarea
                  id="ind-desc"
                  value={industryFormData.description}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, description: e.target.value }))}
                  rows={2}
                  placeholder="Industry sector overview, machinery context, and operational environment..."
                  required
                />
              </FormField>

              <FormField id="ind-mach" label="Primary Machinery (Comma-separated)" required>
                <Input
                  id="ind-mach"
                  value={industryFormData.primaryMachinery}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, primaryMachinery: e.target.value }))}
                  placeholder="High-speed lint cleaner, bale press, humidifier"
                  required
                />
              </FormField>

              <FormField id="ind-chal" label="Key Technical Challenges (Comma-separated)" required>
                <Input
                  id="ind-chal"
                  value={industryFormData.keyChallenges}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, keyChallenges: e.target.value }))}
                  placeholder="Hydraulic ram leakage, bearing overheating"
                  required
                />
              </FormField>

              <FormField id="ind-sla" label="Standard SLA Target" required>
                <Input
                  id="ind-sla"
                  value={industryFormData.standardSLA}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, standardSLA: e.target.value }))}
                  placeholder="2 to 4 Hours Response"
                  required
                />
              </FormField>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsIndustryModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="industrial" size="sm">
                  Add Industry
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: VIEW ENGINEER SERVICE RECORD */}
      {/* ============================================================ */}
      {inspectedRecord && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setInspectedRecord(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900 text-white p-5 flex items-center justify-between z-10">
              <div>
                <h3 className="text-base font-bold">{t('record.title')}</h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  {inspectedRecord.id} • Ref: {inspectedRecord.serviceRequestToken}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInspectedRecord(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div>
                  <span className="text-slate-400 block font-medium">Customer / Plant</span>
                  <span className="font-bold text-slate-900">{inspectedRecord.companyName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Visit Date</span>
                  <span className="font-bold text-slate-900">{inspectedRecord.visitDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Status</span>
                  <Badge variant="success">{inspectedRecord.completionStatus}</Badge>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">{t('record.machine_issue')}:</span>
                <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg">{inspectedRecord.machineIssue}</p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">{t('record.inspection_findings')}:</span>
                <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg whitespace-pre-line">{inspectedRecord.inspectionFindings}</p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">{t('record.work_performed')}:</span>
                <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg whitespace-pre-line">{inspectedRecord.workPerformed}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-bold text-slate-800 block mb-1">{t('record.tools_materials')}:</span>
                  <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg">{inspectedRecord.toolsAndMaterials}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block mb-1">{t('record.gas_compressor')}:</span>
                  <p className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-950 font-medium">
                    {inspectedRecord.gasCompressorRequirements || 'None required.'}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                  {t('record.engineer_remarks')}
                </span>
                <p className="text-xs">{inspectedRecord.engineerRemarks}</p>
                <div className="pt-2 text-[10px] text-slate-400 font-mono">
                  Certified By: {inspectedRecord.engineerName}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setInspectedRecord(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ADD / EDIT SERVICE & CHARGES */}
      {/* ============================================================ */}
      {isServiceModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsServiceModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-500" />
                <span>{editingService ? 'Edit Service & Charges' : 'Add New Service & Charges'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsServiceModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleServiceSubmit} className="space-y-3 text-xs">
              <FormField id="srv-name" label="Service Name" required>
                <Input
                  id="srv-name"
                  value={serviceFormData.name}
                  onChange={(e) => setServiceFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Sortex Optical Calibration & High-Speed Alignment"
                  required
                />
              </FormField>

              <FormField id="srv-desc" label="Description" required>
                <Textarea
                  id="srv-desc"
                  value={serviceFormData.description}
                  onChange={(e) => setServiceFormData((p) => ({ ...p, description: e.target.value }))}
                  rows={2}
                  placeholder="Detailed scope of service, testing, and preventative checks..."
                  required
                />
              </FormField>

              <div className="grid grid-cols-3 gap-2">
                <FormField id="srv-base" label="Base Inspection">
                  <Input
                    id="srv-base"
                    value={serviceFormData.baseCharge}
                    onChange={(e) => setServiceFormData((p) => ({ ...p, baseCharge: e.target.value }))}
                    placeholder="₹2,500"
                  />
                </FormField>
                <FormField id="srv-rate" label="Hourly Rate">
                  <Input
                    id="srv-rate"
                    value={serviceFormData.hourlyRate}
                    onChange={(e) => setServiceFormData((p) => ({ ...p, hourlyRate: e.target.value }))}
                    placeholder="₹600/hr"
                  />
                </FormField>
                <FormField id="srv-emerg" label="Emergency Fee">
                  <Input
                    id="srv-emerg"
                    value={serviceFormData.emergencySurcharge}
                    onChange={(e) => setServiceFormData((p) => ({ ...p, emergencySurcharge: e.target.value }))}
                    placeholder="₹1,000"
                  />
                </FormField>
              </div>

              <FormField id="srv-locs" label="Service Locations (Comma-separated)">
                <Input
                  id="srv-locs"
                  value={locationsInput}
                  onChange={(e) => setLocationsInput(e.target.value)}
                  placeholder="Tadepalligudem, Rajahmundry, All Locations"
                />
              </FormField>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsServiceModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="industrial" size="sm">
                  {editingService ? 'Save Changes' : 'Create Service'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ADD INDUSTRY SECTOR */}
      {/* ============================================================ */}
      {isIndustryModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsIndustryModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Factory className="w-5 h-5 text-amber-500" />
                <span>Add Industry Sector</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsIndustryModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIndustrySubmit} className="space-y-3 text-xs">
              <FormField id="ind-name" label="Industry Sector Name" required>
                <Input
                  id="ind-name"
                  value={industryFormData.name}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Cotton Ginning & Spinning Mills"
                  required
                />
              </FormField>

              <FormField id="ind-desc" label="Description" required>
                <Textarea
                  id="ind-desc"
                  value={industryFormData.description}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, description: e.target.value }))}
                  rows={2}
                  placeholder="Industry sector overview, machinery context, and operational environment..."
                  required
                />
              </FormField>

              <FormField id="ind-mach" label="Primary Machinery (Comma-separated)" required>
                <Input
                  id="ind-mach"
                  value={industryFormData.primaryMachinery}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, primaryMachinery: e.target.value }))}
                  placeholder="High-speed lint cleaner, bale press, humidifier"
                  required
                />
              </FormField>

              <FormField id="ind-chal" label="Key Technical Challenges (Comma-separated)" required>
                <Input
                  id="ind-chal"
                  value={industryFormData.keyChallenges}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, keyChallenges: e.target.value }))}
                  placeholder="Hydraulic ram leakage, bearing overheating"
                  required
                />
              </FormField>

              <FormField id="ind-sla" label="Standard SLA Target" required>
                <Input
                  id="ind-sla"
                  value={industryFormData.standardSLA}
                  onChange={(e) => setIndustryFormData((p) => ({ ...p, standardSLA: e.target.value }))}
                  placeholder="2 to 4 Hours Response"
                  required
                />
              </FormField>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsIndustryModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="industrial" size="sm">
                  Add Industry
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox for Zoomed Image */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-60 bg-slate-950/80 flex items-center justify-center p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={enlargedImage} alt="Enlarged" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
};
