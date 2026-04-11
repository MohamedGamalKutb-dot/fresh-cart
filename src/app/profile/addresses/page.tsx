import { getServerSession } from "next-auth";
import { authOptions } from "@/components/NextAuth/NextAuth";
import { getLoggedUserAddresses } from "./addresses.services";
import AddressesClient from "./_components/AddressesClient";

export default async function AddressesPage() {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.accessToken || "";

  const initialData = await getLoggedUserAddresses(token);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AddressesClient initialAddresses={initialData?.data || []} token={token} />
    </div>
  );
}
