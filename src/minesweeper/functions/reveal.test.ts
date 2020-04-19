import { Square } from "../types/square";
import { reveal } from "./reveal";
import { createTestBoard } from "../../testing/create-test-board";
import { Game } from "../types/game";

function revealed({ board }: Game): boolean[][] {
    return board.map(row => row.map(square => square.revealed));
}

function setupGame(board: Square[][]): Game {
    return { board } as Game;
}

describe("reveal", function() {
    test("should reveal all squares (1)", function() {
        const board = createTestBoard([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);

        const game = reveal(board[1][1], setupGame(board));

        expect(revealed(game)).toEqual([
            [true, true, true],
            [true, true, true],
            [true, true, true]
        ]);
    });

    test("should reveal all squares (2)", function() {
        const board = createTestBoard([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);

        const game = reveal(board[0][0], setupGame(board));

        expect(revealed(game)).toEqual([
            [true, true, true],
            [true, true, true],
            [true, true, true]
        ]);
    });

    test("should reveal all squares (3)", function() {
        const board = createTestBoard([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);

        const game = reveal(board[2][2], setupGame(board));

        expect(revealed(game)).toEqual([
            [true, true, true],
            [true, true, true],
            [true, true, true]
        ]);
    });

    test("should reveal 1 square when it has adjacent mines (1)", function() {
        const board = createTestBoard([
            [0, 0, 0],
            [0, 0, 1],
            [0, 0, 0]
        ]);

        const game = reveal(board[1][1], setupGame(board));

        expect(revealed(game)).toEqual([
            [false, false, false],
            [false, true, false],
            [false, false, false]
        ]);
    });

    test("should reveal 1 square when it has adjacent mines (2)", function() {
        const board = createTestBoard([
            [0, 0, 0],
            [0, 0, 1],
            [0, 0, 0]
        ]);

        const game = reveal(board[0][1], setupGame(board));

        expect(revealed(game)).toEqual([
            [false, true, false],
            [false, false, false],
            [false, false, false]
        ]);
    });

    test("should reveal squares until squares with adjacent mines are revealed (1)", function() {
        const board = createTestBoard([
            [0, 0, 0],
            [0, 0, 1],
            [0, 0, 0]
        ]);

        const game = reveal(board[1][0], setupGame(board));

        expect(revealed(game)).toEqual([
            [true, true, false],
            [true, true, false],
            [true, true, false]
        ]);
    });

    test("should reveal squares until squares with adjacent mines are revealed (2)", function() {
        const board = createTestBoard([
            [0, 0, 1],
            [0, 0, 0],
            [1, 0, 0]
        ]);

        const game = reveal(board[2][2], setupGame(board));

        expect(revealed(game)).toEqual([
            [false, false, false],
            [false, true, true],
            [false, true, true]
        ]);
    });

    test("should reveal all appropriate squares on a largish board", function() {
        const board = createTestBoard([
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);

        const game = reveal(board[1][1], setupGame(board));

        expect(revealed(game)).toEqual([
            [true, true, true, true, true, true, true, false, false],
            [true, true, true, true, true, true, true, false, false],
            [true, true, true, true, true, true, true, true, false],
            [true, true, true, true, true, true, true, true, false],
            [false, false, true, true, true, true, true, true, true],
            [false, false, true, true, true, true, true, true, true]
        ]);
    });
});
