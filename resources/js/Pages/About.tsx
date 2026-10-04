"use client";
import { motion } from "framer-motion";
import HangingGems from "@/Components/HangingGems";
import FloatingDiamonds from "@/Components/FloatingDiamonds";
import AmbientGlows from "@/Components/AmbientGlows";

const TEAM = [
  { name: "TerraByte Lead", role: "Full-Stack & Architecture" },
  { name: "AI Vision Engineer", role: "Roboflow & Model Integration" },
  { name: "UI/UX Designer", role: "Interface & Gamification Design" },
];

const TECH_STACK = [
  { name: "React 19", desc: "Component-based UI framework with hooks" },
  { name: "Laravel 13", desc: "PHP backend, web routes, and API endpoints" },
  { name: "Inertia.js", desc: "React pages served through Laravel routes" },
  { name: "Tailwind CSS 4", desc: "Utility-first CSS framework for responsive design" },
  { name: "Framer Motion", desc: "Production-ready motion library for React" },
  { name: "Roboflow API", desc: "AI-powered image recognition and analysis" },
  { name: "LocalStorage", desc: "Client-side data persistence for XP and history" },
];

export default function AboutPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center p-4 pt-20 sm:pt-24 relative overflow-hidden"
      style={{ background: "#0e0f1a", fontFamily: "'Crimson Text', serif", color: "#ece5d8" }}
    >
      <HangingGems />
      <FloatingDiamonds />
      <AmbientGlows />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .hoyo-title { font-family: 'Cinzel', serif; }
        .hoyo-serif { font-family: 'Crimson Text', serif; }
      `}</style>

      <div className="z-10 w-full max-w-4xl xl:max-w-5xl flex flex-col items-center gap-8 sm:gap-10 lg:gap-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="w-10 sm:w-16 h-px" style={{ background: "linear-gradient(to right,transparent,#d3bc8e)" }} />
            <span className="hoyo-title text-[#d3bc8e] tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs font-bold">
              INTEL DOSSIER
            </span>
            <span className="w-10 sm:w-16 h-px" style={{ background: "linear-gradient(to left,transparent,#d3bc8e)" }} />
          </div>
          <h1
            className="hoyo-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider"
            style={{
              background: "linear-gradient(180deg,#fff 0%,#ece5d8 40%,#a08040 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About EcoQuest
          </h1>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full p-5 sm:p-6 lg:p-8"
          style={{
            background: "rgba(28,31,44,0.8)",
            border: "1px solid #4a5366",
            clipPath:
              "polygon(0 8px,8px 0,calc(100% - 8px) 0,100% 8px,100% calc(100% - 8px),calc(100% - 8px) 100%,8px 100%,0 calc(100% - 8px))",
          }}
        >
          <h2 className="hoyo-title text-sm sm:text-base lg:text-lg tracking-widest text-[#ece5d8] border-b border-[#4a5366] pb-2 sm:pb-3 mb-3 sm:mb-4">
            OUR MISSION
          </h2>
          <p className="hoyo-serif text-sm sm:text-base lg:text-[17px] text-[#a6a9b2] italic leading-relaxed">
            EcoQuest transforms waste identification into an engaging gamified experience.
            By scanning everyday discarded items, users discover their hidden recycling potential,
            learn creative upcycling recipes, and earn experience points to climb the ranks
            from Seedling to Gaia Legend. Our goal is to make environmental awareness
            interactive, educational, and genuinely fun.
          </p>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full p-5 sm:p-6 lg:p-8"
          style={{
            background: "rgba(28,31,44,0.8)",
            border: "1px solid #4a5366",
            clipPath:
              "polygon(0 8px,8px 0,calc(100% - 8px) 0,100% 8px,100% calc(100% - 8px),calc(100% - 8px) 100%,8px 100%,0 calc(100% - 8px))",
          }}
        >
          <h2 className="hoyo-title text-sm sm:text-base lg:text-lg tracking-widest text-[#ece5d8] border-b border-[#4a5366] pb-2 sm:pb-3 mb-3 sm:mb-4">
            HOW IT WORKS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {[
              { step: "01", title: "Scan", desc: "Upload or capture a photo of any discarded item using the Scanner." },
              { step: "02", title: "Analyze", desc: "Our AI identifies the material, assigns a rarity, and generates an upcycle recipe." },
              { step: "03", title: "Level Up", desc: "Earn XP from each scan to climb the rank ladder and track your eco-journey." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
                className="flex flex-col gap-2 p-3 sm:p-4 bg-black/30 border border-[#2e3347]"
                style={{
                  clipPath:
                    "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
                }}
              >
                <span className="hoyo-title text-[#d3bc8e] text-2xl sm:text-3xl lg:text-4xl font-bold opacity-30">
                  {item.step}
                </span>
                <h3 className="hoyo-title text-[11px] sm:text-[12px] tracking-widest text-[#ece5d8] font-bold">
                  {item.title.toUpperCase()}
                </h3>
                <p className="hoyo-serif text-[12px] sm:text-[13px] text-[#6b7280] italic leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full p-5 sm:p-6 lg:p-8"
          style={{
            background: "rgba(28,31,44,0.8)",
            border: "1px solid #4a5366",
            clipPath:
              "polygon(0 8px,8px 0,calc(100% - 8px) 0,100% 8px,100% calc(100% - 8px),calc(100% - 8px) 100%,8px 100%,0 calc(100% - 8px))",
          }}
        >
          <h2 className="hoyo-title text-sm sm:text-base lg:text-lg tracking-widest text-[#ece5d8] border-b border-[#4a5366] pb-2 sm:pb-3 mb-3 sm:mb-4">
            TECHNOLOGY STACK
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {TECH_STACK.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-start gap-3 p-2.5 sm:p-3 bg-black/20 border border-[#2e3347] rounded-sm"
              >
                <span className="text-[#d3bc8e] text-xs mt-0.5">✦</span>
                <div>
                  <div className="hoyo-title text-[10px] sm:text-[11px] tracking-widest text-[#ece5d8] font-bold">
                    {tech.name.toUpperCase()}
                  </div>
                  <div className="hoyo-serif text-[11px] sm:text-[12px] text-[#6b7280] italic">
                    {tech.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full p-5 sm:p-6 lg:p-8"
          style={{
            background: "rgba(28,31,44,0.8)",
            border: "1px solid #4a5366",
            clipPath:
              "polygon(0 8px,8px 0,calc(100% - 8px) 0,100% 8px,100% calc(100% - 8px),calc(100% - 8px) 100%,8px 100%,0 calc(100% - 8px))",
          }}
        >
          <h2 className="hoyo-title text-sm sm:text-base lg:text-lg tracking-widest text-[#ece5d8] border-b border-[#4a5366] pb-2 sm:pb-3 mb-3 sm:mb-4">
            THE TEAM
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.15 }}
                className="flex flex-col items-center text-center gap-2 sm:gap-3 p-4 sm:p-6 bg-black/30 border border-[#2e3347]"
                style={{
                  clipPath:
                    "polygon(0 6px,6px 0,calc(100% - 6px) 0,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0 calc(100% - 6px))",
                }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#d3bc8e] bg-[#1c1f2c] flex items-center justify-center text-[#d3bc8e] text-lg sm:text-xl">
                  ✦
                </div>
                <div className="hoyo-title text-[11px] sm:text-[12px] tracking-widest text-[#ece5d8] font-bold">
                  {member.name.toUpperCase()}
                </div>
                <div className="hoyo-serif text-[11px] sm:text-[12px] text-[#6b7280] italic">
                  {member.role}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Course Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center hoyo-title text-[9px] sm:text-[10px] tracking-[3px] sm:tracking-[4px] text-[#4a5366] pb-6 sm:pb-8"
        >
          INTECH 3112 • WEB DEVELOPMENT PROJECT • 2026
        </motion.div>
      </div>
    </main>
  );
}
