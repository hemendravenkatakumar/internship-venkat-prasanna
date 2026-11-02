import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from './Button';
import {
  Mic,
  Square,
  Play,
  Pause,
  Trash2,
  RotateCcw,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Upload,
  Radio,
} from 'lucide-react';

export interface VoiceRecorderProps {
  audioUrl: string | null;
  onAudioChange: (dataUrl: string | null) => void;
  className?: string;
}

/**
 * VoiceRecorder Component — Strict 6-Step Industrial Voice Workflow
 * 1. Customer clicks Record.
 * 2. Customer records the machine issue (visual timer, audio waves, Stop button).
 * 3. Customer can play back the recording (Play/Pause, seekbar, time display).
 * 4. Customer can delete or re-record.
 * 5. Customer submits the audio along with the service request.
 * 6. Stored and transmitted directly as pure audio file (Zero speech-to-text).
 */
export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  audioUrl,
  onAudioChange,
  className = '',
}) => {
  const { t } = useLanguage();

  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [recorderError, setRecorderError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Step 1 & 2: Start Recording
  const startRecording = async () => {
    setRecorderError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setRecorderError('Microphone not supported on this device. Please upload an audio file instead.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
        mimeType = 'audio/ogg';
      }

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            onAudioChange(reader.result);
          }
        };
        reader.readAsDataURL(audioBlob);

        // Stop all mic tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start(200); // 200ms slice
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: unknown) {
      console.error('Audio capture error:', err);
      setRecorderError(
        'Could not access microphone. Please grant permission in browser settings or use audio file upload.'
      );
    }
  };

  // Step 2 Stop: Stop Recording
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

  // Step 3: Playback Toggle
  const togglePlay = () => {
    if (!audioPlayerRef.current) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioPlayerRef.current) {
      setPlaybackTime(audioPlayerRef.current.currentTime);
      setPlaybackDuration(audioPlayerRef.current.duration || 0);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setPlaybackTime(0);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = time;
      setPlaybackTime(time);
    }
  };

  // Step 4: Delete Recording
  const deleteRecording = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    setIsPlaying(false);
    setPlaybackTime(0);
    setPlaybackDuration(0);
    onAudioChange(null);
  };

  // Step 4: Re-record Audio
  const reRecordAudio = () => {
    deleteRecording();
    setTimeout(() => {
      startRecording();
    }, 150);
  };

  // File Upload Fallback
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Please select a valid audio file (MP3, WAV, M4A, OGG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onAudioChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`border border-slate-200 rounded-xl p-5 bg-white shadow-xs ${className}`}>
      {/* Hidden Audio Element for Playback */}
      {audioUrl && (
        <audio
          ref={audioPlayerRef}
          src={audioUrl}
          onTimeUpdate={handleAudioTimeUpdate}
          onEnded={handleAudioEnded}
          onLoadedMetadata={handleAudioTimeUpdate}
          className="hidden"
        />
      )}

      {/* Header with Title and No-Speech-to-Text guarantee */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Mic className="w-4 h-4 text-amber-500" />
            <span>{t('voice.section_title')}</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">{t('voice.section_desc')}</p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full text-[11px] font-medium border border-amber-200/60 self-start sm:self-auto">
          <Volume2 className="w-3.5 h-3.5 text-amber-600" />
          <span>Pure Audio (No Text Conversion)</span>
        </div>
      </div>

      {/* Error alert if mic access blocked */}
      {recorderError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">{recorderError}</p>
          </div>
        </div>
      )}

      {/* WORKFLOW VIEW: */}
      {!audioUrl && !isRecording && (
        /* Step 1: Initial State (Click Record) */
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-3 bg-slate-50/70 border border-dashed border-slate-300 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">
                1. {t('voice.step1_record')}
              </p>
              <p className="text-[11px] text-slate-500">
                Explain abnormal rattling, grinding, error codes, or sensor failures.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="industrial"
              size="sm"
              onClick={startRecording}
              leftIcon={<Mic className="w-4 h-4 text-white" />}
              className="flex-1 sm:flex-none justify-center cursor-pointer shadow-sm"
            >
              {t('voice.step1_record')}
            </Button>
            <label className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer shadow-xs">
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span>Upload Audio</span>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      {isRecording && (
        /* Step 2: Customer is recording the machine issue */
        <div className="p-5 bg-red-50/70 border-2 border-red-300 rounded-xl space-y-4 animate-pulse-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="w-4 h-4 rounded-full bg-red-600 block animate-ping absolute inset-0 opacity-75" />
                <span className="w-4 h-4 rounded-full bg-red-600 block relative" />
              </div>
              <div>
                <span className="text-xs font-bold text-red-800 tracking-wide uppercase">
                  2. {t('voice.step2_recording')}
                </span>
                <p className="text-xs text-red-700 font-medium">{t('voice.step2_speak')}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="font-mono text-base font-bold text-red-900 bg-white px-3 py-1 rounded-md border border-red-200 shadow-xs">
                {formatTime(recordingSeconds)}
              </span>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={stopRecording}
                leftIcon={<Square className="w-4 h-4 fill-current" />}
                className="cursor-pointer font-bold shadow-sm"
              >
                {t('voice.step2_stop')}
              </Button>
            </div>
          </div>

          {/* Sound wave visualizer animation */}
          <div className="flex items-center justify-center gap-1.5 h-8 py-1 bg-white/80 rounded-lg border border-red-200/80">
            {[40, 70, 30, 90, 60, 100, 50, 85, 45, 95, 65, 30, 75, 40].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-red-500 rounded-full transition-all duration-300 animate-pulse"
                style={{
                  height: `${Math.max(20, (h * (recordingSeconds % 3 + 1)) / 3)}%`,
                  animationDelay: `${i * 70}ms`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {audioUrl && !isRecording && (
        /* Steps 3, 4, 5: Customer can play back, delete or re-record, and submit */
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-600" />
              <span>3. {t('voice.step3_playback')}</span>
            </span>
            <span className="text-xs font-mono font-medium text-slate-500">
              {formatTime(playbackTime)} / {formatTime(playbackDuration || 0)}
            </span>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer shadow-sm"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause playback' : 'Play playback'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <div className="flex-1">
              <input
                type="range"
                min={0}
                max={playbackDuration || 100}
                value={playbackTime}
                onChange={handleSeek}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
              />
            </div>
          </div>

          {/* Step 4 & 5: Delete or Re-record & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>5. {t('voice.step5_ready')}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={reRecordAudio}
                leftIcon={<RotateCcw className="w-3.5 h-3.5 text-slate-600" />}
                className="cursor-pointer text-xs"
              >
                4. {t('voice.step4_rerecord')}
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={deleteRecording}
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                className="cursor-pointer text-xs"
              >
                {t('voice.step4_delete')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
