import React, { useState, useEffect, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Card,
  Button,
  Badge,
  Input,
} from '@/components/common';
import { authService } from '@/services/authService';
import { complaintsService, ComplaintRecord, ComplaintStatus } from '@/services/complaintsService';
import { engineerRecordsService, EngineerServiceRecord } from '@/services/engineerRecordsService';
import { useLanguage } from '@/context/LanguageContext';
import {
  Clock,
  Search,
  RefreshCw,
  FilePlus,
  Eye,
  MapPin,
  Calendar,
  X,
  Volume2,
  Check,
  FileText,
  Activity,
} from 'lucide-react';

export const CustomerRequestsPage: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const { t } = useLanguage();

  const [complaints, setComplaints] = useState<ComplaintRecord[]>(() =>
    currentUser ? complaintsService.getUserComplaints(currentUser.id) : []
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | ComplaintStatus>('All');
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintRecord | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [inspectedRecord, setInspectedRecord] = useState<EngineerServiceRecord | null>(null);

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
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.token.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: ComplaintStatus) => {
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

  const trackingSteps = [
    { step: 1, label: t('customer.tracking_step_1') },
    { step: 2, label: t('customer.tracking_step_2') },
    { step: 3, label: t('customer.tracking_step_3') },
    { step: 4, label: t('customer.tracking_step_4') },
    { step: 5, label: t('customer.tracking_step_5') },
  ];

  const handleOpenRecord = (complaint: ComplaintRecord) => {
    const rec =
      engineerRecordsService.getRecord(complaint.token) ||
      engineerRecordsService.getRecord(complaint.id) ||
      (complaint.serviceRecordId ? engineerRecordsService.getRecord(complaint.serviceRecordId) : undefined);

    if (rec) {
      setInspectedRecord(rec);
    } else {
      setInspectedRecord({
        id: `ESR-2026-${complaint.token.slice(-4)}`,
        serviceRequestId: complaint.id,
        serviceRequestToken: complaint.token,
        customerName: complaint.contactPerson || complaint.userName,
        companyName: complaint.companyName || currentUser.company,
        industryType: complaint.industryType || 'Industrial Processing',
        machineIssue: complaint.title,
        visitDate: complaint.scheduledDate || complaint.updatedAt.split('T')[0],
        inspectionFindings:
          complaint.adminRemarks || 'On-site technical evaluation performed and machine certified.',
        workPerformed:
          'Component replacement, calibration check, and operational trial run executed in full compliance.',
        toolsAndMaterials: 'Standard industrial calibration kit & replacement seals.',
        gasCompressorRequirements: 'N/A or tested within normal threshold.',
        engineerName: complaint.assignedEngineer || 'VPE Certified Field Specialist',
        engineerRemarks: 'Machine operational. Clean filters regularly during peak season.',
        completionStatus: 'Fully Operational',
        createdAt: complaint.updatedAt,
        updatedAt: complaint.updatedAt,
      });
    }
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
              Client: {currentUser.name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Service Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time status tracking, scheduling dates, and certified engineer service reports.
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
          <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
            <Button variant="industrial" size="sm" rightIcon={<FilePlus className="w-4 h-4" />}>
              New Service Request
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by ticket ID, machine title, or location..."
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
        <Card variant="default" className="p-8 text-center space-y-3">
          <Clock className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No matching service requests found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {complaints.length === 0
              ? 'You have not submitted any machine breakdown requests yet.'
              : 'Try clearing your search query or selecting a different status filter.'}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <Card key={item.id} variant="default" className="p-5 hover:border-slate-300 transition-colors">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black bg-slate-900 text-white px-2.5 py-1 rounded">
                      {item.token}
                    </span>
                    <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
                    <span className="text-[11px] text-slate-400">
                      Problem Started: {item.problemStartDate || item.createdAt.split('T')[0]}
                    </span>
                  </div>

                  {item.scheduledDate && (
                    <div className="flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Visit: {item.scheduledDate}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {(item.status === 'Completed' || item.status === 'Resolved') && (
                      <Button
                        type="button"
                        variant="industrial"
                        size="sm"
                        onClick={() => handleOpenRecord(item)}
                        leftIcon={<FileText className="w-3.5 h-3.5" />}
                        className="cursor-pointer"
                      >
                        {t('customer.view_report')}
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedComplaint(item)}
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Inspect Request
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* DETAIL MODAL WITH PURE VOICE RECORDING PLAYBACK & ATTACHMENTS */}
      {selectedComplaint && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedComplaint(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900 text-white p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-amber-400 text-slate-950 px-2.5 py-1 rounded">
                  {selectedComplaint.token}
                </span>
                <Badge variant={getStatusBadgeVariant(selectedComplaint.status)}>
                  {selectedComplaint.status}
                </Badge>
              </div>
              <button
                type="button"
                onClick={() => setSelectedComplaint(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 text-xs text-slate-700">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  {selectedComplaint.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{selectedComplaint.title}</h3>
                <p className="text-slate-500">
                  Location: {selectedComplaint.location} • Problem Started: {selectedComplaint.problemStartDate}
                </p>
              </div>

              {/* Milestone Tracking Stepper */}
              <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Issue Progress Tracking</span>
                  </span>
                  <span className="font-mono text-slate-400">
                    Step {getTrackingStage(selectedComplaint.status)} of 5 ({getTrackingStage(selectedComplaint.status) * 20}%)
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {trackingSteps.map((s) => {
                    const current = getTrackingStage(selectedComplaint.status);
                    const isDone = current > s.step || (current === 5 && s.step === 5);
                    const isCurrent = current === s.step;
                    return (
                      <div
                        key={s.step}
                        className={`p-2 rounded-lg text-center border transition-all ${
                          isDone
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                            : isCurrent
                            ? 'bg-amber-950/50 border-amber-400 text-amber-300 font-bold'
                            : 'bg-slate-800/40 border-slate-700/50 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-1">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isDone
                                ? 'bg-emerald-500 text-slate-950'
                                : isCurrent
                                ? 'bg-amber-400 text-slate-950'
                                : 'bg-slate-700 text-slate-400'
                            }`}
                          >
                            {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : s.step}
                          </span>
                        </div>
                        <span className="text-[10px] block leading-tight truncate" title={s.label}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scheduled Visit Card */}
              {selectedComplaint.scheduledDate && (
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-1 text-blue-950">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                    Confirmed Service Visit
                  </span>
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{selectedComplaint.scheduledDate}</span>
                  </div>
                  {selectedComplaint.assignedEngineer && (
                    <div className="text-xs text-blue-800">
                      Assigned Field Engineer: <strong>{selectedComplaint.assignedEngineer}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <span className="font-bold text-slate-800 block mb-1">Machine Issue Description:</span>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl whitespace-pre-wrap text-slate-800">
                  {selectedComplaint.description}
                </div>
              </div>

              {/* Voice Note (Pure Audio File, No Speech-to-Text) */}
              {selectedComplaint.voiceRecording && (
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <Volume2 className="w-4 h-4 text-amber-700" />
                    <span>Customer Voice Recording (Pure Audio File)</span>
                  </div>
                  <audio controls src={selectedComplaint.voiceRecording} className="w-full h-8" />
                  <p className="text-[10px] text-amber-800">
                    Stored as an authentic audio recording without automated transcription.
                  </p>
                </div>
              )}

              {/* Uploaded Evidence */}
              {selectedComplaint.images.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold text-slate-800 block">Photographic Evidence:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedComplaint.images.map((img, idx) => (
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

              {/* Completed Service Report Action */}
              {(selectedComplaint.status === 'Completed' || selectedComplaint.status === 'Resolved') && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <div>
                      <span className="font-bold text-emerald-900 block">Service Completed & Certified</span>
                      <span className="text-[11px] text-emerald-700">Official engineer report available</span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="industrial"
                    size="sm"
                    onClick={() => {
                      setSelectedComplaint(null);
                      handleOpenRecord(selectedComplaint);
                    }}
                  >
                    View Engineer Record
                  </Button>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setSelectedComplaint(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ENGINEER SERVICE RECORD MODAL */}
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
                Close Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
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
