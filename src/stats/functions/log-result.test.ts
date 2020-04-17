import { logResult } from "./log-result";
import { Game } from "../../mine-sweeper/types/game";
import { Result } from "../types/result";
import { Stats } from "../types/stats";
import {
    Difficulty,
    EASY,
    HARD,
    NORMAL
} from "../../mine-sweeper/types/difficulty";
import { GameStatus } from "../../mine-sweeper/types/game-status";

function game(
    difficulty: Difficulty,
    status: GameStatus,
    startedAt: number,
    finishedAt: number
): Game {
    return {
        board: new Array(difficulty.height).fill(new Array(difficulty.width)),
        startedAt,
        finishedAt,
        status
    } as Game;
}

function stats(results: Partial<Result>[]): Stats {
    return { results: results as Result[] };
}

describe("logResult", function() {
    test("should record EASY winning result", function() {
        const result = logResult(stats([]), game(EASY, "WIN", 1, 3));
        expect(result).toEqual(
            stats([
                { win: true, startedAt: 1, finishedAt: 3, difficulty: "EASY" }
            ])
        );
    });

    test("should record NORMAL loss result", function() {
        const result = logResult(stats([]), game(NORMAL, "FAIL", 1, 3));
        expect(result).toEqual(
            stats([
                {
                    win: false,
                    startedAt: 1,
                    finishedAt: 3,
                    difficulty: "NORMAL"
                }
            ])
        );
    });

    test("should record HARD winning result", function() {
        const result = logResult(stats([]), game(HARD, "WIN", 1, 3));
        expect(result).toEqual(
            stats([
                { win: true, startedAt: 1, finishedAt: 3, difficulty: "HARD" }
            ])
        );
    });

    test("should log multiple results", function() {
        let result = stats([]);
        result = logResult(result, game(HARD, "WIN", 1, 3));
        result = logResult(result, game(EASY, "FAIL", 1, 3));
        result = logResult(result, game(EASY, "WIN", 1, 3));

        expect(result).toEqual(
            stats([
                { win: true, startedAt: 1, finishedAt: 3, difficulty: "HARD" },
                { win: false, startedAt: 1, finishedAt: 3, difficulty: "EASY" },
                { win: true, startedAt: 1, finishedAt: 3, difficulty: "EASY" }
            ])
        );
    });
});
