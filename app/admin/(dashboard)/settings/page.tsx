"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import Button from "@/components/ui/Button";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand-cyan/60";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setName(data.user.name);
          setEmail(data.user.email);
          setProfileImage(data.user.profileImage || "");
        }
      });
  }, []);

  const save = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/admin/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          profileImage,
          ...(newPassword ? { currentPassword, newPassword } : {}),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to save.");
        return;
      }
      setSuccess("Profile updated.");
      setCurrentPassword("");
      setNewPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-white/50">Manage your admin profile.</p>
      </div>

      <div className="glass space-y-4 p-6">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/60">Profile Photo</label>
          <ImageUploader value={profileImage} onChange={setProfileImage} folder="profile" />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/60">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/60">Email</label>
          <input value={email} disabled className={`${inputClass} opacity-60`} />
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/40">Change Password</p>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputClass}
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {error && <p className="text-sm text-brand-pink">{error}</p>}
        {success && <p className="text-sm text-brand-green">{success}</p>}

        <Button variant="primary" loading={loading} onClick={save} className="text-sm">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
