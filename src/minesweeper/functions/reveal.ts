import { Square } from "../types/square";
import { getAdjacentSquares } from "./get-adjacent-squares";
import { createGame } from "./create-game";
import { Game } from "../types/game";

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

function revealSquare(square: Square, squares: Square[][]): void {
    const { y, x } = square.position;
    squares[y][x] = {
        ...square,
        revealed: true
    };
}

export function revealBoard(square: Square, squares: Square[][]): Square[][] {
    let squaresWithAdjacentToReveal: Square[] = [];
    let currentSquare: Square | undefined = square;

    // copying squares array to avoid manipulating the one that is passed in
    // creating a new set of squares for each square revealed is too costly
    squares = squares.map(it => it);

    while (currentSquare) {
        revealSquare(currentSquare, squares);

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

export function reveal(square: Square, game: Game): Game {
    return createGame({
        ...game,
        board: revealBoard(square, game.board),
        startedAt: game.startedAt || Date.now()
    });
}
