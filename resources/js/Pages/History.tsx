"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getHistory, clearHistory, ScanRecord } from "@/lib/history";
import ItemCard from "@/Components/ItemCard";
import SearchBar from "@/Components/SearchBar";
import HangingGems from "@/Components/HangingGems";
import FloatingDiamonds from "@/Components/FloatingDiamonds";
import AmbientGlows from "@/Components/AmbientGlows";

export default function HistoryPage() {
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [rarityFilter, setRarityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedItem, setSelectedItem] = useState<ScanRecord | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHistory(getHistory());
  }, []);

  const filtered = useMemo(() => {
    let items = [...history];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.itemName.toLowerCase().includes(q) ||
          item.material.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    // Rarity filter
    if (rarityFilter !== "All") {
      items = items.filter((item) => item.rarity === rarityFilter);
    }

    // Sort
    switch (sortBy) {
      case "oldest":
        items.sort((a, b) => new Date(a.scannedAt).getTime() - new Date(b.scannedAt).getTime());
        break;
      case "xp-high":
        items.sort((a, b) => b.xp - a.xp);
        break;
      case "xp-low":
        items.sort((a, b) => a.xp - b.xp);
        break;
      default: // newest
        items.sort((a, b) => new Date(b.scannedAt).getTime() - new Date(a.scannedAt).getTime());
    }

    return items;
  }, [history, searchQuery, rarityFilter, sortBy]);

  const totalXP = history.reduce((sum, item) => sum + item.xp, 0);

  if (!mounted) return null;

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

      <div className="z-10 w-full max-w-4xl xl:max-w-5xl flex flex-col items-center gap-5 sm:gap-6 lg:gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="w-10 sm:w-16 h-px" style={{ background: "linear-gradient(to right,transparent,#d3bc8e)" }} />
            <span className="hoyo-title text-[#d3bc8e] tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs font-bold">
              SCAN ARCHIVES
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
            History
          </h1>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          <div
            className="flex flex-col items-center p-3 sm:p-4 bg-[#1e2235]/80 border border-[#3d4460]"
            style={{
              clipPath:
                "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
            }}
          >
            <span className="hoyo-title text-[8px] sm:text-[9px] tracking-[2px] text-[#6b7280]">TOTAL SCANS</span>
            <span className="hoyo-title text-lg sm:text-xl lg:text-2xl text-[#d3bc8e]">{history.length}</span>
          </div>
          <div
            className="flex flex-col items-center p-3 sm:p-4 bg-[#1e2235]/80 border border-[#3d4460]"
            style={{
              clipPath:
                "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
            }}
          >
            <span className="hoyo-title text-[8px] sm:text-[9px] tracking-[2px] text-[#6b7280]">TOTAL XP EARNED</span>
            <span className="hoyo-title text-lg sm:text-xl lg:text-2xl text-[#ffd700]">{totalXP}</span>
          </div>
          <div
            className="col-span-2 sm:col-span-1 flex flex-col items-center p-3 sm:p-4 bg-[#1e2235]/80 border border-[#3d4460]"
            style={{
              clipPath:
                "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
            }}
          >
            <span className="hoyo-title text-[8px] sm:text-[9px] tracking-[2px] text-[#6b7280]">RESULTS SHOWN</span>
            <span className="hoyo-title text-lg sm:text-xl lg:text-2xl text-[#ece5d8]">{filtered.length}</span>
          </div>
        </motion.div>

        {/* Search / Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full"
        >
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            rarityFilter={rarityFilter}
            onRarityChange={setRarityFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </motion.div>

        {/* Clear History */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full flex justify-end"
          >
            <button
              onClick={() => {
                if (confirm("Clear all scan history?")) {
                  clearHistory();
                  setHistory([]);
                  setSelectedItem(null);
                }
              }}
              className="hoyo-title text-[9px] sm:text-[10px] tracking-[2px] text-[#6b7280] hover:text-[#ff6b6b] transition-colors px-3 py-1.5 border border-transparent hover:border-[#ff6b6b]/30 rounded-sm"
            >
              ✕ CLEAR HISTORY
            </button>
          </motion.div>
        )}

        {/* Results */}
        <div className="w-full flex flex-col gap-3 sm:gap-4 pb-8">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 sm:gap-4 py-12 sm:py-16"
            >
              <span className="text-3xl sm:text-4xl opacity-30">◈</span>
              <span className="hoyo-title text-[10px] sm:text-[11px] tracking-[3px] text-[#4a5366]">
                {history.length === 0 ? "NO SCANS RECORDED YET" : "NO RESULTS MATCH YOUR FILTERS"}
              </span>
              {history.length === 0 && (
                <a
                  href="/scanner"
                  className="hoyo-title text-[10px] sm:text-[11px] tracking-[2px] text-[#d3bc8e] hover:text-[#fff] transition-colors border border-[#d3bc8e]/30 hover:border-[#d3bc8e] px-4 sm:px-6 py-2 mt-2"
                  style={{
                    clipPath:
                      "polygon(8px 0%,calc(100% - 8px) 0%,100% 50%,calc(100% - 8px) 100%,8px 100%,0% 50%)",
                  }}
                >
                  GO TO SCANNER
                </a>
              )}
            </motion.div>
          ) : (
            <>
              <AnimatePresence>
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() =>
                      setSelectedItem(selectedItem?.id === item.id ? null : item)
                    }
                    className="cursor-pointer"
                  >
                    <ItemCard data={item} compact={selectedItem?.id !== item.id} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
