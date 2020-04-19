import { Result } from "../types/result";
import { Stats } from "../types/stats";
import { Difficulty } from "../../minesweeper/types/difficulty";

function startOfToday(): number {
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);
    return today.getTime();
}

export function getRelevantResults(
    { results, todayOnly }: Stats,
    difficulty?: Difficulty
): Result[] {
    const today = startOfToday();
    return results.filter(result => {
        if (difficulty && result.difficultyName !== difficulty.name) {
            return false;
        } else {
            return !(todayOnly && result.finishedAt < today);
        }
    });
}
