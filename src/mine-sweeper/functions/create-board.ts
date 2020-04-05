import Square from "../types/square";
import { getAdjacentSquares } from "./get-adjacent-squares";

function createEmptyBoard(height: number, width: number): Square[][] {
    return new Array<Square[]>(height).fill(
        new Array<Square>(width).fill({
            position: { x: 0, y: 0 },
            revealed: false,
            mine: false,
            adjacentMines: 0
        })
    );
}

function setMinesAndPositions(
    emptyBoard: Square[][],
    mineRatio: number
): Square[][] {
    return emptyBoard.map((row, y) =>
        row.map((square, x) => ({
            ...square,
            position: { x, y },
            mine: Math.floor(Math.random() * mineRatio) === 0
        }))
    );
}

function getAdjacentMines(square: Square, squares: Square[][]): number {
    return getAdjacentSquares(square, squares).reduce(
        (adjacentMines: number, { mine }: Square) =>
            mine ? adjacentMines + 1 : adjacentMines,
        square.mine ? 1 : 0
    );
}

function markAdjacentMines(minedBoard: Square[][]): Square[][] {
    return minedBoard.map(row =>
        row.map(square => ({
            ...square,
            adjacentMines: getAdjacentMines(square, minedBoard)
        }))
    );
}

export function createBoard(
    height: number,
    width: number,
    mineRatio: number
): Square[][] {
    const emptyBoard = createEmptyBoard(height, width);
    const minedBoard = setMinesAndPositions(emptyBoard, mineRatio);
    return markAdjacentMines(minedBoard);
}
