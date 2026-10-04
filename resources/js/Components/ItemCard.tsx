"use client";
import { motion } from "framer-motion";

type ItemData = {
  itemName: string;
  material: string;
  wasteType?: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  rarityStars?: number;
  description: string;
  upcycleRecipe: string;
  xp: number;
  ecoFact: string;
  safetyWarning?: string | null;
  localRulesNote?: string | null;
  scannedAt?: string;
};

const RARITY_STYLES: Record<string, { color: string }> = {
  Common: { color: "#a0a0a0" },
  Rare: { color: "#7bb3f0" },
  Epic: { color: "#c77dff" },
  Legendary: { color: "#ffd700" },
};

export default function ItemCard({ data, compact = false }: { data: ItemData; compact?: boolean }) {
  const rarity = RARITY_STYLES[data.rarity] || RARITY_STYLES.Common;
  const rarityStars = data.rarityStars ? "★".repeat(data.rarityStars) : "";

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, borderColor: "rgba(211,188,142,0.5)" }}
        transition={{ duration: 0.3 }}
        className="w-full bg-[#1e2235]/80 border border-[#3d4460] p-3 sm:p-4 cursor-default transition-all duration-300 hover:bg-[#1e2235]"
        style={{
          clipPath:
            "polygon(0 6px,6px 0,calc(100% - 6px) 0,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0 calc(100% - 6px))",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className="hoyo-title text-[9px] sm:text-[10px] tracking-[2px] font-bold"
                style={{ color: rarity.color }}
              >
                {rarityStars} {data.rarity.toUpperCase()}
              </span>
              <span className="hoyo-title text-[#d3bc8e] text-[10px] sm:text-[11px]">
                +{data.xp} XP
              </span>
            </div>
            <h3 className="hoyo-title text-sm sm:text-base lg:text-lg text-[#ece5d8] font-bold truncate">
              {data.itemName}
            </h3>
            <p className="hoyo-serif text-[11px] sm:text-[12px] text-[#6b7280] italic mt-1 line-clamp-2">
              {data.description}
            </p>
          </div>
          <div className="flex items-center gap-3 sm:flex-shrink-0">
            <span className="hoyo-serif text-[10px] sm:text-[11px] text-[#4a5366]">
              {data.wasteType ? `${data.wasteType} (${data.material})` : data.material}
            </span>
            {data.scannedAt && (
              <span className="hoyo-serif text-[10px] sm:text-[11px] text-[#a6a9b2]/60 border-l border-[#3d4460] pl-2">
                {new Date(data.scannedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: -90 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 15 }}
      className="w-full flex flex-col gap-2 sm:gap-3"
      style={{
        transformOrigin: "center",
        background: "rgba(0,0,0,0.3)",
        border: "1px solid #4a5366",
        padding: "12px",
        clipPath:
          "polygon(0 6px,6px 0,calc(100% - 6px) 0,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0 calc(100% - 6px))",
      }}
    >
      {/* Header: Rarity + Name + Material */}
      <div>
        <div
          className="hoyo-title text-[9px] sm:text-[10px] tracking-[3px] sm:tracking-[4px] font-bold"
          style={{ color: rarity.color }}
        >
          {rarityStars} {data.rarity.toUpperCase()}
        </div>
        <div className="hoyo-title text-lg sm:text-xl lg:text-[22px] font-bold text-[#ece5d8] mt-1 mb-1 sm:mb-2">
          {data.itemName}
        </div>
        <div className="hoyo-serif text-[13px] sm:text-[15px] font-bold text-[#ece5d8]">
          <span className="text-[#a6a9b2] font-normal">Type of Waste Detected:</span>{" "}
          {data.material}
        </div>
        <div className="hoyo-serif text-[13px] sm:text-[15px] font-bold text-[#ffd700] mt-1">
          <span className="text-[#a6a9b2] font-normal">XP Points Worth:</span> +{data.xp} XP
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-[1px]"
        style={{ background: "linear-gradient(90deg,transparent,#4a5366,transparent)" }}
      />

      {/* Description */}
      <div className="hoyo-serif text-[13px] sm:text-[15px] font-semibold text-[#ece5d8] italic leading-relaxed">
        {data.description}
      </div>

      {/* Upcycle Recipe */}
      <div
        className="p-2.5 sm:p-3"
        style={{
          background: "rgba(0,0,0,0.4)",
          border: "1px solid #2e3347",
          clipPath:
            "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
        }}
      >
        <div className="hoyo-title text-[9px] sm:text-[10px] tracking-[2px] sm:tracking-[3px] text-[#6b7280] mb-1.5 sm:mb-2 font-bold">
          ⚒ CRAFTING RECIPE
        </div>
        <div
          className="text-[14px] sm:text-[16px] font-bold"
          style={{ color: rarity.color, whiteSpace: "pre-line" }}
        >
          {data.upcycleRecipe}
        </div>
      </div>

      {data.safetyWarning && (
        <div className="p-2.5 sm:p-3 border border-[#b45309]/50 bg-[#451a03]/30">
          <div className="hoyo-title text-[9px] sm:text-[10px] tracking-[2px] text-[#fbbf24] mb-1.5 font-bold">
            ⚠ SAFETY WARNING
          </div>
          <div className="hoyo-serif text-[13px] sm:text-[15px] font-semibold text-[#fde68a] leading-relaxed">
            {data.safetyWarning}
          </div>
        </div>
      )}

      {data.localRulesNote && (
        <div className="p-2.5 sm:p-3 border border-[#2e3347] bg-black/30">
          <div className="hoyo-title text-[9px] sm:text-[10px] tracking-[2px] text-[#6b7280] mb-1.5 font-bold">
            LOCAL RECYCLING GUIDANCE
          </div>
          <div className="hoyo-serif text-[13px] sm:text-[15px] font-semibold text-[#ece5d8] italic leading-relaxed">
            {data.localRulesNote}
          </div>
        </div>
      )}

      {/* Eco Fact */}
      <div
        className="p-2.5 sm:p-3"
        style={{
          background: "rgba(0,0,0,0.4)",
          border: "1px solid #2e3347",
          clipPath:
            "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
        }}
      >
        <div className="hoyo-title text-[9px] sm:text-[10px] tracking-[2px] sm:tracking-[3px] text-[#6b7280] mb-1.5 sm:mb-2 font-bold">
          ◈ ECO KNOWLEDGE
        </div>
        <div className="hoyo-serif text-[13px] sm:text-[15px] font-semibold text-[#ece5d8] italic leading-relaxed">
          {data.ecoFact}
        </div>
      </div>
    </motion.div>
  );
}
