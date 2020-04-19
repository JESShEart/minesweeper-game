import { Stats } from "../types/stats";

function defaultStats(): Stats {
    return {
        todayOnly: false,
        results: []
    };
}

export function loadStats(): Stats {
    try {
        const stats = localStorage.getItem("stats");
        return stats ? JSON.parse(stats) : defaultStats();
    } catch (e) {
        // local storage isn't available for whatever reason.
        return defaultStats();
    }
}
