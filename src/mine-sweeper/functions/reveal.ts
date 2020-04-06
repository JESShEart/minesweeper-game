import { Square } from "../types/square";
import { getAdjacentSquares } from "./get-adjacent-squares";

function getAdjacentSquaresToReveal(
    square: Square,
    squares: Square[][]
): Square[] {
    return getAdjacentSquares(square, squares).filter(s =>
        s.mine ? false : !s.revealed
    );
}

function getPositionToReveal(
    squaresWithAdjacentToReveal: Square[],
    squares: Square[][]
): Square | undefined {
    let adjacentSquareToReveal: Square | undefined = undefined;
    squaresWithAdjacentToReveal.find(square => {
        const adjacentSquaresToReveal = getAdjacentSquaresToReveal(
            square,
            squares
        );

        adjacentSquareToReveal = adjacentSquaresToReveal.length
            ? adjacentSquaresToReveal[0]
            : undefined;

        return !!adjacentSquareToReveal;
    });
    return adjacentSquareToReveal;
}

function hasAdjacentSquaresToReveal(
    square: Square,
    squares: Square[][]
): boolean {
    return (
        square.adjacentMines === 0 &&
        getAdjacentSquaresToReveal(square, squares).length > 0
    );
}

export function reveal(square: Square, squares: Square[][]): Square[][] {
    let squaresWithAdjacentToReveal: Square[] = [];
    let currentSquare: Square | undefined = square;

    while (currentSquare) {
        currentSquare.revealed = true;

        if (hasAdjacentSquaresToReveal(currentSquare, squares)) {
            squaresWithAdjacentToReveal = [
                ...squaresWithAdjacentToReveal,
                currentSquare
            ];
        } else {
            squaresWithAdjacentToReveal = squaresWithAdjacentToReveal.filter(
                s => s !== currentSquare
            );
        }

        currentSquare = getPositionToReveal(
            squaresWithAdjacentToReveal,
            squares
        );
    }

    return squares;
}
