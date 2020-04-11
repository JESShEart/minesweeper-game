import { Game } from "../types/game";
import { GameReducer } from "../game-reducer";
import { resetGame } from "../functions/reset-game";

export function resetAction(
    height: number,
    width: number,
    mineRatio: number
): GameReducer {
    return function(): Game {
        return resetGame(height, width, mineRatio);
    };
}
