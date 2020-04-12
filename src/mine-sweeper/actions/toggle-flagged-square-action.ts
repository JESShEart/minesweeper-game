import { Game } from "../types/game";
import { Square } from "../types/square";
import { GameReducer } from "../game-reducer";
import { toggleFlaggedSquare } from "../functions/toggle-flagged-square";

export function toggleFlaggedSquareAction(square: Square): GameReducer {
    return function(game: Game): Game {
        return toggleFlaggedSquare(square, game);
    };
}
