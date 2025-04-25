// components/GlobalUI.js
import { Toaster } from "sonner";
import { motion } from "framer-motion";

export default function GlobalUI({ loading }) {
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          className: "text-sm font-medium",
          duration: 3500,
        }}
      />

      {loading && (
        <div className="fixed inset-0 z-[9999] bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <motion.div
            className="w-20 h-20 border-4 border-amber-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
      )}
    </>
  );
}
