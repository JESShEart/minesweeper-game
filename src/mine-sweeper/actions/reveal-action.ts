import { Game } from "../types/game";
import { Square } from "../types/square";
import { GameReducer } from "../game-reducer";
import { reveal } from "../functions/reveal";
import { createGame } from "../functions/create-game";

export function revealAction(square: Square): GameReducer {
    return function(game: Game): Game {
        const board = reveal(square, game.board);
        return createGame(board);
    };
}
