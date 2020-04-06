import { createTestBoard } from "./create-board.test";
import { Square } from "../types/square";
import { reveal } from "./reveal";

function revealed(board: Square[][]): boolean[][] {
    return board.map(row => row.map(square => square.revealed));
}

describe("reveal", function() {
    test("should reveal all squares (1)", function() {
        let board = createTestBoard([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);

        board = reveal(board[1][1], board);

        expect(revealed(board)).toEqual([
            [true, true, true],
            [true, true, true],
            [true, true, true]
        ]);
    });

    test("should reveal all squares (2)", function() {
        let board = createTestBoard([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);

        board = reveal(board[0][0], board);

        expect(revealed(board)).toEqual([
            [true, true, true],
            [true, true, true],
            [true, true, true]
        ]);
    });

    test("should reveal all squares (3)", function() {
        let board = createTestBoard([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);

        board = reveal(board[2][2], board);

        expect(revealed(board)).toEqual([
            [true, true, true],
            [true, true, true],
            [true, true, true]
        ]);
    });

    test("should reveal 1 square when it has adjacent mines (1)", function() {
        let board = createTestBoard([
            [0, 0, 0],
            [0, 0, 1],
            [0, 0, 0]
        ]);

        board = reveal(board[1][1], board);

        expect(revealed(board)).toEqual([
            [false, false, false],
            [false, true, false],
            [false, false, false]
        ]);
    });

    test("should reveal 1 square when it has adjacent mines (2)", function() {
        let board = createTestBoard([
            [0, 0, 0],
            [0, 0, 1],
            [0, 0, 0]
        ]);

        board = reveal(board[0][1], board);

        expect(revealed(board)).toEqual([
            [false, true, false],
            [false, false, false],
            [false, false, false]
        ]);
    });

    test("should reveal squares until squares with adjacent mines are revealed (1)", function() {
        let board = createTestBoard([
            [0, 0, 0],
            [0, 0, 1],
            [0, 0, 0]
        ]);

        board = reveal(board[1][0], board);

        expect(revealed(board)).toEqual([
            [true, true, false],
            [true, true, false],
            [true, true, false]
        ]);
    });

    test("should reveal squares until squares with adjacent mines are revealed (2)", function() {
        let board = createTestBoard([
            [0, 0, 1],
            [0, 0, 0],
            [1, 0, 0]
        ]);

        board = reveal(board[2][2], board);

        expect(revealed(board)).toEqual([
            [false, false, false],
            [false, true, true],
            [false, true, true]
        ]);
    });

    test("should reveal all appropriate squares on a largish board", function() {
        let board = createTestBoard([
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);

        board = reveal(board[1][1], board);

        expect(revealed(board)).toEqual([
            [true, true, true, true, true, true, true, false, false],
            [true, true, true, true, true, true, true, false, false],
            [true, true, true, true, true, true, true, true, false],
            [true, true, true, true, true, true, true, true, false],
            [false, false, true, true, true, true, true, true, true],
            [false, false, true, true, true, true, true, true, true]
        ]);
    });
});
