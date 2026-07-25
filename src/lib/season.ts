export type Season = "off-season" | "early-season" | "peak-season" | "post-parade";

/**
 * Committee override for the two-mode system:
 *   NEXT_PUBLIC_SEASON_OVERRIDE = "active"  → force purchases/registration open
 *   NEXT_PUBLIC_SEASON_OVERRIDE = "off"     → force showcase-only mode
 *   unset / "auto"                          → date-based season logic
 */
function seasonOverride(): "active" | "off" | null {
  const value = (process.env.NEXT_PUBLIC_SEASON_OVERRIDE || "").toLowerCase();
  if (value === "active") return "active";
  if (value === "off") return "off";
  return null;
}

export function getCurrentSeason(now?: Date): Season {
  const date = now || new Date();
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();

  // Post-parade: March 18 - March 31
  if (month === 2 && day >= 18) return "post-parade";
  // Peak season: February 1 - March 17
  if (month === 1 || (month === 2 && day <= 17)) return "peak-season";
  // Early season: November - January
  if (month >= 10 || month === 0) return "early-season";
  // Off-season: April - October
  return "off-season";
}

export function isRegistrationOpen(season?: Season): boolean {
  const override = seasonOverride();
  if (override) return override === "active";
  const s = season || getCurrentSeason();
  return s === "early-season" || s === "peak-season";
}

export function isPurchaseOpen(season?: Season): boolean {
  const override = seasonOverride();
  if (override) return override === "active";
  const s = season || getCurrentSeason();
  return s === "early-season" || s === "peak-season";
}

/** Label for when sales next open, e.g. "November 2026". */
export function getSalesOpenLabel(now?: Date): string {
  const date = now || new Date();
  const year = date.getMonth() >= 10 ? date.getFullYear() + 1 : date.getFullYear();
  return `November ${year}`;
}

export function getParadeDate(year?: number): Date {
  // St. Patrick's Day is always March 17, but the parade
  // is typically the Saturday before if March 17 is not a Saturday
  // For simplicity, we'll use March 15 as a typical parade Saturday
  const y = year || new Date().getFullYear();
  const stPats = new Date(y, 2, 17); // March 17
  // Find the Saturday on or before March 17
  const dayOfWeek = stPats.getDay();
  if (dayOfWeek === 6) return stPats; // Already Saturday
  const daysToSubtract = dayOfWeek === 0 ? 1 : dayOfWeek;
  const paradeSaturday = new Date(y, 2, 17 - daysToSubtract);
  return paradeSaturday;
}

export function getNextParadeYear(): number {
  const now = new Date();
  const thisYearParade = getParadeDate(now.getFullYear());
  if (now > thisYearParade) {
    return now.getFullYear() + 1;
  }
  return now.getFullYear();
}
