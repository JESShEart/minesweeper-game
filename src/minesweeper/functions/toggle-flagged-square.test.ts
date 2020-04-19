import { toggleFlaggedSquare } from "./toggle-flagged-square";
import { Square } from "../types/square";
import { Game } from "../types/game";
import { createTestBoard } from "../../testing/create-test-board";

function flagged({ board }: Game): boolean[][] {
    return board.map(row => row.map(square => square.flagged));
}

function setupGame(board: Square[][]): Game {
    return { board } as Game;
}

describe("toggleFlaggedSquare", function() {
    let board: Square[][];

    beforeEach(function() {
        board = createTestBoard([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);
    });

    test("should toggle [0, 0] to flagged", function() {
        const game = toggleFlaggedSquare(board[0][0], setupGame(board));
        expect(flagged(game)).toEqual([
            [true, false, false],
            [false, false, false],
            [false, false, false]
        ]);
    });

    test("should toggle [1, 1] to flagged", function() {
        const game = toggleFlaggedSquare(board[1][1], setupGame(board));
        expect(flagged(game)).toEqual([
            [false, false, false],
            [false, true, false],
            [false, false, false]
        ]);
    });

    test("should toggle [1, 2] to flagged", function() {
        const game = toggleFlaggedSquare(board[1][2], setupGame(board));
        expect(flagged(game)).toEqual([
            [false, false, false],
            [false, false, true],
            [false, false, false]
        ]);
    });

    test("should toggle [2, 1] to not flagged", function() {
        board[2][1].flagged = true;
        const game = toggleFlaggedSquare(board[2][1], setupGame(board));
        expect(flagged(game)).toEqual([
            [false, false, false],
            [false, false, false],
            [false, false, false]
        ]);
    });

    test("should toggle [2, 2] to not flagged", function() {
        board[2][2].flagged = true;
        const game = toggleFlaggedSquare(board[2][2], setupGame(board));
        expect(flagged(game)).toEqual([
            [false, false, false],
            [false, false, false],
            [false, false, false]
        ]);
    });
});
