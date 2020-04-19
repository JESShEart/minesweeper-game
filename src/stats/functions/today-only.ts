import { Stats } from "../types/stats";
import { saveStats } from "./save-stats";

export function todayOnly(stats: Stats, todayOnly: boolean): Stats {
    const updatedStats: Stats = {
        ...stats,
        todayOnly
    };
    saveStats(updatedStats);
    return updatedStats;
}
