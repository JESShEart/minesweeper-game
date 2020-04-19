import { logResult } from "./log-result";
import { Game } from "../../minesweeper/types/game";
import { Result } from "../types/result";
import { Stats } from "../types/stats";
import {
    Difficulty,
    EASY,
    HARD,
    NORMAL
} from "../../minesweeper/types/difficulty";
import { GameStatus } from "../../minesweeper/types/game-status";
import * as saveStatsObj from "./save-stats";
import Spy = jasmine.Spy;

function game(
    difficulty: Difficulty,
    status: GameStatus,
    startedAt: number,
    finishedAt: number
): Game {
    return {
        board: new Array(difficulty.height).fill(new Array(difficulty.width)),
        difficultyName: difficulty.name,
        startedAt,
        finishedAt,
        status
    } as Game;
}

function stats(results: Partial<Result>[]): Stats {
    return { results } as Stats;
}

describe("logResult", function() {
    let saveStats: Spy;

    beforeEach(function() {
        saveStats = spyOn(saveStatsObj, "saveStats");
        saveStats.and.stub();
    });

    test("should record EASY winning result", function() {
        const result = logResult(stats([]), game(EASY, "WIN", 1, 3));
        expect(result).toEqual(
            stats([
                {
                    win: true,
                    startedAt: 1,
                    finishedAt: 3,
                    difficultyName: "EASY"
                }
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
                    difficultyName: "NORMAL"
                }
            ])
        );
    });

    test("should record HARD winning result", function() {
        const result = logResult(stats([]), game(HARD, "WIN", 1, 3));
        expect(result).toEqual(
            stats([
                {
                    win: true,
                    startedAt: 1,
                    finishedAt: 3,
                    difficultyName: "HARD"
                }
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
                {
                    win: true,
                    startedAt: 1,
                    finishedAt: 3,
                    difficultyName: "HARD"
                },
                {
                    win: false,
                    startedAt: 1,
                    finishedAt: 3,
                    difficultyName: "EASY"
                },
                {
                    win: true,
                    startedAt: 1,
                    finishedAt: 3,
                    difficultyName: "EASY"
                }
            ])
        );
    });

    test("should save the resulting stats", function() {
        const result = logResult(stats([]), game(HARD, "WIN", 1, 3));
        expect(saveStats).toHaveBeenCalledWith(result);
    });
});
