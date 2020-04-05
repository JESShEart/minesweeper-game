import { getStatus } from "./get-status";
import Square from "../types/square";
import { createTestBoard } from "./create-board.test";

describe("getStatus", function() {
    let board: Square[][];

    function revealSquares(toReveal: number[][]): void {
        toReveal.forEach((row, y) =>
            row.forEach((revealed, x) => (board[y][x].revealed = !!revealed))
        );
    }

    beforeEach(function() {
        board = createTestBoard([
            [0, 0, 0],
            [0, 1, 0],
            [1, 0, 0]
        ]);
    });

    test("should be PLAY when 1 or more non-mines are not revealed", function() {
        revealSquares([
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 0]
        ]);
        expect(getStatus(board)).toBe("PLAY");
    });

    test("should be FAIL when at least one mine is revealed", function() {
        revealSquares([
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ]);
        expect(getStatus(board)).toBe("FAIL");
    });

    test("should be WIN when no mine is revealed and no un-revealed non-mine squares are found", function() {
        revealSquares([
            [1, 1, 1],
            [1, 0, 1],
            [0, 1, 1]
        ]);
        expect(getStatus(board)).toBe("WIN");
    });
});
