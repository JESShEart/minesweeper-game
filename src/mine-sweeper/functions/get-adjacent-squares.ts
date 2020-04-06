import { Position } from "../types/position";
import { Square } from "../types/square";

function realPosition(
    { x, y }: Position,
    width: number,
    height: number
): boolean {
    return x >= 0 && y >= 0 && x < width && y < height;
}

function getAdjacentPositions(
    { x, y }: Position,
    width: number,
    height: number
): Position[] {
    return [
        // row above
        { x: x - 1, y: y - 1 },
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        // same row
        { x: x - 1, y },
        { x: x + 1, y },
        // row below
        { x: x - 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x + 1, y: y + 1 }
    ].filter(position => realPosition(position, width, height));
}

export function getAdjacentSquares(
    square: Square,
    squares: Square[][]
): Square[] {
    return getAdjacentPositions(
        square.position,
        squares[0].length,
        squares.length
    ).map(({ x, y }) => squares[y][x]);
}
