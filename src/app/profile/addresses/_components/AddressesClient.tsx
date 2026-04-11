"use client";

import React from "react";
import { Plus, Trash2, MapPin, Phone, Building2, Map, Pencil } from "lucide-react";
import AppButton from "@/components/shared/AppButton/AppButton";
import { useAddressesLogic } from "./AddressesClient.logic";
import { Address } from "../addresses.interface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AddressesClientProps {
  initialAddresses: Address[];
  token: string;
}

export default function AddressesClient({ initialAddresses, token }: AddressesClientProps) {
  const {
    addresses,
    isAdding,
    setIsAdding,
    isEditing,
    isSubmitting,
    formData,
    handleInputChange,
    handleSubmit,
    handleDeleteAddress,
    handleEditClick,
    handleOpenAdd,
  } = useAddressesLogic(initialAddresses, token);

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-50">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">My Addresses</h2>
          <p className="text-sm text-gray-500">Manage your saved delivery addresses</p>
        </div>

        <AppButton 
          onClick={handleOpenAdd}
          className="rounded-xl px-6 h-12 font-bold tracking-tight bg-green-600 hover:bg-green-700 transition-all shadow-md shadow-green-600/20 group"
        >
          <Plus size={20} className="mr-2 group-hover:scale-110 transition-transform" />
          Add Address
        </AppButton>

        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogContent className="sm:max-w-[500px] rounded-[32px] p-8 border-none shadow-2xl">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {isEditing ? "Edit Address" : "Add New Address"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-2.5">
                <Label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1">Address Label</Label>
                <div className="relative group">
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Home, Office"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-12 rounded-xl border-gray-200 focus:border-green-500 ring-0 focus:ring-4 focus:ring-green-500/10 transition-all px-4"
                  />
                  <Building2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="grid gap-2.5">
                <Label htmlFor="city" className="text-sm font-bold text-gray-700 ml-1">City</Label>
                <div className="relative group">
                  <Input
                    id="city"
                    name="city"
                    placeholder="e.g., Cairo, Giza"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="h-12 rounded-xl border-gray-200 focus:border-green-500 ring-0 focus:ring-4 focus:ring-green-500/10 transition-all px-4"
                  />
                  <Map size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="grid gap-2.5">
                <Label htmlFor="phone" className="text-sm font-bold text-gray-700 ml-1">Phone Number</Label>
                <div className="relative group">
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="01xxxxxxxxx"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-12 rounded-xl border-gray-200 focus:border-green-500 ring-0 focus:ring-4 focus:ring-green-500/10 transition-all px-4"
                  />
                  <Phone size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="grid gap-2.5">
                <Label htmlFor="details" className="text-sm font-bold text-gray-700 ml-1">Detailed Address</Label>
                <Textarea
                  id="details"
                  name="details"
                  placeholder="Street name, building number, apartment..."
                  className="min-h-[100px] w-full rounded-xl border border-gray-200 bg-white text-sm focus:border-green-500 ring-0 focus:ring-4 focus:ring-green-500/10 transition-all px-4 py-3 outline-none"
                  value={formData.details}
                  onChange={handleInputChange}
                />
              </div>
              <AppButton
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-lg font-bold shadow-lg shadow-green-600/20 mt-2"
              >
                {isSubmitting ? "Saving..." : isEditing ? "Update Address" : "Save Address"}
              </AppButton>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Address Grid */}
      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
            <MapPin size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Saved Addresses</h3>
          <p className="text-gray-500 text-center max-w-[280px]">
             Add your delivery addresses to enjoy a faster checkout experience.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="group relative flex flex-col p-6 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* squircle Icon Box (48x48px) */}
                <div className="w-12 h-12 shrink-0 bg-[#F0FDF4] text-[#16A34A] rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-[#16A34A] group-hover:text-white">
                  <MapPin size={22} />
                </div>
                
                <div className="flex-1 min-w-0 pr-10">
                  <h4 className="text-[17px] font-bold text-[#111827] group-hover:text-[#16A34A] transition-colors leading-tight">
                    {address.name}
                  </h4>
                  <p className="text-[14px] text-[#4B5563] mt-1.5 leading-relaxed line-clamp-2 font-medium">
                    {address.details}
                  </p>

                  {/* Horizontal Divider */}
                  <div className="w-full h-px bg-gray-100 my-5" />

                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-[#6B7280]">
                      <Phone size={15} className="text-gray-400" />
                      <span>{address.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-[#6B7280]">
                      <Building2 size={15} className="text-gray-400" />
                      <span>{address.city}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Right Actions (32x32px each) */}
              <div className="absolute top-5 right-5 flex items-center gap-1.5">
                <button
                  onClick={() => handleEditClick(address)}
                  className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] text-[#4B5563] hover:bg-green-100 hover:text-[#16A34A] rounded-lg transition-all"
                  title="Edit address"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDeleteAddress(address._id)}
                  className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] text-[#4B5563] hover:bg-red-100 hover:text-red-600 rounded-lg transition-all"
                  title="Delete address"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
