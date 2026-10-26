import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Button,
  Badge,
  Input,
  Select,
  Textarea,
  FormField,
} from '@/components/common';
import { authService, UserProfile } from '@/services/authService';
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
import { emailService } from '@/services/emailService';
import {
  Home,
  AlertCircle,
  Wrench,
  User as UserIcon,
  LogOut,
  Eye,
  Search,
  Plus,
  RefreshCw,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Image as ImageIcon,
  Mic,
  X,
  Volume2,
  ShieldCheck,
  Edit,
  Power,
  Send,
  Building2,
} from 'lucide-react';

type AdminTab = 'home' | 'complaints' | 'services' | 'profile';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Authentication check: Must be an authenticated administrator
  const authUser = authService.getCurrentUser();
  const [currentAdmin, setCurrentAdmin] = useState<UserProfile | null>(
    authUser && authUser.role === 'admin' ? authUser : null
  );

  const [activeTab, setActiveTab] = useState<AdminTab>('home');

  // Authoritative Data States
  const [complaints, setComplaints] = useState<ComplaintRecord[]>(() => complaintsService.getComplaints());
  const [stats, setStats] = useState<ComplaintStats>(() => complaintsService.getStats());
  const [services, setServices] = useState<ServiceRecord[]>(() => servicesService.getAllServices());
  const [lastRefreshed, setLastRefreshed] = useState<string>(() => new Date().toLocaleTimeString());

  // Search & Filter in User Complaints
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | ComplaintStatus>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Eye-Icon View Modal State
  const [inspectedComplaint, setInspectedComplaint] = useState<ComplaintRecord | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('Submitted');
  const [adminRemarks, setAdminRemarks] = useState('');
  const [statusUpdateMessage, setStatusUpdateMessage] = useState<string | null>(null);
  const [isRetryingEmail, setIsRetryingEmail] = useState(false);

  // Service Management Modal States
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceRecord | null>(null);
  const [serviceFormData, setServiceFormData] = useState<NewServicePayload>({
    name: '',
    company: '',
    locations: ['Tadepalligudem'],
    description: '',
    contactInfo: '',
    status: 'active',
  });
  const [locationsInput, setLocationsInput] = useState('Tadepalligudem, AP');
  const [serviceFormErrors, setServiceFormErrors] = useState<Record<string, string>>({});

  // Admin Profile Form State
  const [adminName, setAdminName] = useState(authUser?.name || '');
  const [adminEmail, setAdminEmail] = useState(authUser?.email || '');
  const [adminPhone, setAdminPhone] = useState(authUser?.phone || '');
  const [adminPassword, setAdminPassword] = useState('');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);

  // Load Authoritative Persistent Data
  const loadAuthoritativeData = React.useCallback(() => {
    const allComplaints = complaintsService.getComplaints();
    setComplaints(allComplaints);
    setStats(complaintsService.getStats());
    const allServices = servicesService.getAllServices();
    setServices(allServices);
    setLastRefreshed(new Date().toLocaleTimeString());
  }, []);

  useEffect(() => {
    const interval = setInterval(loadAuthoritativeData, 3500);
    return () => clearInterval(interval);
  }, [loadAuthoritativeData]);

  if (!currentAdmin || currentAdmin.role !== 'admin') {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  const handleLogout = () => {
    authService.logout();
    navigate(ROUTES.AUTH.LOGIN);
  };

  // Status Badge Styling Helper
  const getStatusBadgeVariant = (st: ComplaintStatus) => {
    switch (st) {
      case 'Resolved':
        return 'success';
      case 'In Progress':
        return 'amber';
      case 'Under Review':
        return 'info';
      default:
        return 'default';
    }
  };

  // Open Inspection Modal with Complaint Data
  const openComplaintModal = (comp: ComplaintRecord) => {
    setInspectedComplaint(comp);
    setNewStatus(comp.status);
    setAdminRemarks(comp.adminRemarks || '');
    setStatusUpdateMessage(null);
  };

  // Save Status & Remarks
  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectedComplaint) return;

    const updated = complaintsService.updateComplaintStatus(
      inspectedComplaint.id,
      newStatus,
      adminRemarks,
      currentAdmin.name
    );

    if (updated) {
      setInspectedComplaint({ ...updated });
      loadAuthoritativeData();
      setStatusUpdateMessage(`Status updated to ${newStatus} and remarks saved.`);
      setTimeout(() => setStatusUpdateMessage(null), 3000);
    }
  };

  // Retry Email Notification
  const handleRetryEmail = async () => {
    if (!inspectedComplaint) return;
    setIsRetryingEmail(true);
    await complaintsService.retryComplaintEmail(inspectedComplaint.id);
    loadAuthoritativeData();
    setIsRetryingEmail(false);
  };

  // Filtered Complaints (Newest submissions first)
  const filteredComplaints = complaints
    .filter((c) => {
      const matchSearch =
        c.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchCategory = categoryFilter === 'All' || c.category === categoryFilter;

      return matchSearch && matchStatus && matchCategory;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Service Management Handlers
  const handleOpenAddService = () => {
    setEditingService(null);
    setServiceFormData({
      name: '',
      company: '',
      locations: ['Tadepalligudem'],
      description: '',
      contactInfo: '',
      status: 'active',
    });
    setLocationsInput('Tadepalligudem, AP');
    setServiceFormErrors({});
    setIsAddServiceOpen(true);
  };

  const handleOpenEditService = (srv: ServiceRecord) => {
    setEditingService(srv);
    setServiceFormData({
      name: srv.name,
      company: srv.company,
      locations: srv.locations,
      description: srv.description,
      contactInfo: srv.contactInfo,
      status: srv.status,
    });
    setLocationsInput(srv.locations.join(', '));
    setServiceFormErrors({});
    setIsAddServiceOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!serviceFormData.name.trim()) newErrors.name = 'Service name is required.';
    if (!serviceFormData.company.trim()) newErrors.company = 'Company name is required.';
    if (!locationsInput.trim()) newErrors.locations = 'At least one applicable location is required.';

    if (Object.keys(newErrors).length > 0) {
      setServiceFormErrors(newErrors);
      return;
    }

    const locArray = locationsInput.split(',').map((l) => l.trim()).filter(Boolean);

    if (editingService) {
      servicesService.updateService(editingService.id, {
        name: serviceFormData.name,
        company: serviceFormData.company,
        locations: locArray,
        description: serviceFormData.description,
        contactInfo: serviceFormData.contactInfo,
        status: serviceFormData.status,
      });
    } else {
      servicesService.addService({
        name: serviceFormData.name,
        company: serviceFormData.company,
        locations: locArray,
        description: serviceFormData.description,
        contactInfo: serviceFormData.contactInfo,
        status: serviceFormData.status,
      });
    }

    setIsAddServiceOpen(false);
    loadAuthoritativeData();
  };

  const handleToggleService = (id: string) => {
    servicesService.toggleServiceStatus(id);
    loadAuthoritativeData();
  };

  // Admin Profile Update Handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = authService.updateProfile(currentAdmin.id, {
      name: adminName.trim(),
      email: adminEmail.trim(),
      phone: adminPhone.trim(),
    });

    // Also update configured admin email in emailService
    emailService.setAdminEmail(adminEmail.trim());

    setCurrentAdmin(updated);
    setProfileSuccessMsg('Admin profile and notification preferences saved.');
    setTimeout(() => setProfileSuccessMsg(null), 3500);
  };

  const totalActiveServices = services.filter((s) => s.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="amber" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              Operational Command Console
            </Badge>
            <span className="text-xs font-mono text-slate-500">
              Admin: {currentAdmin.name} ({currentAdmin.email})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ReliefNet & VPE Operations Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Supervisory oversight for incident tickets, service catalog dispatch, and live triage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            Synced: {lastRefreshed}
          </span>
          <button
            type="button"
            onClick={loadAuthoritativeData}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            title="Refresh database records"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Admin Sidebar & View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SECTION 1: ADMIN SIDEBAR (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <Card variant="default" className="p-3">
            <nav className="space-y-1" aria-label="Admin Navigation">
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'home'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4 text-amber-400" />
                  <span>Home (Overview)</span>
                </div>
                <Badge variant={activeTab === 'home' ? 'outline' : 'default'} className="text-[10px]">
                  {stats.total}
                </Badge>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('complaints')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'complaints'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>User Complaints</span>
                </div>
                {stats.submitted > 0 && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950">
                    {stats.submitted} New
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'services'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Wrench className="w-4 h-4 text-amber-500" />
                  <span>Service Management</span>
                </div>
                <Badge variant={activeTab === 'services' ? 'outline' : 'default'} className="text-[10px]">
                  {totalActiveServices} Active
                </Badge>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <UserIcon className="w-4 h-4 text-amber-500" />
                  <span>Profile</span>
                </div>
              </button>

              <div className="pt-2 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </Card>

          {/* Quick Stats Helper Card in Sidebar */}
          <Card variant="flat" className="p-4 space-y-2 text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
              Authority Snapshot
            </span>
            <div className="space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Total Stored:</span>
                <span className="font-mono font-bold text-slate-900">{stats.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Pending Review:</span>
                <span className="font-mono font-bold text-amber-700">{stats.submitted}</span>
              </div>
              <div className="flex justify-between">
                <span>Under Review:</span>
                <span className="font-mono font-bold text-blue-700">{stats.underReview}</span>
              </div>
              <div className="flex justify-between">
                <span>In Progress:</span>
                <span className="font-mono font-bold text-amber-800">{stats.inProgress}</span>
              </div>
              <div className="flex justify-between">
                <span>Resolved:</span>
                <span className="font-mono font-bold text-emerald-700">{stats.resolved}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1">
                <span>Active Services:</span>
                <span className="font-mono font-bold text-slate-900">{totalActiveServices}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* MAIN DISPLAY AREA (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: HOME PAGE (Summary Statistics & Recent Feed) */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              {/* Complaint Summary Statistics Cards (Actual Stored Data) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <Card variant="default" className="p-4 text-center">
                  <span className="text-[11px] font-bold uppercase text-slate-500">Total</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">{stats.total}</div>
                  <span className="text-[10px] text-slate-400">Complaints</span>
                </Card>

                <Card variant="industrial" className="p-4 text-center">
                  <span className="text-[11px] font-bold uppercase text-amber-800">New</span>
                  <div className="text-2xl font-black text-amber-600 mt-1">{stats.submitted}</div>
                  <span className="text-[10px] text-amber-700">Submitted</span>
                </Card>

                <Card variant="default" className="p-4 text-center">
                  <span className="text-[11px] font-bold uppercase text-blue-700">Review</span>
                  <div className="text-2xl font-black text-blue-700 mt-1">{stats.underReview}</div>
                  <span className="text-[10px] text-slate-400">Under Review</span>
                </Card>

                <Card variant="default" className="p-4 text-center">
                  <span className="text-[11px] font-bold uppercase text-amber-900">Progress</span>
                  <div className="text-2xl font-black text-amber-700 mt-1">{stats.inProgress}</div>
                  <span className="text-[10px] text-slate-400">In Progress</span>
                </Card>

                <Card variant="default" className="p-4 text-center">
                  <span className="text-[11px] font-bold uppercase text-emerald-700">Resolved</span>
                  <div className="text-2xl font-black text-emerald-700 mt-1">{stats.resolved}</div>
                  <span className="text-[10px] text-slate-400">Completed</span>
                </Card>

                <Card variant="default" className="p-4 text-center">
                  <span className="text-[11px] font-bold uppercase text-slate-600">Services</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">{totalActiveServices}</div>
                  <span className="text-[10px] text-slate-400">Active</span>
                </Card>
              </div>

              {/* Recent Complaints Feed */}
              <Card variant="default">
                <CardHeader className="border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base sm:text-lg">Recent User Complaints</CardTitle>
                      <p className="text-xs text-slate-500">
                        Newest submissions requiring operational triage and status assignment.
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab('complaints')}
                      rightIcon={<ArrowRightIcon className="w-3.5 h-3.5" />}
                    >
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {complaints.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-500">
                      No complaints in persistent storage.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {complaints.slice(0, 5).map((comp) => (
                        <div
                          key={comp.id}
                          className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                                {comp.token}
                              </span>
                              <Badge variant={getStatusBadgeVariant(comp.status)}>
                                {comp.status}
                              </Badge>
                              <span className="text-xs text-slate-400">
                                {new Date(comp.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900">{comp.title}</h4>
                            <p className="text-xs text-slate-500">
                              By <strong className="text-slate-700">{comp.userName}</strong> • {comp.location}
                            </p>
                          </div>

                          <div className="shrink-0">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => openComplaintModal(comp)}
                              leftIcon={<Eye className="w-3.5 h-3.5 text-amber-600" />}
                            >
                              Inspect
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 2: USER COMPLAINTS MANAGEMENT PAGE */}
          {activeTab === 'complaints' && (
            <div className="space-y-4">
              {/* Search and Filters */}
              <Card variant="default" className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  <div className="md:col-span-6">
                    <Input
                      placeholder="Search token (RN-2026-...), user, title, location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      leftIcon={<Search className="w-4 h-4 text-slate-400" />}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Submitted">Submitted (New)</option>
                      <option value="Under Review">Under Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </Select>
                  </div>

                  <div className="md:col-span-3">
                    <Select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="All">All Categories</option>
                      <option value="Equipment Breakdown">Equipment Breakdown</option>
                      <option value="Power & Electrical Failure">Power & Electrical</option>
                      <option value="Mechanical Jam / Failure">Mechanical Jam</option>
                      <option value="Supply & Resource Disruption">Supply & Resource</option>
                      <option value="Structural & Facility Safety">Structural & Safety</option>
                      <option value="Water / Medical Relief Logistics">Relief Logistics</option>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Complaints Table */}
              <Card variant="default" className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                        <th className="py-3 px-4 font-semibold">Token</th>
                        <th className="py-3 px-4 font-semibold">Title & User</th>
                        <th className="py-3 px-4 font-semibold">Category</th>
                        <th className="py-3 px-4 font-semibold">Location</th>
                        <th className="py-3 px-4 font-semibold">Submitted</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                        <th className="py-3 px-4 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredComplaints.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400">
                            No complaints match the specified filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredComplaints.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                              {item.token}
                            </td>

                            <td className="py-3.5 px-4 max-w-xs">
                              <span className="font-bold text-slate-900 block truncate">
                                {item.title}
                              </span>
                              <span className="text-[11px] text-slate-500 block truncate">
                                {item.userName} ({item.userEmail})
                              </span>
                            </td>

                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                                {item.category}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 max-w-xs truncate text-slate-600">
                              {item.location}
                            </td>

                            <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>

                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <Badge variant={getStatusBadgeVariant(item.status)}>
                                {item.status}
                              </Badge>
                            </td>

                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => openComplaintModal(item)}
                                leftIcon={<Eye className="w-3.5 h-3.5 text-amber-600" />}
                                title="Inspect complaint with Eye icon"
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 3: SERVICE MANAGEMENT (Preserve 4 Services + Add Future Services) */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Dynamic Service Catalog Management</h3>
                  <p className="text-xs text-slate-500">
                    4 Core services preserved. Add, edit, activate, or deactivate additional services dynamically.
                  </p>
                </div>

                <Button
                  variant="industrial"
                  size="sm"
                  onClick={handleOpenAddService}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Add Service
                </Button>
              </div>

              {/* Service Cards / Table */}
              <div className="space-y-3">
                {services.map((srv) => (
                  <Card key={srv.id} variant="default" className="p-5 hover:border-slate-300 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                            {srv.id.toUpperCase()}
                          </span>
                          <Badge variant={srv.status === 'active' ? 'success' : 'default'}>
                            {srv.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>

                        <h4 className="text-base font-bold text-slate-900">{srv.name}</h4>
                        <p className="text-xs text-slate-600">{srv.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                          <span className="flex items-center gap-1 font-semibold text-slate-700">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{srv.company}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>Locations: {srv.locations.join(', ')}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-mono">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{srv.contactInfo || 'Standard Dispatch'}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleOpenEditService(srv)}
                          leftIcon={<Edit className="w-3.5 h-3.5" />}
                        >
                          Edit
                        </Button>

                        <Button
                          variant={srv.status === 'active' ? 'outline' : 'industrial'}
                          size="sm"
                          onClick={() => handleToggleService(srv.id)}
                          leftIcon={<Power className="w-3.5 h-3.5" />}
                        >
                          {srv.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ADMIN PROFILE */}
          {activeTab === 'profile' && (
            <Card variant="default">
              <form onSubmit={handleSaveProfile}>
                <CardHeader className="border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-lg">
                      {currentAdmin.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg">{currentAdmin.name}</CardTitle>
                      <p className="text-xs text-slate-500">
                        Role: <span className="font-bold text-amber-700 uppercase">Operations Administrator</span>
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5 p-6">
                  {profileSuccessMsg && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{profileSuccessMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField id="admin-name" label="Administrator Name" required>
                      <Input
                        id="admin-name"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        leftIcon={<UserIcon className="w-4 h-4 text-slate-400" />}
                      />
                    </FormField>

                    <FormField id="admin-email" label="Configured Alert Email Destination" required helperText="New complaint notifications are sent to this address">
                      <Input
                        id="admin-email"
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField id="admin-phone" label="Operations Mobile / Hotline" required>
                      <Input
                        id="admin-phone"
                        value={adminPhone}
                        onChange={(e) => setAdminPhone(e.target.value)}
                        leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
                      />
                    </FormField>

                    <FormField id="admin-password" label="Change Password (Optional)" helperText="Leave blank to keep existing password">
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="••••••••"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                    </FormField>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Secure Persistent Credentials Storage</span>
                    </span>
                    <span className="font-mono text-slate-400">Authority Role: admin</span>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end p-4 bg-slate-50/60 border-t border-slate-100">
                  <Button type="submit" variant="industrial" size="md">
                    Save Admin Profile Changes
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
        </div>
      </div>

      {/* SECTION 4: EYE-ICON VIEW COMPLAINT INSPECTION MODAL */}
      {inspectedComplaint && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setInspectedComplaint(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-black bg-slate-900 text-white px-3 py-1 rounded">
                  {inspectedComplaint.token}
                </span>
                <Badge variant={getStatusBadgeVariant(inspectedComplaint.status)}>
                  {inspectedComplaint.status}
                </Badge>
              </div>

              <button
                type="button"
                onClick={() => setInspectedComplaint(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Status Update Feedback */}
              {statusUpdateMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{statusUpdateMessage}</span>
                </div>
              )}

              {/* A. Complaint Information & Header */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  {inspectedComplaint.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {inspectedComplaint.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">
                    Submission Date & Time: {new Date(inspectedComplaint.createdAt).toLocaleString()}
                  </span>
                  <span>•</span>
                  <span>Last Updated: {new Date(inspectedComplaint.updatedAt).toLocaleString()}</span>
                </div>
              </div>

              {/* D. User Contact Details */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>User Contact Details</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Full Name:</span>
                    <strong className="text-slate-900">{inspectedComplaint.userName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Email Address:</span>
                    <strong className="text-slate-900">{inspectedComplaint.userEmail}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Phone Number:</span>
                    <strong className="text-slate-900">{inspectedComplaint.userPhone || 'Not provided'}</strong>
                  </div>
                </div>
              </div>

              {/* E. Location Details */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Location Details</span>
                </h4>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800">
                  {inspectedComplaint.location}
                </div>
              </div>

              {/* Full Problem Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Full Problem Description
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {inspectedComplaint.description}
                </div>
              </div>

              {/* B. Uploaded Images */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>Uploaded Photographic Evidence ({inspectedComplaint.images.length})</span>
                </h4>
                {inspectedComplaint.images.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No photographic evidence attached to this ticket.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {inspectedComplaint.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-100 cursor-pointer hover:opacity-90"
                        onClick={() => setEnlargedImage(img)}
                        title="Click to zoom image"
                      >
                        <img src={img} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* C. Voice Recording with Playback Controls */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-amber-600" />
                  <span>Voice Recording Explanation</span>
                </h4>
                {inspectedComplaint.voiceRecording ? (
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs text-amber-950 font-bold">
                      <Volume2 className="w-4 h-4 text-amber-600" />
                      <span>Audio Playback (Full Controls Available)</span>
                    </div>
                    <audio src={inspectedComplaint.voiceRecording} controls className="w-full h-10" />
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No audio explanation attached to this complaint.</p>
                )}
              </div>

              {/* Email Notification Audit */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-800">Admin Email Status: </span>
                  <span className={inspectedComplaint.emailStatus.sent ? 'text-emerald-700 font-medium' : 'text-amber-700 font-medium'}>
                    {inspectedComplaint.emailStatus.sent
                      ? `Delivered to ${inspectedComplaint.emailStatus.recipient}`
                      : 'Pending Dispatch'}
                  </span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRetryEmail}
                  isLoading={isRetryingEmail}
                  leftIcon={<Send className="w-3.5 h-3.5" />}
                >
                  Resend Notification
                </Button>
              </div>

              {/* G. Complaint Status Management Form */}
              <Card variant="industrial" className="p-5 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Update Complaint Status & Add Remarks</span>
                </h4>

                <form onSubmit={handleSaveStatus} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField id="update-status" label="Assign Status" required>
                      <Select
                        id="update-status"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </Select>
                    </FormField>

                    <div className="text-xs text-slate-500 self-center pt-2">
                      <span>Status changes synchronize immediately to the user's dashboard view.</span>
                    </div>
                  </div>

                  <FormField
                    id="admin-remarks"
                    label="Official Admin Remarks"
                    helperText="Visible to user under their complaint record"
                  >
                    <Textarea
                      id="admin-remarks"
                      rows={3}
                      placeholder="Add technician dispatch notes, ETA, corrective actions taken, or inspection findings..."
                      value={adminRemarks}
                      onChange={(e) => setAdminRemarks(e.target.value)}
                    />
                  </FormField>

                  <div className="flex justify-end gap-2">
                    <Button type="submit" variant="industrial" size="sm">
                      Save Status & Remarks
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Status Audit Trail */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status History & Remarks Log
                </h4>
                <div className="space-y-2">
                  {inspectedComplaint.remarksHistory.map((rem) => (
                    <div key={rem.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>Status: <span className="text-amber-800">{rem.status}</span></span>
                        <span className="font-mono text-[10px] text-slate-400">
                          {new Date(rem.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{rem.remark}</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Author: {rem.author}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-between items-center">
              <span className="text-xs text-slate-500">
                Token: <strong className="font-mono text-slate-800">{inspectedComplaint.token}</strong>
              </span>
              <Button variant="secondary" size="sm" onClick={() => setInspectedComplaint(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Enlarged Image Lightbox */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-60 bg-slate-950/80 flex items-center justify-center p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={enlargedImage} alt="Enlarged" className="max-w-full max-h-[85vh] rounded-lg shadow-2xl" />
            <button
              type="button"
              onClick={() => setEnlargedImage(null)}
              className="absolute top-2 right-2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION 5: ADD / EDIT SERVICE MODAL */}
      {isAddServiceOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsAddServiceOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {editingService ? 'Edit Service Specification' : 'Add New Service (Future Expansion)'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddServiceOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <FormField id="srv-name" label="Service Name" required error={serviceFormErrors.name}>
                <Input
                  id="srv-name"
                  placeholder="e.g. Hydraulic Ram Overhaul or Relief Cargo Logistics"
                  value={serviceFormData.name}
                  onChange={(e) => setServiceFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </FormField>

              <FormField id="srv-company" label="Company Providing Service" required error={serviceFormErrors.company}>
                <Input
                  id="srv-company"
                  placeholder="e.g. Venkata Prasanna Heavy Engineering Division"
                  value={serviceFormData.company}
                  onChange={(e) => setServiceFormData((prev) => ({ ...prev, company: e.target.value }))}
                />
              </FormField>

              <FormField
                id="srv-locations"
                label="Applicable Location(s)"
                required
                error={serviceFormErrors.locations}
                helperText="Separate multiple locations with commas (e.g. Tadepalligudem, Eluru, Vijayawada, All Locations)"
              >
                <Input
                  id="srv-locations"
                  placeholder="Tadepalligudem, Eluru, All Locations"
                  value={locationsInput}
                  onChange={(e) => setLocationsInput(e.target.value)}
                />
              </FormField>

              <FormField id="srv-desc" label="Service Description (Optional)">
                <Textarea
                  id="srv-desc"
                  rows={2}
                  placeholder="Scope of work, machinery models covered, diagnostic procedures..."
                  value={serviceFormData.description}
                  onChange={(e) => setServiceFormData((prev) => ({ ...prev, description: e.target.value }))}
                />
              </FormField>

              <FormField id="srv-contact" label="Contact Information / Dispatch Hotline (Optional)">
                <Input
                  id="srv-contact"
                  placeholder="+91 800-000-0000 | dispatch@vpe.com"
                  value={serviceFormData.contactInfo}
                  onChange={(e) => setServiceFormData((prev) => ({ ...prev, contactInfo: e.target.value }))}
                />
              </FormField>

              <FormField id="srv-status" label="Service Status">
                <Select
                  id="srv-status"
                  value={serviceFormData.status}
                  onChange={(e) =>
                    setServiceFormData((prev) => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))
                  }
                >
                  <option value="active">Active (Visible to Users)</option>
                  <option value="inactive">Inactive (Hidden from Users)</option>
                </Select>
              </FormField>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Button variant="secondary" size="md" onClick={() => setIsAddServiceOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="industrial" size="md">
                  {editingService ? 'Save Changes' : 'Save New Service'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Icon
function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
