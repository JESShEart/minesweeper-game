import { Stats } from "../types/stats";

export function saveStats(stats: Stats): void {
    try {
        localStorage.setItem("stats", JSON.stringify(stats));
    } catch (e) {
        // local storage isn't available for whatever reason.
        // the stats will only exist in memory then.
    }
}
