import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin w-10 h-10 text-amber-500" />
        <p className="text-sm text-gray-700">Chargement en cours...</p>
      </div>
    </div>
  );
}