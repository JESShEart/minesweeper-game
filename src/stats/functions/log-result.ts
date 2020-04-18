import { Game } from "../../mine-sweeper/types/game";
import { Stats } from "../types/stats";
import { Result } from "../types/result";

function gameResult(game: Game): Result {
    const { startedAt, finishedAt, difficultyName } = game;
    if (!startedAt || !finishedAt) {
        throw new Error("Game is unfinished!");
    }
    return {
        difficultyName: difficultyName,
        win: game.status === "WIN",
        startedAt,
        finishedAt
    };
}

export function logResult({ todayOnly, results }: Stats, game: Game): Stats {
    return {
        todayOnly,
        results: [...results, gameResult(game)]
    };
}
