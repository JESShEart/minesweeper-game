import { Game } from "../types/game";
import { GameReducer } from "../game-reducer";
import { resetGame } from "../functions/reset-game";
import { Difficulty } from "../types/difficulty";

export function resetAction(difficulty: Difficulty): GameReducer {
    return function(): Game {
        return resetGame(difficulty);
    };
}
