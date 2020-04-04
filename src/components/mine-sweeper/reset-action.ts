import Game from "./types/game";
import { createBoard } from "./functions/create-board";
import { GameAction } from "./game-action";
import createGame from "./functions/update-game";

export default function resetAction(
    height: number,
    width: number,
    mineRatio: number
): GameAction {
    return function(): Game {
        return createGame(createBoard(height, width, mineRatio));
    };
}
