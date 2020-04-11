import { Game } from "../types/game";
import { Square } from "../types/square";
import { GameReducer } from "../game-reducer";
import { reveal } from "../functions/reveal";

export function revealAction(square: Square): GameReducer {
    return function(game: Game): Game {
        return reveal(square, game);
    };
}
