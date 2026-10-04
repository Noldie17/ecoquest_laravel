"use client";
import { motion } from "framer-motion";

interface DiamondConfig {
  left: string;
  size: number;
  dur: number;
  delay: number;
}

export default function FloatingDiamonds({ diamonds }: { diamonds?: DiamondConfig[] }) {
  const defaultDiamonds: DiamondConfig[] = [
    { left: "15%", size: 8, dur: 12, delay: 0 },
    { left: "25%", size: 5, dur: 16, delay: 3 },
    { left: "55%", size: 9, dur: 13, delay: 2 },
    { left: "70%", size: 10, dur: 14, delay: 1.5 },
    { left: "82%", size: 6, dur: 18, delay: 5 },
  ];

  const data = diamonds ?? defaultDiamonds;

  return (
    <>
      {data.map((d, i) => (
        <motion.div
          key={i}
          className="pointer-events-none"
          style={{
            position: "absolute",
            left: d.left,
            top: -20,
            width: d.size,
            height: d.size,
            transform: "rotate(45deg)",
            border: "1px solid rgba(211,188,142,0.4)",
            background: "rgba(211,188,142,0.04)",
            zIndex: 1,
          }}
          animate={{ y: [0, 800], opacity: [0, 0.8, 0.6, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </>
  );
}
