import { revealMines } from "./reveal-mines";
import { Square } from "../types/square";

function square(mine: boolean): Square {
    return { revealed: false, mine } as Square;
}

describe("revealMines", function() {
    test("should reveal mines", function() {
        const board = revealMines([
            [square(false), square(true)],
            [square(true), square(false)]
        ]);
        expect(board[0][0].revealed).toBeFalsy();
        expect(board[0][1].revealed).toBeTruthy();
        expect(board[1][0].revealed).toBeTruthy();
        expect(board[1][1].revealed).toBeFalsy();
    });
});
