import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Spinner className="size-10 text-[#16A34A]" />
    </div>
  );
}
