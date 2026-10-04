"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getXP, getRank } from "@/lib/xp";

export default function PlayerStats() {
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState("");

  useEffect(() => {
    setXp(getXP());
    setRank(getRank());

    const handleStorage = () => {
      setXp(getXP());
      setRank(getRank());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 bg-black/60 border border-[#4a5366] rounded-full px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-md"
      style={{
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex flex-col text-right">
        <span className="hoyo-title text-[8px] sm:text-[10px] tracking-widest text-[#a6a9b2]">
          {rank ? rank.toUpperCase() : "..."}
        </span>
        <span className="hoyo-title text-[12px] sm:text-[14px] text-[#d3bc8e]">
          {xp} XP
        </span>
      </div>
      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#d3bc8e] bg-[#1c1f2c] flex items-center justify-center text-[#d3bc8e] text-[10px] sm:text-xs">
        ✦
      </div>
    </motion.div>
  );
}
