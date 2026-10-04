"use client";
import { motion } from "framer-motion";

interface GemConfig {
  left: string;
  threadH: number;
  size: number;
  delay: number;
}

export default function HangingGems({ gems }: { gems?: GemConfig[] }) {
  const defaultGems: GemConfig[] = [
    { left: "4%", threadH: 60, size: 14, delay: 0 },
    { left: "12%", threadH: 100, size: 10, delay: 0.8 },
    { left: "20%", threadH: 45, size: 18, delay: 1.5 },
    { left: "78%", threadH: 80, size: 12, delay: 0.3 },
    { left: "86%", threadH: 55, size: 16, delay: 1.1 },
    { left: "93%", threadH: 110, size: 10, delay: 2.0 },
    { left: "7%", threadH: 140, size: 8, delay: 2.5 },
    { left: "88%", threadH: 135, size: 9, delay: 1.8 },
  ];

  const data = gems ?? defaultGems;

  return (
    <>
      {data.map((g, i) => (
        <motion.div
          key={i}
          className="hidden sm:flex"
          style={{
            position: "absolute",
            top: 0,
            left: g.left,
            flexDirection: "column",
            alignItems: "center",
            transformOrigin: "top center",
            zIndex: 1,
          }}
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{
            duration: 3.5 + i * 0.2,
            delay: g.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            style={{
              width: 1,
              height: g.threadH,
              background:
                "linear-gradient(180deg,rgba(211,188,142,0.08),rgba(211,188,142,0.3),rgba(211,188,142,0.08))",
            }}
          />
          <div
            style={{
              width: g.size,
              height: g.size,
              transform: "rotate(45deg)",
              border: "1px solid rgba(211,188,142,0.55)",
              background: "rgba(211,188,142,0.05)",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <div
              style={{ position: "absolute", inset: 2, border: "1px solid rgba(211,188,142,0.18)" }}
            />
            <div
              style={{
                position: "absolute",
                borderRadius: "50%",
                width: g.size * 3,
                height: g.size * 3,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%) rotate(-45deg)",
                background: "radial-gradient(circle,rgba(211,188,142,0.12) 0%,transparent 70%)",
              }}
            />
          </div>
        </motion.div>
      ))}
    </>
  );
}
