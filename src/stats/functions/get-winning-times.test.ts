import { getWinningTimes } from "./get-winning-times";
import { Result } from "../types/result";

describe("getWinningTimes", function() {
    test("should map to number array containing only the winning times", function() {
        const winningTimes = getWinningTimes([
            { win: true, startedAt: 1, finishedAt: 2 },
            { win: true, startedAt: 1, finishedAt: 3 },
            { win: false, startedAt: 1, finishedAt: 4 },
            { win: true, startedAt: 1, finishedAt: 5 }
        ] as Result[]);
        expect(winningTimes).toEqual([1, 2, 4]);
    });
});
