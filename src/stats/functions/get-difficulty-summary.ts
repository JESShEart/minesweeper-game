import { Stats } from "../types/stats";
import { Difficulty } from "../../minesweeper/types/difficulty";
import { getRelevantResults } from "./get-relevant-results";
import { toHoursMinutesSeconds } from "../../minesweeper/functions/to-hours-minutes-seconds";
import { getWinRate } from "./get-win-rate";
import { getTotalTime } from "./get-total-time";
import { DifficultySummary } from "../types/difficulty-summary";
import { getWinningTimes } from "./get-winning-times";

function getFastestTime(times: number[]): string {
    let fastestTime: number | null = null;
    times.forEach(time => {
        if (fastestTime === null || time < fastestTime) {
            fastestTime = time;
        }
    });
    return fastestTime ? toHoursMinutesSeconds(fastestTime, true) : "-:--";
}

function getAverageTime(times: number[]): string {
    const totalTime = getTotalTime(times);
    const averageMillis = Math.floor(totalTime / times.length);
    return averageMillis ? toHoursMinutesSeconds(averageMillis, true) : "-:--";
}

export function getDifficultySummary(
    stats: Stats,
    difficulty?: Difficulty
): DifficultySummary {
    const results = getRelevantResults(stats, difficulty);
    const games = results.length;
    const winningTimes = getWinningTimes(results);
    const wins = winningTimes.length;
    const winRate = getWinRate(wins, games);
    const fastestTime = getFastestTime(winningTimes);
    const averageTime = getAverageTime(winningTimes);
    return { games, wins, winRate, fastestTime, averageTime };
}
