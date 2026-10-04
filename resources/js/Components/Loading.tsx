"use client";
import { motion } from "framer-motion";

export default function Loading({ text = "ANALYZING PATH..." }: { text?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center gap-4 py-8"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#d3bc8e] border-t-transparent rounded-full"
      />
      <span className="hoyo-title text-[10px] sm:text-[11px] tracking-[3px] text-[#6b7280]">
        {text}
      </span>
    </motion.div>
  );
}
