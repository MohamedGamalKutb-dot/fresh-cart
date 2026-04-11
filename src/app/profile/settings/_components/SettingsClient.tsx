"use client";

import React from "react";
import { User, Lock, Eye, EyeOff, ShieldCheck, Mail, Phone, Fingerprint, Award, Save } from "lucide-react";
import AppButton from "@/components/shared/AppButton/AppButton";
import { useSettingsLogic } from "./SettingsClient.logic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface SettingsClientProps {
  token: string;
}

export default function SettingsClient({ token }: SettingsClientProps) {
  const {
    profileData,
    passwordData,
    isUpdatingProfile,
    isUpdatingPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleProfileChange,
    handlePasswordChange,
    onUpdateProfile,
    onUpdatePassword,
  } = useSettingsLogic(token);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-[28px] font-bold text-gray-900 mb-1.5 tracking-tight">Account Settings</h1>
        <p className="text-[15px] text-gray-500 font-medium">Update your profile information and change your password</p>
      </div>

      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm divide-y divide-gray-100">
        {/* Profile Information Section */}
        <section className="p-6 md:p-8 lg:p-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
              <p className="text-sm text-gray-500 font-medium">Update your personal details</p>
            </div>
          </div>

          <form onSubmit={onUpdateProfile} className="max-w-full space-y-7">
            <div className="space-y-2.5">
              <Label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                placeholder="Enter your name"
                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-green-500 ring-0 focus:ring-4 focus:ring-green-500/10 transition-all px-4"
              />
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleProfileChange}
                placeholder="Enter your email"
                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-green-500 ring-0 focus:ring-4 focus:ring-green-500/10 transition-all px-4"
              />
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="phone" className="text-sm font-bold text-gray-700 ml-1">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                placeholder="01xxxxxxxxx"
                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-green-500 ring-0 focus:ring-4 focus:ring-green-500/10 transition-all px-4"
              />
            </div>

            <div className="pt-4">
              <AppButton
                type="submit"
                disabled={isUpdatingProfile}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-8 h-12 font-bold shadow-lg shadow-green-600/20 group"
              >
                <Save size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                {isUpdatingProfile ? "Saving..." : "Save Changes"}
              </AppButton>
            </div>
          </form>
        </section>

        {/* Account Information (Read-only) */}
        <section className="p-6 md:p-8 lg:p-10 bg-gray-50/30">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white border border-gray-100 text-gray-400 rounded-full flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Account Information</h2>
              <p className="text-sm text-gray-500 font-medium">Logged in session details</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex items-center gap-4">
               <Fingerprint className="text-gray-300" size={24} />
               <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">User ID</p>
                  <p className="text-[13px] font-mono text-gray-600 truncate max-w-[180px]">FreshCart_User_001</p>
               </div>
            </div>
            <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <Award className="text-gray-300" size={24} />
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Role</p>
                    <p className="text-[13px] font-bold text-gray-700">Member</p>
                  </div>
               </div>
               <Badge className="bg-green-50 text-green-700 border-green-100 hover:bg-green-100 rounded-lg px-3 py-1 font-bold text-[11px]">USER</Badge>
            </div>
          </div>
        </section>
        </div>
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm divide-y divide-gray-100 mt-8">
        {/* Change Password Section */}
        <section className="p-6 md:p-8 lg:p-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
              <Lock size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
              <p className="text-sm text-gray-500 font-medium">Secure your account with a strong password</p>
            </div>
          </div>

          <form onSubmit={onUpdatePassword} className="max-w-full space-y-7">
            <div className="space-y-2.5">
              <Label htmlFor="currentPassword" title="Current Password" className="text-sm font-bold text-gray-700 ml-1">Current Password</Label>
              <div className="relative group">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-amber-500 ring-0 focus:ring-4 focus:ring-amber-500/10 transition-all px-4"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors"
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="password" title="New Password" className="text-sm font-bold text-gray-700 ml-1">New Password</Label>
              <div className="relative group">
                <Input
                  id="password"
                  name="password"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.password}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-amber-500 ring-0 focus:ring-4 focus:ring-amber-500/10 transition-all px-4"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-[11px] text-gray-400 font-bold ml-1.5 flex items-center gap-1.5">
                <span className="w-1 h-1 bg-amber-400 rounded-full" />
                Must be at least 6 characters
              </p>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="rePassword" title="Confirm Password" className="text-sm font-bold text-gray-700 ml-1">Confirm New Password</Label>
              <div className="relative group">
                <Input
                  id="rePassword"
                  name="rePassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.rePassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-amber-500 ring-0 focus:ring-4 focus:ring-amber-500/10 transition-all px-4"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <AppButton
                type="submit"
                disabled={isUpdatingPassword}
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-8 h-12 font-bold shadow-lg shadow-amber-500/20 group"
              >
                <Lock size={18} className="mr-2 group-hover:rotate-12 transition-transform" />
                {isUpdatingPassword ? "Updating..." : "Change Password"}
              </AppButton>
            </div>
          </form>
        </section>
        </div>
      </div>
    
  );
}
