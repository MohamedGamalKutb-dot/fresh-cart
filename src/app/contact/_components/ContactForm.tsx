"use client";

import AppButton from "@/components/shared/AppButton/AppButton";
import { Send, User, Mail, MessageSquareText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContactFormLogic } from "./ContactForm.logic";

export default function ContactForm() {
  const { 
    formData, 
    handleInputChange, 
    handleSubjectChange, 
    handleSubmit,
    isLoggedIn 
  } = useContactFormLogic();

  return (
    <div className="bg-white rounded-[2rem] border border-[#E9ECEF] p-6 lg:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#16A34A]/10 to-transparent pointer-events-none rounded-bl-[5rem]" />
      
      <div className="relative">
        <h2 className="text-3xl font-extrabold text-[#212529] mb-3 tracking-tight">Send us a Message</h2>
        <p className="text-[#6C757D] mb-10 text-base font-medium max-w-lg">
          Have a question or feedback? We&apos;d love to hear from you. Fill out the form and we&apos;ll get back to you shortly.
        </p>

        {isLoggedIn && (
          <div className="mb-8 p-4 bg-green-50 rounded-2xl flex items-center gap-3 border border-green-100/50">
             <div className="w-10 h-10 rounded-full bg-[#16A34A] text-white flex items-center justify-center font-bold">
               {formData.name.charAt(0).toUpperCase()}
             </div>
             <div>
               <p className="text-sm font-bold text-[#212529]">Welcome back, {formData.name}</p>
               <p className="text-xs text-[#16A34A] font-semibold">Your details have been pre-filled for you.</p>
             </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name" className="text-[15px] font-bold text-[#212529] ml-1">Full Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="px-12 py-6 rounded-2xl border-[#E9ECEF] bg-[#F8F9FA] focus-visible:bg-white focus-visible:ring-[#16A34A]/20 focus-visible:border-[#16A34A] text-[#212529] text-base font-medium shadow-sm transition-all"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="email" className="text-[15px] font-bold text-[#212529] ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="px-12 py-6 rounded-2xl border-[#E9ECEF] bg-[#F8F9FA] focus-visible:bg-white focus-visible:ring-[#16A34A]/20 focus-visible:border-[#16A34A] text-[#212529] text-base font-medium shadow-sm transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="subject" className="text-[15px] font-bold text-[#212529] ml-1">Subject</Label>
            <div className="relative group">
              <Select value={formData.subject} onValueChange={handleSubjectChange} required>
                <SelectTrigger id="subject" className="w-full px-5 border-[#E9ECEF] rounded-2xl bg-[#F8F9FA] focus:bg-white focus:ring-[#16A34A]/20 focus:border-[#16A34A] text-[#212529] text-base font-medium h-[56px] shadow-sm transition-all">
                  <SelectValue placeholder="What is your message about?" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-[#E9ECEF] shadow-xl overflow-hidden p-1">
                  <SelectItem value="support" className="focus:bg-[#16A34A]/10 focus:text-[#16A34A] rounded-xl cursor-pointer py-3 text-base">Customer Support</SelectItem>
                  <SelectItem value="sales" className="focus:bg-[#16A34A]/10 focus:text-[#16A34A] rounded-xl cursor-pointer py-3 text-base">Sales & Orders</SelectItem>
                  <SelectItem value="return" className="focus:bg-[#16A34A]/10 focus:text-[#16A34A] rounded-xl cursor-pointer py-3 text-base">Returns & Refunds</SelectItem>
                  <SelectItem value="other" className="focus:bg-[#16A34A]/10 focus:text-[#16A34A] rounded-xl cursor-pointer py-3 text-base">Other Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="message" className="text-[15px] font-bold text-[#212529] ml-1">Message</Label>
            <div className="relative">
              <MessageSquareText className="absolute left-4 top-5 text-gray-400 pointer-events-none" size={18} />
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                placeholder="How can we help you?"
                className="w-full px-12 py-5 rounded-2xl border-[#E9ECEF] bg-[#F8F9FA] focus-visible:bg-white focus-visible:ring-[#16A34A]/20 focus-visible:border-[#16A34A] text-[#212529] text-base font-medium shadow-sm transition-all resize-none overflow-hidden min-h-[160px]"
                required
              />
            </div>
          </div>

          <AppButton
            type="submit"
            className="bg-[#16A34A] hover:bg-[#15803D] hover:shadow-lg hover:shadow-green-200 text-white flex items-center justify-center gap-3 rounded-2xl h-14 px-10 w-full md:w-auto mt-2 self-start transition-all duration-300"
          >
            <Send size={20} className="group-hover:translate-x-1 transition-transform" />
            <span className="font-bold text-lg">Send Message</span>
          </AppButton>
        </form>
      </div>
    </div>
  );
}
