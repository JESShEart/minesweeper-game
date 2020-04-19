import { Game } from "../types/game";
import { Square } from "../types/square";

function toggleSquareFlagged(square: Square): Square {
    return {
        ...square,
        flagged: !square.flagged
    };
}

export function toggleFlaggedSquare(square: Square, game: Game): Game {
    const board = game.board.map(row =>
        row.map(currentSquare =>
            currentSquare.position.y === square.position.y &&
            currentSquare.position.x === square.position.x
                ? toggleSquareFlagged(currentSquare)
                : currentSquare
        )
    );
    return { ...game, board };
}
