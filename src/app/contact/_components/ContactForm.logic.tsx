"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export function useContactFormLogic() {
  const { data: session } = useSession();
  
  // State for form fields to allow auto-fill and manual changes
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Auto-fill when session changes
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user?.name || prev.name,
        email: session.user?.email || prev.email
      }));
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Contact form submitted:", formData);
    toast.success("Thank you! Your message has been sent successfully.");
    
    // Clear message but keep user info
    setFormData(prev => ({ ...prev, message: "", subject: "" }));
  };

  return {
    formData,
    handleInputChange,
    handleSubjectChange,
    handleSubmit,
    isLoggedIn: !!session?.user
  };
}
