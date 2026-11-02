import React, { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Card,
  Button,
  Badge,
  Input,
  Textarea,
  FormField,
  Select,
} from '@/components/common';
import { authService, UserProfile } from '@/services/authService';
import { complaintsService, ComplaintRecord } from '@/services/complaintsService';
import {
  engineerRecordsService,
  EngineerServiceRecord,
  NewEngineerRecordPayload,
  CompletionStatus,
} from '@/services/engineerRecordsService';
import { notificationsService } from '@/services/notificationsService';
import {
  Wrench,
  Clock,
  Calendar,
  CheckCircle2,
  FileText,
  MapPin,
  Building2,
  Volume2,
  RefreshCw,
  X,
  Phone,
  Eye,
  Check,
  ShieldCheck,
} from 'lucide-react';

export const EngineerDashboardPage: React.FC = () => {
  const authUser = authService.getCurrentUser();
  const [currentEngineer, setCurrentEngineer] = useState<UserProfile | null>(
    authUser && (authUser.role === 'engineer' || authUser.role === 'admin') ? authUser : null
  );

  const [complaints, setComplaints] = useState<ComplaintRecord[]>(() =>
    complaintsService.getComplaints()
  );
  const [records, setRecords] = useState<EngineerServiceRecord[]>(() =>
    engineerRecordsService.getAllRecords()
  );
  const [activeTab, setActiveTab] = useState<'pending' | 'in_progress' | 'completed'>('pending');
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintRecord | null>(null);
  const [inspectedRecord, setInspectedRecord] = useState<EngineerServiceRecord | null>(null);

  // Engineer Service Record Form Modal State
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [activeJobForRecord, setActiveJobForRecord] = useState<ComplaintRecord | null>(null);
  const [recordFormData, setRecordFormData] = useState<NewEngineerRecordPayload>({
    serviceRequestId: '',
    serviceRequestToken: '',
    customerName: '',
    companyName: '',
    industryType: '',
    machineIssue: '',
    visitDate: new Date().toISOString().split('T')[0],
    inspectionFindings: '',
    workPerformed: '',
    toolsAndMaterials: '',
    gasCompressorRequirements: '',
    engineerName: authUser?.name || 'K. Srinivas (Lead Field Specialist)',
    engineerRemarks: '',
    completionStatus: 'Fully Operational',
  });

  const loadData = useCallback(() => {
    setComplaints(complaintsService.getComplaints());
    setRecords(engineerRecordsService.getAllRecords());
    const user = authService.getCurrentUser();
    if (user && (user.role === 'engineer' || user.role === 'admin')) {
      setCurrentEngineer(user);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(loadData, 4000);
    return () => clearInterval(interval);
  }, [loadData]);

  if (!authUser || (authUser.role !== 'engineer' && authUser.role !== 'admin')) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  const assignedJobs = complaints;

  const pendingJobs = assignedJobs.filter(
    (c) => c.status === 'Submitted' || c.status === 'Under Review' || c.status === 'Scheduled'
  );
  const inProgressJobs = assignedJobs.filter((c) => c.status === 'In Progress');

  // Start On-Site Work Action
  const handleStartWork = (job: ComplaintRecord) => {
    complaintsService.updateComplaintStatus(
      job.id,
      'In Progress',
      `Field engineer ${currentEngineer?.name || 'K. Srinivas'} arrived on site and commenced overhaul.`,
      currentEngineer?.name || 'K. Srinivas'
    );
    loadData();
  };

  // Open Record Modal pre-populated with job details
  const handleOpenRecordForm = (job: ComplaintRecord) => {
    setActiveJobForRecord(job);
    setRecordFormData({
      serviceRequestId: job.id,
      serviceRequestToken: job.token,
      customerName: job.contactPerson || job.userName,
      companyName: job.companyName,
      industryType: job.industryType || 'Agro-Industrial Processing',
      machineIssue: job.title,
      visitDate: job.scheduledDate || new Date().toISOString().split('T')[0],
      inspectionFindings: `On-site diagnostic inspection verified reported issue: "${job.description}". Checked electrical supply tolerances, bearing wear, and alignment.`,
      workPerformed:
        'Disassembled faulty sub-assembly, replaced worn seals/bearings, calibrated sensors, and completed 30-minute operational load trial.',
      toolsAndMaterials:
        'Industrial torque wrench, digital multimeter, vibration analyzer, precision replacement bearings & gaskets.',
      gasCompressorRequirements:
        'Refrigeration compressor suction pressure verified at 2.4 bar. Oil level topped up with ISO VG 68 synthetic.',
      engineerName: currentEngineer?.name || 'K. Srinivas (Lead Field Specialist)',
      engineerRemarks:
        'Machine returned to full factory specifications. Tested at 100% capacity. Recommended next preventive maintenance in 90 days.',
      completionStatus: 'Fully Operational',
    });
    setIsRecordModalOpen(true);
  };

  // Submit Certified Engineer Service Record
  const handleSubmitRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJobForRecord) return;

    // 1. Create permanent Engineer Service Record
    const createdRecord = engineerRecordsService.createRecord(recordFormData);

    // 2. Mark complaint as Completed
    complaintsService.updateComplaintStatus(
      activeJobForRecord.id,
      'Completed',
      `Service successfully executed and certified by ${recordFormData.engineerName}. Record Ref: ${createdRecord.id}.`,
      recordFormData.engineerName,
      createdRecord.id
    );

    // 3. Dispatch completion notification to customer
    notificationsService.notifyCompletion({
      token: activeJobForRecord.token,
      userId: activeJobForRecord.userId,
      engineerName: recordFormData.engineerName,
      statusSummary: recordFormData.completionStatus,
    });

    loadData();
    setIsRecordModalOpen(false);
    setActiveJobForRecord(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Field Engineer Terminal */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Field Engineer Service Terminal
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-300">
              {currentEngineer?.name || 'K. Srinivas'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <Wrench className="w-6 h-6 text-amber-400" />
            <span>Industrial Field Operations & Service Certification</span>
          </h1>
          <p className="text-xs text-slate-400">
            View assigned breakdown jobs, listen to customer fault audio, record technical inspection findings, and certify industrial service records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadData}
            className="p-2.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Refresh assigned jobs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default" className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Assigned Jobs
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{assignedJobs.length}</span>
            <p className="text-[11px] text-slate-500 mt-1">Industrial machine dispatches</p>
          </div>
        </Card>

        <Card variant="default" className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Scheduled / Pending
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-amber-700">{pendingJobs.length}</span>
            <p className="text-[11px] text-slate-500 mt-1">Awaiting on-site visit</p>
          </div>
        </Card>

        <Card variant="industrial" className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              In-Progress Overhaul
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-blue-800">{inProgressJobs.length}</span>
            <p className="text-[11px] text-slate-500 mt-1">Currently on site</p>
          </div>
        </Card>

        <Card variant="default" className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Certified Records
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">{records.length}</span>
            <p className="text-[11px] text-slate-500 mt-1">Certified service certificates</p>
          </div>
        </Card>
      </div>

      {/* Main Tabs Navigation */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-2.5 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'pending'
                ? 'bg-slate-900 text-amber-400 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Scheduled & Pending Jobs ({pendingJobs.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('in_progress')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'in_progress'
                ? 'bg-slate-900 text-amber-400 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Active On-Site ({inProgressJobs.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-slate-900 text-amber-400 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Certified Service Records ({records.length})</span>
          </button>
        </div>

        {/* Tab 1: Scheduled & Pending Jobs */}
        {activeTab === 'pending' && (
          <div className="p-6">
            {pendingJobs.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No pending or scheduled jobs at the moment.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingJobs.map((job) => (
                  <Card key={job.id} variant="default" className="p-5 hover:border-slate-300 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-black bg-slate-900 text-white px-2 py-0.5 rounded">
                            {job.token}
                          </span>
                          <Badge variant={job.status === 'Scheduled' ? 'info' : 'amber'}>
                            {job.status}
                          </Badge>
                          <span className="text-xs text-slate-400">
                            Problem Start: {job.problemStartDate || job.createdAt.split('T')[0]}
                          </span>
                          {job.scheduledDate && (
                            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> Visit: {job.scheduledDate}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                          <span className="flex items-center gap-1 font-medium text-slate-800">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{job.companyName} ({job.contactPerson})</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{job.location}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{job.userPhone}</span>
                          </span>
                        </div>

                        {/* Audio playback banner if customer attached voice recording */}
                        {job.voiceRecording && (
                          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                            <Volume2 className="w-4 h-4 text-amber-600 shrink-0" />
                            <div className="flex-1">
                              <span className="text-[11px] font-bold text-slate-800 block">
                                Customer Machine Fault Voice Recording
                              </span>
                              <audio controls src={job.voiceRecording} className="w-full h-8 mt-1" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                        <Button
                          type="button"
                          variant="industrial"
                          size="sm"
                          onClick={() => handleStartWork(job)}
                          leftIcon={<Clock className="w-3.5 h-3.5" />}
                        >
                          Arrive & Start Work
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedComplaint(job)}
                          leftIcon={<Eye className="w-3.5 h-3.5" />}
                        >
                          Inspect Job Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Active On-Site Overhauls */}
        {activeTab === 'in_progress' && (
          <div className="p-6">
            {inProgressJobs.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No active on-site jobs right now. Pick a scheduled job and click "Arrive & Start Work".
              </div>
            ) : (
              <div className="space-y-4">
                {inProgressJobs.map((job) => (
                  <Card key={job.id} variant="default" className="p-5 border-amber-300 bg-amber-50/20">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-black bg-slate-900 text-white px-2 py-0.5 rounded">
                            {job.token}
                          </span>
                          <Badge variant="amber">In Progress</Badge>
                          <span className="text-xs font-bold text-amber-900">
                            Overhaul Underway at {job.companyName}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
                        <p className="text-xs text-slate-600">{job.description}</p>

                        <div className="p-3 bg-white border border-amber-200 rounded-lg text-xs space-y-1">
                          <span className="font-bold text-slate-900 block">Facility Details:</span>
                          <div className="text-slate-600">
                            {job.companyName} • {job.location} • Contact: {job.contactPerson} ({job.userPhone})
                          </div>
                        </div>

                        {job.voiceRecording && (
                          <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                            <span className="text-[11px] font-bold text-slate-700 block mb-1">
                              Machine Fault Recording:
                            </span>
                            <audio controls src={job.voiceRecording} className="w-full h-8" />
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 space-y-2">
                        <Button
                          type="button"
                          variant="industrial"
                          size="md"
                          onClick={() => handleOpenRecordForm(job)}
                          leftIcon={<ShieldCheck className="w-4 h-4 text-amber-400" />}
                          className="w-full shadow-md"
                        >
                          Complete & Certify Record
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedComplaint(job)}
                          leftIcon={<Eye className="w-3.5 h-3.5" />}
                          className="w-full"
                        >
                          View Full Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Certified Service Records */}
        {activeTab === 'completed' && (
          <div className="p-6">
            {records.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No certified service records issued yet.
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Record ID</th>
                      <th className="p-3.5">Ticket</th>
                      <th className="p-3.5">Customer / Plant</th>
                      <th className="p-3.5">Machine Issue</th>
                      <th className="p-3.5">Visit Date</th>
                      <th className="p-3.5">Engineer</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Certificate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {records.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-slate-900">{rec.id}</td>
                        <td className="p-3.5 font-mono text-slate-600">{rec.serviceRequestToken || '-'}</td>
                        <td className="p-3.5 font-medium text-slate-800">{rec.companyName}</td>
                        <td className="p-3.5 text-slate-600 truncate max-w-xs">{rec.machineIssue}</td>
                        <td className="p-3.5 text-slate-600">{rec.visitDate}</td>
                        <td className="p-3.5 font-medium text-slate-900">{rec.engineerName}</td>
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
                            Inspect
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* MODAL: 10-FIELD CERTIFIED ENGINEER SERVICE RECORD FORM */}
      {/* ============================================================ */}
      {isRecordModalOpen && activeJobForRecord && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsRecordModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900 text-white p-5 flex items-center justify-between z-10 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">
                  Certify Engineer Service Record: {activeJobForRecord.token}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsRecordModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitRecord} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Service Ticket</span>
                  <span className="font-mono font-bold text-slate-900">{activeJobForRecord.token}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Client Company</span>
                  <span className="font-bold text-slate-900">{activeJobForRecord.companyName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Facility Location</span>
                  <span className="font-medium text-slate-700">{activeJobForRecord.location}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Certified By</span>
                  <span className="font-bold text-amber-700">{recordFormData.engineerName}</span>
                </div>
              </div>

              {/* Audio playback inside form for engineer verification */}
              {activeJobForRecord.voiceRecording && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-amber-700" />
                    Customer Voice Recording Attached:
                  </span>
                  <audio controls src={activeJobForRecord.voiceRecording} className="w-full h-8" />
                </div>
              )}

              {/* 10 Required Technical Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField id="rec-date" label="1. On-Site Service Visit Date" required>
                  <Input
                    id="rec-date"
                    type="date"
                    value={recordFormData.visitDate}
                    onChange={(e) => setRecordFormData((p) => ({ ...p, visitDate: e.target.value }))}
                    required
                  />
                </FormField>

                <FormField id="rec-company" label="2. Customer & Plant Name" required>
                  <Input
                    id="rec-company"
                    value={recordFormData.companyName}
                    onChange={(e) => setRecordFormData((p) => ({ ...p, companyName: e.target.value }))}
                    required
                  />
                </FormField>
              </div>

              <FormField id="rec-issue" label="3. Machine Issue / Reported Fault" required>
                <Input
                  id="rec-issue"
                  value={recordFormData.machineIssue}
                  onChange={(e) => setRecordFormData((p) => ({ ...p, machineIssue: e.target.value }))}
                  required
                />
              </FormField>

              <FormField id="rec-findings" label="4. Inspection Findings & Diagnostics" required>
                <Textarea
                  id="rec-findings"
                  rows={2}
                  value={recordFormData.inspectionFindings}
                  onChange={(e) => setRecordFormData((p) => ({ ...p, inspectionFindings: e.target.value }))}
                  placeholder="Root cause diagnosis, component wear, electrical tolerances measured..."
                  required
                />
              </FormField>

              <FormField id="rec-work" label="5. Work Performed & Mechanical Overhaul" required>
                <Textarea
                  id="rec-work"
                  rows={2}
                  value={recordFormData.workPerformed}
                  onChange={(e) => setRecordFormData((p) => ({ ...p, workPerformed: e.target.value }))}
                  placeholder="Repairs executed, component replacements, sensor calibration, alignment..."
                  required
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField id="rec-tools" label="6. Tools & Materials Used" required>
                  <Textarea
                    id="rec-tools"
                    rows={2}
                    value={recordFormData.toolsAndMaterials}
                    onChange={(e) => setRecordFormData((p) => ({ ...p, toolsAndMaterials: e.target.value }))}
                    placeholder="Torque wrenches, dial indicators, gaskets, bearings, grease..."
                    required
                  />
                </FormField>

                <FormField id="rec-gas" label="7. Additional Gas / Compressor Requirements">
                  <Textarea
                    id="rec-gas"
                    rows={2}
                    value={recordFormData.gasCompressorRequirements}
                    onChange={(e) =>
                      setRecordFormData((p) => ({ ...p, gasCompressorRequirements: e.target.value }))
                    }
                    placeholder="Ammonia (R-717) / Freon charge status, compressor oil top-up, receiver pressure..."
                  />
                </FormField>
              </div>

              <FormField id="rec-remarks" label="8. Engineer Remarks & Preventative Guidance" required>
                <Textarea
                  id="rec-remarks"
                  rows={2}
                  value={recordFormData.engineerRemarks}
                  onChange={(e) => setRecordFormData((p) => ({ ...p, engineerRemarks: e.target.value }))}
                  placeholder="Operational recommendations, scheduled servicing intervals..."
                  required
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField id="rec-eng-name" label="9. Certified Engineer Name" required>
                  <Input
                    id="rec-eng-name"
                    value={recordFormData.engineerName}
                    onChange={(e) => setRecordFormData((p) => ({ ...p, engineerName: e.target.value }))}
                    required
                  />
                </FormField>

                <FormField id="rec-status" label="10. Completion Status" required>
                  <Select
                    id="rec-status"
                    value={recordFormData.completionStatus}
                    onChange={(e) =>
                      setRecordFormData((p) => ({
                        ...p,
                        completionStatus: e.target.value as CompletionStatus,
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

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsRecordModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="industrial" size="sm" leftIcon={<Check className="w-4 h-4" />}>
                  Issue Certified Service Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: INSPECT CERTIFIED SERVICE RECORD DETAILS */}
      {/* ============================================================ */}
      {inspectedRecord && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setInspectedRecord(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {inspectedRecord.id}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">Certified Engineer Service Record</h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectedRecord(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Plant / Customer</span>
                  <span className="font-bold text-slate-900">{inspectedRecord.companyName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Visit Date</span>
                  <span className="font-medium text-slate-800">{inspectedRecord.visitDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
                  <Badge variant="success">{inspectedRecord.completionStatus}</Badge>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Machine Issue:</span>
                <p className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">{inspectedRecord.machineIssue}</p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Inspection Findings:</span>
                <p className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg whitespace-pre-line">{inspectedRecord.inspectionFindings}</p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Work Performed:</span>
                <p className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg whitespace-pre-line">{inspectedRecord.workPerformed}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Tools & Materials:</span>
                  <p className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">{inspectedRecord.toolsAndMaterials}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Gas / Compressor Requirements:</span>
                  <p className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-950 font-medium">
                    {inspectedRecord.gasCompressorRequirements || 'None required.'}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-900 text-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                  Engineer Remarks & Certification
                </span>
                <p className="text-xs">{inspectedRecord.engineerRemarks}</p>
                <div className="pt-1 text-[10px] text-slate-400 font-mono">
                  Certified By: {inspectedRecord.engineerName}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="secondary" size="sm" onClick={() => setInspectedRecord(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for Selected Job */}
      {selectedComplaint && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedComplaint(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Service Request: {selectedComplaint.token}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedComplaint(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">{selectedComplaint.companyName}</span>
                <span className="text-slate-600 block">Contact: {selectedComplaint.contactPerson} ({selectedComplaint.userPhone})</span>
                <span className="text-slate-500 block">Location: {selectedComplaint.location}</span>
              </div>

              <div>
                <span className="font-bold text-slate-800 block">Machine Issue:</span>
                <p className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">{selectedComplaint.title}</p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block">Problem Description:</span>
                <p className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">{selectedComplaint.description}</p>
              </div>

              {selectedComplaint.voiceRecording && (
                <div>
                  <span className="font-bold text-slate-800 block mb-1">Customer Voice Recording:</span>
                  <audio controls src={selectedComplaint.voiceRecording} className="w-full h-8" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedComplaint(null)}>
                Close
              </Button>
              {selectedComplaint.status !== 'Completed' && (
                <Button
                  variant="industrial"
                  size="sm"
                  onClick={() => {
                    const complaint = selectedComplaint;
                    setSelectedComplaint(null);
                    handleOpenRecordForm(complaint);
                  }}
                >
                  Certify Record
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
