import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    
    <div className="fixed inset-0 z-[9999] bg-main-color flex justify-center items-center  ">
        <Spinner className="size-50"/>
        </div>
  );
}
