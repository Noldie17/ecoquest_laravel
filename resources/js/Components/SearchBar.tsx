"use client";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rarityFilter: string;
  onRarityChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  rarityFilter,
  onRarityChange,
  sortBy,
  onSortChange,
}: SearchBarProps) {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4">
      {/* Search Input */}
      <div className="flex-1 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d3bc8e] opacity-50 text-sm">
          ◈
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search scanned items..."
          className="w-full bg-black/40 border border-[#4a5366] text-[#ece5d8] text-xs sm:text-sm placeholder-[#4a5366] py-2.5 sm:py-3 pl-8 sm:pl-10 pr-4 outline-none transition-all duration-300 focus:border-[#d3bc8e] focus:bg-black/60 hoyo-serif"
          style={{
            clipPath:
              "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
          }}
        />
      </div>

      {/* Rarity Filter */}
      <div className="w-full sm:w-auto">
        <select
          value={rarityFilter}
          onChange={(e) => onRarityChange(e.target.value)}
          className="w-full sm:w-40 lg:w-44 bg-black/40 border border-[#4a5366] text-[#ece5d8] text-xs sm:text-sm py-2.5 sm:py-3 px-3 sm:px-4 outline-none transition-all duration-300 focus:border-[#d3bc8e] hoyo-title tracking-wider appearance-none cursor-pointer"
          style={{
            clipPath:
              "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
          }}
        >
          <option value="All">ALL RARITIES</option>
          <option value="Common">★★ COMMON</option>
          <option value="Rare">★★★ RARE</option>
          <option value="Epic">★★★★ EPIC</option>
          <option value="Legendary">★★★★★ LEGENDARY</option>
        </select>
      </div>

      {/* Sort */}
      <div className="w-full sm:w-auto">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full sm:w-36 lg:w-40 bg-black/40 border border-[#4a5366] text-[#ece5d8] text-xs sm:text-sm py-2.5 sm:py-3 px-3 sm:px-4 outline-none transition-all duration-300 focus:border-[#d3bc8e] hoyo-title tracking-wider appearance-none cursor-pointer"
          style={{
            clipPath:
              "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
          }}
        >
          <option value="newest">NEWEST FIRST</option>
          <option value="oldest">OLDEST FIRST</option>
          <option value="xp-high">XP: HIGH → LOW</option>
          <option value="xp-low">XP: LOW → HIGH</option>
        </select>
      </div>
    </div>
  );
}
