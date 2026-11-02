import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Card,
  Button,
  Badge,
  Input,
} from '@/components/common';
import { authService } from '@/services/authService';
import { complaintsService, ComplaintRecord, ComplaintStatus } from '@/services/complaintsService';
import {
  Wrench,
  Calendar,
  Search,
  MapPin,
  Building2,
  Volume2,
  RefreshCw,
  Phone,
  ArrowRight,
} from 'lucide-react';

export const EngineerRequestsPage: React.FC = () => {
  const authUser = authService.getCurrentUser();

  const [complaints, setComplaints] = useState<ComplaintRecord[]>(() =>
    complaintsService.getComplaints()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | ComplaintStatus>('All');

  const loadData = useCallback(() => {
    setComplaints(complaintsService.getComplaints());
  }, []);

  useEffect(() => {
    const interval = setInterval(loadData, 4000);
    return () => clearInterval(interval);
  }, [loadData]);

  if (!authUser || (authUser.role !== 'engineer' && authUser.role !== 'admin')) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  const filtered = complaints.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.token.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.companyName.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="amber" icon={<Wrench className="w-3.5 h-3.5" />}>
              Field Engineer Dispatch List
            </Badge>
            <span className="text-xs font-mono text-slate-500">
              Specialist: {authUser.name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Assigned Service Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time machine breakdown tasks assigned to your mobile technical division.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadData}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Refresh requests"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link to={ROUTES.ENGINEER.DASHBOARD}>
            <Button variant="industrial" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Operations Terminal
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by ticket ID, plant, machine issue, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>
        <div className="sm:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full text-xs font-medium rounded-lg px-3 py-2 border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          >
            <option value="All">All Statuses ({complaints.length})</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      {filtered.length === 0 ? (
        <Card variant="default" className="p-8 text-center space-y-2">
          <Wrench className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No matching service requests found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search criteria or filter options.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <Card key={item.id} variant="default" className="p-5 hover:border-slate-300 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black bg-slate-900 text-white px-2.5 py-1 rounded">
                      {item.token}
                    </span>
                    <Badge
                      variant={
                        item.status === 'Completed'
                          ? 'success'
                          : item.status === 'Scheduled'
                          ? 'info'
                          : item.status === 'In Progress'
                          ? 'amber'
                          : 'default'
                      }
                    >
                      {item.status}
                    </Badge>
                    <span className="text-xs text-slate-400">
                      Problem Started: {item.problemStartDate || item.createdAt.split('T')[0]}
                    </span>
                    {item.scheduledDate && (
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Visit: {item.scheduledDate}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-medium text-slate-800">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.companyName} ({item.contactPerson})</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.userPhone}</span>
                    </span>
                  </div>

                  {item.voiceRecording && (
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                      <Volume2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <div className="flex-1">
                        <span className="text-[11px] font-bold text-slate-800 block">
                          Customer Audio Note Attached
                        </span>
                        <audio controls src={item.voiceRecording} className="w-full h-8 mt-1" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <Link to={ROUTES.ENGINEER.DASHBOARD}>
                    <Button variant="industrial" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Open In Terminal
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
