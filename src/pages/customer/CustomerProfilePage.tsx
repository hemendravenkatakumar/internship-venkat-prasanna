import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Badge, FormField, Input } from '@/components/common';
import { authService } from '@/services/authService';
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  CheckCircle2,
  Save,
  ShieldCheck,
} from 'lucide-react';

export const CustomerProfilePage: React.FC = () => {
  const initialUser = authService.getCurrentUser();

  const [name, setName] = useState(initialUser?.name || '');
  const [email, setEmail] = useState(initialUser?.email || '');
  const [phone, setPhone] = useState(initialUser?.phone || '');
  const [company, setCompany] = useState(initialUser?.company || '');
  const [location, setLocation] = useState(initialUser?.location || '');
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!initialUser) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!email.trim()) newErrors.email = 'Email address is required.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    authService.updateProfile(initialUser.id, {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      location: location.trim(),
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="amber" icon={<User className="w-3.5 h-3.5" />}>
            Client Profile Management
          </Badge>
          <span className="text-xs font-mono text-slate-500">
            Account ID: {initialUser.id}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          User & Plant Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Update your contact details, facility address, and plant credentials for fast technical mobilization.
        </p>
      </div>

      {isSaved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-sm text-emerald-900 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Profile updated and synchronized to persistent storage successfully.</span>
        </div>
      )}

      <Card variant="default">
        <form onSubmit={handleSave}>
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-lg">
                {name.charAt(0).toUpperCase()}
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg">{name}</CardTitle>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <span className="capitalize font-semibold text-amber-700">{initialUser.role}</span>
                  <span>•</span>
                  <span>Member since {new Date(initialUser.joinedAt).toLocaleDateString()}</span>
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField id="profile-name" label="Full Name" required error={errors.name}>
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  leftIcon={<User className="w-4 h-4 text-slate-400" />}
                />
              </FormField>

              <FormField id="profile-email" label="Contact Email" required error={errors.email}>
                <Input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField id="profile-phone" label="Mobile / Emergency Phone" required error={errors.phone}>
                <Input
                  id="profile-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
                />
              </FormField>

              <FormField id="profile-company" label="Company / Plant Name">
                <Input
                  id="profile-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  leftIcon={<Building2 className="w-4 h-4 text-slate-400" />}
                />
              </FormField>
            </div>

            <FormField 
              id="profile-location" 
              label="Operating Location / Industrial Zone"
              helperText="Used to filter applicable active services in your area"
            >
              <Input
                id="profile-location"
                placeholder="e.g. Tadepalligudem, AP"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
              />
            </FormField>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Encrypted Profile Persistence</span>
              </span>
              <span className="font-mono text-slate-400">LocalStorage & Session Synced</span>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-end p-5 bg-slate-50/60 border-t border-slate-100">
            <Button
              type="submit"
              variant="industrial"
              size="md"
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Profile Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
