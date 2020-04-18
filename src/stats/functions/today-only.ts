import { Stats } from "../types/stats";

export function todayOnly(stats: Stats, todayOnly: boolean): Stats {
    return {
        ...stats,
        todayOnly
    };
}
