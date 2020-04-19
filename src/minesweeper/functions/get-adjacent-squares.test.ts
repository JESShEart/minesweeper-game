import { getAdjacentSquares } from "./get-adjacent-squares";
import { Square } from "../types/square";
import { createTestBoard } from "../../testing/create-test-board";

describe("getAdjacentSquares", function() {
    let board: Square[][];

    function verify(adjacentSquares: Square[], expectation: number[][]): void {
        const expectedSquares: Square[][] = expectation.map((row, y) =>
            row
                .map((expected, x) => (expected ? board[y][x] : undefined))
                .filter(it => it)
        ) as Square[][];

        expectedSquares
            .reduce((it, n) => [...it, ...n], [])
            .forEach(square => expect(adjacentSquares).toContain(square));
    }

    beforeEach(() => {
        board = createTestBoard([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);
    });

    test("should return adjacent squares on all sides", function() {
        const adjacentSquares = getAdjacentSquares(board[1][1], board);
        expect(adjacentSquares.length).toBe(8);
        verify(adjacentSquares, [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ]);
    });

    test("should return adjacent squares on top, bottom and left", function() {
        const adjacentSquares = getAdjacentSquares(board[1][2], board);
        expect(adjacentSquares.length).toBe(5);
        verify(adjacentSquares, [
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 1]
        ]);
    });

    test("should return adjacent squares on bottom and left", function() {
        const adjacentSquares = getAdjacentSquares(board[0][2], board);
        expect(adjacentSquares.length).toBe(3);
        verify(adjacentSquares, [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ]);
    });

    test("should return adjacent squares on top and right", function() {
        const adjacentSquares = getAdjacentSquares(board[2][0], board);
        expect(adjacentSquares.length).toBe(3);
        verify(adjacentSquares, [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]);
    });

    test("should return adjacent squares on top, right and left", function() {
        const adjacentSquares = getAdjacentSquares(board[2][1], board);
        expect(adjacentSquares.length).toBe(5);
        verify(adjacentSquares, [
            [0, 0, 0],
            [1, 1, 1],
            [1, 0, 1]
        ]);
    });

    test("should return adjacent squares on top, right and bottom", function() {
        const adjacentSquares = getAdjacentSquares(board[1][0], board);
        expect(adjacentSquares.length).toBe(5);
        verify(adjacentSquares, [
            [1, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]);
    });

    test("should return adjacent squares on right, bottom and left", function() {
        const adjacentSquares = getAdjacentSquares(board[0][1], board);
        expect(adjacentSquares.length).toBe(5);
        verify(adjacentSquares, [
            [1, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ]);
    });
});
