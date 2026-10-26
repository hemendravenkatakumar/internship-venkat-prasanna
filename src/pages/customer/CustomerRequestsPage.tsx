import React, { useState, useEffect, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Card,
  CardContent,
  Button,
  Badge,
  Input,
} from '@/components/common';
import { authService } from '@/services/authService';
import { complaintsService, ComplaintRecord, ComplaintStatus } from '@/services/complaintsService';
import {
  Clock,
  AlertTriangle,
  Search,
  RefreshCw,
  FilePlus,
  Eye,
  MapPin,
  Image as ImageIcon,
  Mic,
  Calendar,
  X,
  Volume2,
  ShieldCheck,
  Check,
} from 'lucide-react';

const STATUS_STEPS: ComplaintStatus[] = ['Submitted', 'Under Review', 'In Progress', 'Resolved'];

export const CustomerRequestsPage: React.FC = () => {
  const currentUser = authService.getCurrentUser();

  const [complaints, setComplaints] = useState<ComplaintRecord[]>(() =>
    currentUser ? complaintsService.getUserComplaints(currentUser.id) : []
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | ComplaintStatus>('All');
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintRecord | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const loadData = useCallback(() => {
    if (currentUser) {
      setComplaints(complaintsService.getUserComplaints(currentUser.id));
    }
  }, [currentUser]);

  useEffect(() => {
    const interval = setInterval(loadData, 4000);
    return () => clearInterval(interval);
  }, [loadData]);

  if (!currentUser) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  // Filtering
  const filtered = complaints.filter((item) => {
    const matchesSearch =
      item.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: ComplaintStatus) => {
    switch (status) {
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

  const getStepIndex = (status: ComplaintStatus): number => {
    return STATUS_STEPS.indexOf(status);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="amber" icon={<Clock className="w-3.5 h-3.5" />}>
              Live Status Tracking
            </Badge>
            <span className="text-xs font-mono text-slate-500">
              Registered Client: {currentUser.name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Submitted Complaints
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            View real-time status progression, technician remarks, and historical incident records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadData}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            title="Refresh complaint records"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
            <Button variant="industrial" size="sm" rightIcon={<FilePlus className="w-4 h-4" />}>
              New Complaint
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card variant="default" className="p-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="w-full md:w-80">
            <Input
              placeholder="Search by token (RN-2026-...), title, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1 md:pb-0">
            {(['All', 'Submitted', 'Under Review', 'In Progress', 'Resolved'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Complaints List */}
      {filtered.length === 0 ? (
        <Card variant="default" className="p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">No matching complaints found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'All'
                ? 'Try adjusting your search criteria or status filter.'
                : 'You have not submitted any complaints under this account yet.'}
            </p>
          </div>
          <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
            <Button variant="industrial" size="sm" leftIcon={<FilePlus className="w-4 h-4" />}>
              Submit a Complaint
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((complaint) => {
            const currentStepIdx = getStepIndex(complaint.status);

            return (
              <Card
                key={complaint.id}
                variant="default"
                className="hover:border-slate-300 transition-all shadow-xs"
              >
                <CardContent className="p-5 sm:p-6 space-y-5">
                  {/* Top Bar: Token, Category, Date, Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2.5 py-1 rounded">
                        {complaint.token}
                      </span>
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {complaint.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(complaint.createdAt).toLocaleDateString()} at {new Date(complaint.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(complaint.status)}>
                        {complaint.status}
                      </Badge>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedComplaint(complaint)}
                        leftIcon={<Eye className="w-3.5 h-3.5 text-amber-600" />}
                      >
                        View Ticket
                      </Button>
                    </div>
                  </div>

                  {/* Title & Description Excerpt */}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {complaint.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                      {complaint.description}
                    </p>
                  </div>

                  {/* Location & Attachments Summary */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{complaint.location}</span>
                    </span>
                    {complaint.images.length > 0 && (
                      <span className="flex items-center gap-1 text-slate-600">
                        <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>{complaint.images.length} Image{complaint.images.length === 1 ? '' : 's'}</span>
                      </span>
                    )}
                    {complaint.voiceRecording && (
                      <span className="flex items-center gap-1 text-amber-700 font-medium">
                        <Mic className="w-3.5 h-3.5" />
                        <span>Voice Note Included</span>
                      </span>
                    )}
                  </div>

                  {/* Status Progress Stepper */}
                  <div className="pt-2">
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                      {STATUS_STEPS.map((step, idx) => {
                        const isDone = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;

                        return (
                          <div key={step} className="flex flex-col items-center">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-colors ${
                                isCurrent
                                  ? 'bg-amber-600 text-white ring-4 ring-amber-100'
                                  : isDone
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 text-slate-500'
                              }`}
                            >
                              {isDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                            </div>
                            <span
                              className={`font-semibold ${
                                isCurrent
                                  ? 'text-amber-800'
                                  : isDone
                                  ? 'text-emerald-800'
                                  : 'text-slate-400'
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Latest Admin Remarks Box */}
                  {complaint.adminRemarks && (
                    <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-bold">Latest Operational Admin Remarks:</span>
                        <p className="text-amber-900 leading-relaxed">{complaint.adminRemarks}</p>
                        <span className="text-[10px] text-amber-700 font-mono block pt-1">
                          Last Updated: {new Date(complaint.updatedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* FULL COMPLAINT DETAIL MODAL */}
      {selectedComplaint && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedComplaint(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-black bg-slate-900 text-white px-2.5 py-1 rounded">
                  {selectedComplaint.token}
                </span>
                <Badge variant={getStatusBadgeVariant(selectedComplaint.status)}>
                  {selectedComplaint.status}
                </Badge>
              </div>

              <button
                type="button"
                onClick={() => setSelectedComplaint(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Title & Metadata */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  {selectedComplaint.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedComplaint.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{selectedComplaint.location}</span>
                  </span>
                  <span>•</span>
                  <span>Submitted: {new Date(selectedComplaint.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Problem Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Detailed Problem Description
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {selectedComplaint.description}
                </div>
              </div>

              {/* Photographic Evidence Gallery */}
              {selectedComplaint.images.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                    <span>Uploaded Evidence ({selectedComplaint.images.length})</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedComplaint.images.map((img, idx) => (
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
                </div>
              )}

              {/* Voice Recording Playback */}
              {selectedComplaint.voiceRecording && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-amber-600" />
                    <span>Voice Note Recording</span>
                  </h4>
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs text-amber-900 font-semibold">
                      <Volume2 className="w-4 h-4 text-amber-600" />
                      <span>Audio Explanation Recorded by User</span>
                    </div>
                    <audio src={selectedComplaint.voiceRecording} controls className="w-full h-9" />
                  </div>
                </div>
              )}

              {/* Status Audit Trail & Admin Remarks History */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
                  <span>Status Updates & Admin Remarks History</span>
                </h4>
                <div className="space-y-2">
                  {selectedComplaint.remarksHistory.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">
                          Status changed to: <span className="text-amber-800">{entry.status}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(entry.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-slate-600">{entry.remark}</p>
                      <span className="text-[10px] text-slate-400 font-medium">By: {entry.author}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setSelectedComplaint(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Enlarged Lightbox View */}
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
    </div>
  );
};
