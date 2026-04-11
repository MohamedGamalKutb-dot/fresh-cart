"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function useNewsletterLogic() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-fill email from session if user is logged in
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Pre-fill email from session if user is logged in
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success("Successfully subscribed to our newsletter!", {
        description: `We'll send updates to ${email}.`,
      });
      // Always clear the input after subscription for visual confirmation
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    handleSubscribe,
    session,
    isVisible,
    containerRef
  };
}
