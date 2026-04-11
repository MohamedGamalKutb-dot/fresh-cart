"use client";

import { useState } from "react";
import { Address, AddAddressPayload } from "../addresses.interface";
import { addAddress, removeAddress, getLoggedUserAddresses } from "../addresses.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useAddressesLogic(initialAddresses: Address[], token: string) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<AddAddressPayload>({
    name: "",
    details: "",
    phone: "",
    city: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: "", details: "", phone: "", city: "" });
    setEditingId(null);
    setIsEditing(false);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleEditClick = (address: Address) => {
    setFormData({
      name: address.name,
      details: address.details,
      phone: address.phone,
      city: address.city,
    });
    setEditingId(address._id);
    setIsEditing(true);
    setIsAdding(true);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!token) {
      toast.error("You must be logged in to manage addresses");
      return;
    }

    // Validation
    if (!formData.name || !formData.details || !formData.phone || !formData.city) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing && editingId) {
        // Since API has no "PUT/PATCH", we simulate by ADDING new and DELETING old
        const addResult = await addAddress(formData, token);
        if (addResult.status === "success") {
           // If added successfully, remove the old one
           const removeResult = await removeAddress(editingId, token);
           
           if (removeResult.status === "success") {
             // The removeResult.data usually contains the final list of addresses
             setAddresses(removeResult.data);
           } else {
             // If removal failed for some reason, we should at least refresh from scratch
             const finalData = await getLoggedUserAddresses(token);
             setAddresses(finalData.data || []);
           }

           setIsAdding(false);
           resetForm();
           toast.success("Address updated successfully");
           router.refresh();
        } else {
          toast.error(addResult.message || "Failed to update address");
        }
      } else {
        const result = await addAddress(formData, token);
        if (result.status === "success") {
          setAddresses(result.data);
          setIsAdding(false);
          resetForm();
          toast.success("Address added successfully");
          router.refresh();
        } else {
          toast.error(result.message || "Failed to add address");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!token) return;

    try {
      const result = await removeAddress(addressId, token);
      if (result.status === "success") {
        setAddresses(result.data);
        toast.success("Address deleted successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete address");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return {
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
  };
}
