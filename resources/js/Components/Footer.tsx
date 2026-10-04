"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="w-full py-6 sm:py-8 flex justify-center z-10 relative bg-[#0e0f1a] border-t border-[#4a5366]/30"
    >
      <div className="hoyo-title text-[8px] sm:text-[10px] tracking-[3px] sm:tracking-[4px] text-[#8b92a5] text-center flex flex-col items-center gap-1.5">
        <span className="text-[#ece5d8] opacity-80 font-bold">TERRABYTE</span>
        <div className="flex items-center">
          <span
            style={{
              display: "inline-block",
              width: 5,
              height: 5,
              background: "#d3bc8e",
              transform: "rotate(45deg)",
              opacity: 0.6,
              margin: "0 6px",
              verticalAlign: "middle",
            }}
          />
          <span>ECOQUEST • EARTH DAY 2026</span>
          <span
            style={{
              display: "inline-block",
              width: 5,
              height: 5,
              background: "#d3bc8e",
              transform: "rotate(45deg)",
              opacity: 0.6,
              margin: "0 6px",
              verticalAlign: "middle",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
