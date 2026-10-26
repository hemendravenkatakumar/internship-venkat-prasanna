import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Button,
  Badge,
  FormField,
  Input,
  Select,
  Textarea,
} from '@/components/common';
import { authService } from '@/services/authService';
import { complaintsService, ComplaintRecord } from '@/services/complaintsService';
import {
  FilePlus,
  Image as ImageIcon,
  Mic,
  Square,
  Play,
  Pause,
  Trash2,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Clock,
  UploadCloud,
  FileCheck,
  Volume2,
} from 'lucide-react';

const CATEGORIES = [
  'Equipment Breakdown',
  'Power & Electrical Failure',
  'Mechanical Jam / Failure',
  'Supply & Resource Disruption',
  'Structural & Facility Safety',
  'Water / Medical Relief Logistics',
  'Other Operational Malfunction',
];

export const CustomerServiceRequestPage: React.FC = () => {
  const currentUser = authService.getCurrentUser();

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(currentUser?.location || 'Tadepalligudem Industrial Zone, AP');
  const [images, setImages] = useState<string[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Validation & Submission State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState<ComplaintRecord | null>(null);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);

  // Audio Playback State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  if (!currentUser) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  // Handle Image Upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert('Please upload valid image files (JPG, PNG, WEBP).');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Each image must be under 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Voice Recording via Microphone
  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Audio recording is not supported in this browser. Please use the file upload option.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setAudioUrl(reader.result);
          }
        };
        reader.readAsDataURL(audioBlob);

        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: unknown) {
      console.error('Microphone access error:', err);
      alert('Could not access microphone. Please check browser permissions or upload an audio file.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
  };

  const handleAudioFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Please upload a valid audio file (MP3, WAV, M4A, OGG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAudioUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleAudioPlayback = () => {
    if (!audioPlayerRef.current) return;
    if (isPlayingAudio) {
      audioPlayerRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Complaint title is required.';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters.';
    }

    if (!category) {
      newErrors.category = 'Please select a complaint category.';
    }

    if (!description.trim()) {
      newErrors.description = 'Detailed problem description is required.';
    } else if (description.trim().length < 15) {
      newErrors.description = 'Please provide at least 15 characters describing the malfunction.';
    }

    if (!location.trim()) {
      newErrors.location = 'Problem location or machine line is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent duplicate clicks
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const created = await complaintsService.submitComplaint({
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        userPhone: currentUser.phone,
        title,
        category,
        description,
        location,
        images,
        voiceRecording: audioUrl,
      });

      setSubmittedComplaint(created);
    } catch (err: unknown) {
      console.error('Submission failed:', err);
      alert('An error occurred while submitting your complaint. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForNew = () => {
    setTitle('');
    setCategory(CATEGORIES[0]);
    setDescription('');
    setLocation(currentUser.location || 'Tadepalligudem Industrial Zone, AP');
    setImages([]);
    setAudioUrl(null);
    setErrors({});
    setSubmittedComplaint(null);
  };

  // SUCCESS CONFIRMATION VIEW
  if (submittedComplaint) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Card variant="default" className="border-emerald-200 bg-emerald-50/40 p-6 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <Badge variant="success" icon={<FileCheck className="w-3.5 h-3.5" />}>
              Complaint Submitted Successfully
            </Badge>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Incident Token Generated
            </h2>

            <div className="bg-white border-2 border-emerald-300 rounded-xl p-4 inline-block shadow-xs">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                Official Tracking Token
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-800 tracking-wider">
                {submittedComplaint.token}
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              Your complaint <span className="font-semibold text-slate-900">"{submittedComplaint.title}"</span> has been
              saved to persistent operational storage and routed to the Operations Admin Console.
            </p>

            <div className="bg-white/80 border border-emerald-200 rounded-lg p-3 text-xs text-slate-600 text-left space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Timestamp:</span>
                <span className="font-mono">{new Date(submittedComplaint.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Admin Notification:</span>
                <span className="text-emerald-700 font-medium">Dispatched to admin inbox</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Initial Status:</span>
                <span className="font-semibold text-amber-700">{submittedComplaint.status}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link to={ROUTES.CUSTOMER.REQUESTS}>
              <Button variant="industrial" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Track Complaint in My Complaints
              </Button>
            </Link>

            <Button variant="secondary" size="md" onClick={handleResetForNew}>
              Submit Another Complaint
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // STANDARD FORM VIEW
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="amber" icon={<FilePlus className="w-3.5 h-3.5" />}>
            Submit Incident & Complaint
          </Badge>
          <span className="text-xs font-mono text-slate-500">
            ReliefNet Resource & Service Dispatch
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Register Equipment or Resource Complaint
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Provide detailed specifications, photographic evidence, location coordinates, and a voice explanation.
          A unique tracking token will be generated immediately.
        </p>
      </div>

      <Card variant="default" className="shadow-xs border-slate-200">
        <form onSubmit={handleSubmit} noValidate>
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Incident Details Form</CardTitle>
                <p className="text-xs text-slate-500">
                  Submitting as: <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.email})
                </p>
              </div>
              <span className="text-xs text-red-600 font-medium">* Required fields</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6 sm:p-8">
            {/* 1. Complaint Title */}
            <FormField
              id="complaint-title"
              label="Complaint Title"
              required
              error={errors.title}
              helperText="Concise summary of the problem or breakdown"
            >
              <Input
                id="complaint-title"
                placeholder="e.g. Sortex Optical Sensor Error or Conveyor Belt Snapped"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
                }}
                error={Boolean(errors.title)}
                disabled={isSubmitting}
              />
            </FormField>

            {/* 2. Category & Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <FormField
                id="complaint-category"
                label="Complaint Category"
                required
                error={errors.category}
              >
                <Select
                  id="complaint-category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (errors.category) setErrors((prev) => ({ ...prev, category: '' }));
                  }}
                  disabled={isSubmitting}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField
                id="complaint-location"
                label="Problem Location / Machine Bay"
                required
                error={errors.location}
                helperText="Plant section, mill line, or physical site address"
              >
                <Input
                  id="complaint-location"
                  placeholder="e.g. Mill Unit 2, Line B, Tadepalligudem, AP"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                  }}
                  leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
                  error={Boolean(errors.location)}
                  disabled={isSubmitting}
                />
              </FormField>
            </div>

            {/* 3. Problem Description */}
            <FormField
              id="complaint-description"
              label="Detailed Problem Description"
              required
              error={errors.description}
              helperText="Explain symptoms, error codes, machinery behavior, and previous troubleshooting"
            >
              <Textarea
                id="complaint-description"
                rows={4}
                placeholder="Describe exactly what occurred, current machine status, potential risks, and required technical intervention..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
                }}
                error={Boolean(errors.description)}
                disabled={isSubmitting}
              />
            </FormField>

            {/* 4. Photographic Evidence (Multiple Images) */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-600" />
                    <span>Upload Machine Images / Photographic Evidence</span>
                  </label>
                  <span className="text-xs text-slate-500">
                    Attach photos of error screens, damaged components, or broken mechanisms (Max 5MB each)
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {images.length} Image{images.length === 1 ? '' : 's'} Selected
                </span>
              </div>

              {/* Upload Dropzone / Button */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="flex-1 w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl bg-slate-50/60 hover:bg-amber-50/20 cursor-pointer transition-colors group">
                  <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-amber-600 mb-1 transition-colors" />
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-amber-900">
                    Click to browse or drop images here
                  </span>
                  <span className="text-[11px] text-slate-400">PNG, JPG, WEBP up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                </label>
              </div>

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {images.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-100 group"
                    >
                      <img
                        src={imgSrc}
                        alt={`Evidence ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-md bg-slate-900/80 text-white hover:bg-red-600 transition-colors cursor-pointer"
                        title="Remove image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Voice Recording & Audio File Upload */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Mic className="w-4 h-4 text-amber-600" />
                    <span>Voice Recording or Audio File Upload</span>
                  </label>
                  <span className="text-xs text-slate-500">
                    Explain the problem verbally for technician triage using your microphone or an audio file
                  </span>
                </div>
                {audioUrl && (
                  <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>
                    Voice Note Ready
                  </Badge>
                )}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  {!isRecording ? (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={startRecording}
                      disabled={isSubmitting}
                      leftIcon={<Mic className="w-4 h-4 text-red-600" />}
                    >
                      Record Voice Note
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={stopRecording}
                      leftIcon={<Square className="w-4 h-4" />}
                    >
                      Stop Recording ({formatTimer(recordingSeconds)})
                    </Button>
                  )}

                  <span className="text-xs text-slate-400">or</span>

                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 cursor-pointer transition-colors">
                    <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
                    <span>Upload Audio File (MP3/WAV)</span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioFileUpload}
                      className="hidden"
                      disabled={isSubmitting || isRecording}
                    />
                  </label>

                  {audioUrl && (
                    <button
                      type="button"
                      onClick={() => setAudioUrl(null)}
                      className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Audio</span>
                    </button>
                  )}
                </div>

                {/* Interactive Audio Player Preview */}
                {audioUrl && (
                  <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={toggleAudioPlayback}
                      className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer"
                    >
                      {isPlayingAudio ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
                        <span className="flex items-center gap-1">
                          <Volume2 className="w-3 h-3 text-amber-600" />
                          <span>Voice Recording Playback</span>
                        </span>
                        <span>Ready</span>
                      </div>
                      <audio
                        ref={audioPlayerRef}
                        src={audioUrl}
                        onEnded={() => setIsPlayingAudio(false)}
                        controls
                        className="w-full h-8"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          {/* Card Footer with Submit Action */}
          <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-50/80 border-t border-slate-100">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Token will be generated & logged to Admin Console immediately</span>
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link to={ROUTES.CUSTOMER.DASHBOARD} className="w-full sm:w-auto">
                <Button variant="secondary" size="md" fullWidth disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                variant="industrial"
                size="md"
                fullWidth
                isLoading={isSubmitting}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Submit Complaint
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
