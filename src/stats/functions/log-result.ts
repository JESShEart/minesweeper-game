import { Game } from "../../mine-sweeper/types/game";
import { Stats } from "../types/stats";
import { Result } from "../types/result";
import {
    Difficulty,
    EASY,
    HARD,
    NORMAL
} from "../../mine-sweeper/types/difficulty";

function getDifficulty(game: Game): Difficulty {
    const height = game.board.length;
    if (EASY.height === height) {
        return EASY;
    } else if (NORMAL.height === height) {
        return NORMAL;
    } else if (HARD.height == height) {
        return HARD;
    } else {
        throw new Error("Game difficulty cannot be determined!");
    }
}

function gameResult(game: Game): Result {
    const { startedAt, finishedAt } = game;
    if (!startedAt || !finishedAt) {
        throw new Error("Game is unfinished!");
    }
    return {
        difficulty: getDifficulty(game).name,
        startedAt,
        finishedAt,
        win: game.status === "WIN"
    };
}

export function logResult(stats: Stats, game: Game): Stats {
    return {
        results: [...stats.results, gameResult(game)]
    };
}
