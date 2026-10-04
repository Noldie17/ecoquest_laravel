export interface ScanRecord {
  id: string;
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
  scannedAt: string;
}

const STORAGE_KEY = "ecoquest_history";

export function saveToHistory(result: Omit<ScanRecord, "id" | "scannedAt">): ScanRecord {
  const record: ScanRecord = {
    ...result,
    id: crypto.randomUUID(),
    scannedAt: new Date().toISOString(),
  };
  const history = getHistory();
  history.unshift(record);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
  return record;
}

export function getHistory(): ScanRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}
