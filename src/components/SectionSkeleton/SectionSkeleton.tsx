import { Loader2 } from "lucide-react";

export default function SectionSkeleton() {
  return (
    <div className="flex justify-center items-center py-16 w-full">
      <Loader2 className="w-10 h-10 text-[#0aad0a] animate-spin" />
    </div>
  );
}
