"use client";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { useEffect, useState, useMemo } from "react";
import HangingGems from "@/Components/HangingGems";
import FloatingDiamonds from "@/Components/FloatingDiamonds";
import AmbientGlows from "@/Components/AmbientGlows";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: `${Math.floor(Math.random() * 100)}vw`,
        top: `${Math.floor(Math.random() * 100)}vh`,
        scale: Math.random() * 1 + 0.5,
        xDrift: `${(Math.random() - 0.5) * 50}%`,
        duration: Math.random() * 15 + 15,
        delay: Math.random() * 10,
      })),
    []
  );

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#0e0f1a] flex flex-col items-center justify-center p-4 pt-16 sm:pt-20 font-serif text-[#ece5d8] relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        .hoyo-title { font-family: 'Cinzel', serif; }
        .hoyo-serif { font-family: 'Crimson Text', serif; }
        .hero-btn {
          background: rgba(28,31,44,0.6);
          border: 1px solid #d3bc8e;
          color: #d3bc8e;
          padding: 14px 32px;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          letter-spacing: 4px;
          font-size: 11px;
          clip-path: polygon(16px 0%,calc(100% - 16px) 0%,100% 50%,calc(100% - 16px) 100%,16px 100%,0% 50%);
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .hero-btn:hover {
          background: rgba(211,188,142,0.1);
          color: #fff;
          border-color: #fff;
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(211,188,142,0.2);
        }
        .feature-box {
          border: 1px solid #4a5366;
          background: rgba(28,31,44,0.8);
          clip-path: polygon(0 8px,8px 0,calc(100% - 8px) 0,100% 8px,100% calc(100% - 8px),calc(100% - 8px) 100%,8px 100%,0 calc(100% - 8px));
          transition: border-color 0.5s;
        }
        .feature-box:hover { border-color: #d3bc8e; }
        .star-particle {
          position: absolute;
          width: 2px; height: 2px;
          background: #d3bc8e;
          border-radius: 50%;
          box-shadow: 0 0 10px 2px rgba(211,188,142,0.5);
        }
      `}</style>

      {/* Shared visual components */}
      <AmbientGlows />
      <HangingGems />
      <FloatingDiamonds />

      {/* Star particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="star-particle"
            style={{ left: p.left, top: p.top, scale: p.scale }}
            animate={{ y: ["0%", "-1000%"], x: ["0%", p.xDrift], opacity: [0, 0.8, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="z-10 w-full max-w-4xl xl:max-w-5xl text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-4 sm:mb-6 flex items-center justify-center gap-3 sm:gap-4"
        >
          <span className="w-10 sm:w-16 h-px" style={{ background: "linear-gradient(to right,transparent,#d3bc8e)" }} />
          <span className="hoyo-title text-[#d3bc8e] tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs font-bold">
            PROJECT INITIATIVE
          </span>
          <span className="w-10 sm:w-16 h-px" style={{ background: "linear-gradient(to left,transparent,#d3bc8e)" }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="hoyo-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-wider mb-6 sm:mb-8"
          style={{
            background: "linear-gradient(180deg,#fff 0%,#ece5d8 40%,#a08040 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
          }}
        >
          EcoQuest
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hoyo-serif text-[#a6a9b2] text-base sm:text-lg md:text-xl italic max-w-2xl leading-relaxed mb-10 sm:mb-16 px-4"
        >
          &quot;Commune with the discarded artifacts of our world. Reveal their latent potential,
          upcycle fragments into profound tools, and ascend the ranks from a mere Seedling to Earth Champion.&quot;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-16 sm:mb-24"
        >
          <Link href="/scanner">
            <button className="hero-btn text-[10px] sm:text-[12px] px-6 sm:px-10 py-3 sm:py-4">
              INITIATE NEURAL UPLINK
            </button>
          </Link>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full px-4 max-w-5xl mx-auto">
          {[
            { title: "Identify", icon: "◈", desc: "Scan mundane materials via uplink to uncover their hidden elemental rarity." },
            { title: "Upcycle", icon: "⚒", desc: "Discover ancient synthesizer recipes for physical transmutation and repurpose." },
            { title: "Ascend", icon: "✦", desc: "Gain planetary experience to evolve your rank in the databank hierarchy." },
          ].map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 + i * 0.2 }}
              className="feature-box p-5 sm:p-6 lg:p-8 text-center flex flex-col items-center justify-center gap-3 sm:gap-4 cursor-default min-h-[180px] sm:min-h-[220px]"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#4a5366] rounded-full flex items-center justify-center text-[#d3bc8e] text-lg sm:text-xl">
                {feat.icon}
              </div>
              <h3 className="hoyo-title text-[11px] sm:text-sm tracking-widest text-[#ece5d8] font-bold">
                {feat.title.toUpperCase()}
              </h3>
              <p className="hoyo-serif text-[#6b7280] italic text-[13px] sm:text-[15px] leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="mt-10 sm:mt-16 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 text-left px-4"
        >
          {/* Instructions */}
          <div className="feature-box p-5 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4">
            <h3 className="hoyo-title text-base sm:text-lg tracking-widest text-[#ece5d8] border-b border-[#4a5366] pb-2 sm:pb-3 mb-1 sm:mb-2">
              HOW TO OPERATE
            </h3>
            <ol className="hoyo-serif text-[#a6a9b2] italic text-[14px] sm:text-[16px] leading-relaxed list-decimal list-inside space-y-2 sm:space-y-3">
              <li><strong className="text-[#ece5d8]">Initiate Neural Uplink</strong> to access the scanner interface.</li>
              <li><strong className="text-[#ece5d8]">Provide a Photo</strong> of the discarded material you wish to analyze.</li>
              <li><strong className="text-[#ece5d8]">Begin Transmutation</strong> and let the AI scan the item.</li>
              <li><strong className="text-[#ece5d8]">Receive Insights</strong> including the material type, upcycle recipe, and XP.</li>
              <li><strong className="text-[#ece5d8]">Accumulate XP</strong> to ascend your global rank!</li>
            </ol>
          </div>

          {/* Rarity Guide */}
          <div className="feature-box p-5 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4">
            <h3 className="hoyo-title text-base sm:text-lg tracking-widest text-[#ece5d8] border-b border-[#4a5366] pb-2 sm:pb-3 mb-1 sm:mb-2">
              RARITY REWARDS
            </h3>
            <div className="flex flex-col gap-2 sm:gap-3">
              {[
                { label: "★★ COMMON", examples: "Plastic, Paper, Cardboard, Box", xp: "25 XP", color: "#a0a0a0", xpColor: "#d3bc8e" },
                { label: "★★★ RARE", examples: "Glass, Metal, Aluminum, Can", xp: "50 XP", color: "#7bb3f0", xpColor: "#d3bc8e" },
                { label: "★★★★ EPIC", examples: "Electronics, Phone, Wood, Iron", xp: "100 XP", color: "#c77dff", xpColor: "#d3bc8e" },
                { label: "★★★★★ LEGENDARY", examples: "Battery, Chemical, Hazard, PC", xp: "200 XP", color: "#ffd700", xpColor: "#ffd700" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between items-center bg-black/20 p-2.5 sm:p-3 border border-[#2e3347] rounded-sm">
                  <div className="flex flex-col gap-0.5">
                    <span className="hoyo-title tracking-widest text-[12px] sm:text-[14px]" style={{ color: r.color }}>
                      {r.label}
                    </span>
                    <span className="hoyo-serif text-[10px] sm:text-[12px] italic text-[#6b7280]">{r.examples}</span>
                  </div>
                  <span className="hoyo-title text-[12px] sm:text-[14px]" style={{ color: r.xpColor }}>{r.xp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rank Guide */}
          <div className="feature-box p-5 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4">
            <h3 className="hoyo-title text-base sm:text-lg tracking-widest text-[#ece5d8] border-b border-[#4a5366] pb-2 sm:pb-3 mb-1 sm:mb-2">
              RANK ASCENSION
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { name: "SEEDLING", xp: "0 XP", color: "#a0a0a0" },
                { name: "SAPLING", xp: "100 XP", color: "#7bb3f0" },
                { name: "GROVE KEEPER", xp: "300 XP", color: "#c77dff" },
                { name: "FOREST GUARDIAN", xp: "600 XP", color: "#ffd700" },
                { name: "EARTH CHAMPION", xp: "1000 XP", color: "#ff8c00" },
                { name: "GAIA LEGEND", xp: "2000 XP", color: "#ff4500" },
              ].map((r) => (
                <div key={r.name} className="flex justify-between items-center bg-black/20 p-2 sm:p-2.5 border border-[#2e3347] rounded-sm">
                  <span className="hoyo-title tracking-widest text-[11px] sm:text-[13px]" style={{ color: r.color }}>
                    {r.name}
                  </span>
                  <span className="hoyo-title text-[#d3bc8e] text-[10px] sm:text-[11px]">{r.xp}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}