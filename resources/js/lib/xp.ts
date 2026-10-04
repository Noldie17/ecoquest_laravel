const RANKS = [
  { name: "Seedling", min: 0 },
  { name: "Sapling", min: 100 },
  { name: "Grove Keeper", min: 300 },
  { name: "Forest Guardian", min: 600 },
  { name: "Earth Champion", min: 1000 },
  { name: "Gaia Legend", min: 2000 },
];

export const RANK_THRESHOLDS: Record<string, number> = {
  Seedling: 100,
  Sapling: 300,
  "Grove Keeper": 600,
  "Forest Guardian": 1000,
  "Earth Champion": 2000,
  "Gaia Legend": Infinity,
};

export function addXP(amount: number) {
  if (typeof window === "undefined") return;
  const current = parseInt(localStorage.getItem("ecoquest_xp") || "0");
  localStorage.setItem("ecoquest_xp", String(current + amount));
  window.dispatchEvent(new Event("storage"));
}

export function getXP(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem("ecoquest_xp") || "0");
}

export function getRank(): string {
  const xp = getXP();
  let rank = RANKS[0].name;
  for (const r of RANKS) {
    if (xp >= r.min) rank = r.name;
  }
  return rank;
}
