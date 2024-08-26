"use client";
import { Home, LucideShare, LucideShrink, MessageSquare } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function RedirectBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex space-x-6 mt-8">
      {pathname !== "/" && (
        <button
          className="flex items-center justify-center w-12 h-12 border rounded-lg hover:opacity-50"
          onClick={() => router.push("/")}
        >
          <Home className="w-6 h-6 hover:text-white" />
        </button>
      )}
      <button
        className="flex items-center justify-center w-12 h-12 border rounded-lg hover:bg-slate-100"
        onClick={() => router.push("/share")}
      >
        <LucideShare className="text-blue-500 w-6 h-6" />
      </button>
      <button
        className="flex items-center justify-center w-12 h-12 border rounded-lg hover:bg-slate-100"
        onClick={() => {
          router.push("/shrink");
          router.refresh();
        }}
      >
        <LucideShrink className="text-red-500 w-6 h-6" />
      </button>
    </div>
  );
}
