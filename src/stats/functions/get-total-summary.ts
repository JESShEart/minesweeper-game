import { Stats } from "../types/stats";
import { getRelevantResults } from "./get-relevant-results";
import { getWinRate } from "./get-win-rate";
import { getWinningTimes } from "./get-winning-times";
import { TotalSummary } from "../types/total-summary";
import { getTotalTime } from "./get-total-time";
import { Result } from "../types/result";
import { toHoursMinutesSeconds } from "../../mine-sweeper/functions/to-hours-minutes-seconds";

export function getAllTimes(results: Result[]): number[] {
    return results.map(result => result.finishedAt - result.startedAt);
}

function getTotalPlayTime(results: Result[]): string {
    const allTimes = getAllTimes(results);
    const totalTimeMillis = getTotalTime(allTimes);
    return totalTimeMillis
        ? toHoursMinutesSeconds(totalTimeMillis, true)
        : "-:--";
}

export function getTotalSummary(stats: Stats): TotalSummary {
    const results = getRelevantResults(stats);
    const totalTime = getTotalPlayTime(results);
    const games = results.length;
    const wins = getWinningTimes(results).length;
    const winRate = getWinRate(wins, games);
    return { totalTime, games, wins, winRate };
}
