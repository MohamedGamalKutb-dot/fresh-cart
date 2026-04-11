"use client";

import { useEffect, useState } from "react";
import { UpdateUserDataPayload, UpdatePasswordPayload } from "../settings.interface";
import { updateUserData, updateUserPassword } from "../settings.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useSettingsLogic(token: string) {
  const router = useRouter();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Profile Form State
  const [profileData, setProfileData] = useState<UpdateUserDataPayload>({
    name: "",
    email: "",
    phone: "",
  });

  // Password Form State
  const [passwordData, setPasswordData] = useState<UpdatePasswordPayload>({
    currentPassword: "",
    password: "",
    rePassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Load initial data from localStorage if available
    const savedName = localStorage.getItem("userName") || "";
    // Note: email and phone might not be in localStorage, so they will be empty initially
    setProfileData((prev) => ({ ...prev, name: savedName }));
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsUpdatingProfile(true);
    try {
      const result = await updateUserData(profileData, token);
      if (result.message === "success") {
        toast.success("Profile updated successfully");
        if (result.user.name) {
          localStorage.setItem("userName", result.user.name);
        }
        router.refresh();
      } else {
        toast.error((result as any).message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (passwordData.password !== passwordData.rePassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const result = await updateUserPassword(passwordData, token);
      if (result.message === "success") {
        toast.success("Password changed successfully");
        setPasswordData({
          currentPassword: "",
          password: "",
          rePassword: "",
        });
        router.refresh();
      } else {
        toast.error((result as any).message || "Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return {
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
  };
}
