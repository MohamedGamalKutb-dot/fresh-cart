import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/NextAuth/NextAuth";
import SettingsClient from "./_components/SettingsClient";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.accessToken || "";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SettingsClient token={token} />
    </div>
  );
}
