import { createBoard } from "./create-board";
import Square from "../types/square";

/**
 * this will be used in other tests to simplify creating and visualizing a board.
 * @param mines truthy numbers will produce a mine in the position
 */
export function createTestBoard(mines: number[][]): Square[][] {
    const flattened = mines.reduce((it, row) => [...it, ...row], []);
    const randomNumbers = flattened.map(mine => (mine ? 0 : 0.9));
    spyOn(Math, "random").and.returnValues(...randomNumbers);

    const height = mines.length;
    const width = mines[0].length;
    return createBoard(height, width, 2);
}

function mines(board: Square[][]): boolean[][] {
    return board.map(row => row.map(square => square.mine));
}

function adjacentMines(board: Square[][]): number[][] {
    return board.map(row => row.map(square => square.adjacentMines));
}

describe("createBoard", function() {
    test("should have height 2 and width 5", function() {
        const board = createBoard(2, 5, 0);
        expect(board.length).toBe(2);
        expect(board[0].length).toBe(5);
        expect(board[1].length).toBe(5);
    });

    test("should set positions of squares when created", function() {
        const board = createBoard(2, 2, 0);
        function expectPosition(y: number, x: number): void {
            expect(board[y][x].position).toEqual({ y, x });
        }
        expectPosition(0, 0);
        expectPosition(0, 1);
        expectPosition(1, 0);
        expectPosition(1, 1);
    });

    test("should not have revealed squares", function() {
        const board = createBoard(2, 2, 0);

        const revealedSquares = board
            .map(row =>
                row.map(square => square.revealed).filter(revealed => revealed)
            )
            .filter(row => row.length).length;
        expect(revealedSquares).toBe(0);
    });

    test("should set adjacent mines of 1 for 1 mine", function() {
        const board = createTestBoard([
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ]);

        expect(mines(board)).toEqual([
            [false, false, false],
            [false, true, false],
            [false, false, false]
        ]);

        expect(adjacentMines(board)).toEqual([
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ]);
    });

    test("should set adjacent mines for first row of mines", function() {
        const board = createTestBoard([
            [1, 1, 1],
            [0, 0, 0],
            [0, 0, 0]
        ]);

        expect(mines(board)).toEqual([
            [true, true, true],
            [false, false, false],
            [false, false, false]
        ]);

        expect(adjacentMines(board)).toEqual([
            [2, 3, 2],
            [2, 3, 2],
            [0, 0, 0]
        ]);
    });

    test("should set adjacent mines for square surrounded with mines", function() {
        const board = createTestBoard([
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ]);

        expect(mines(board)).toEqual([
            [true, true, true],
            [true, false, true],
            [true, true, true]
        ]);

        expect(adjacentMines(board)).toEqual([
            [3, 5, 3],
            [5, 8, 5],
            [3, 5, 3]
        ]);
    });

    test("should set adjacent mines for an X of mines", function() {
        const board = createTestBoard([
            [1, 0, 1],
            [0, 1, 0],
            [1, 0, 1]
        ]);

        expect(mines(board)).toEqual([
            [true, false, true],
            [false, true, false],
            [true, false, true]
        ]);

        expect(adjacentMines(board)).toEqual([
            [2, 3, 2],
            [3, 5, 3],
            [2, 3, 2]
        ]);
    });
});
