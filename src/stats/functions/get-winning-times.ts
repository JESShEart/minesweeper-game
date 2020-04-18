import { Result } from "../types/result";

export function getWinningTimes(results: Result[]): number[] {
    return results
        .filter(result => result.win)
        .map(result => result.finishedAt - result.startedAt);
}
