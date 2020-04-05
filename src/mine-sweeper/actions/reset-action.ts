import Game from "../types/game";
import { createBoard } from "../functions/create-board";
import { GameReducer } from "../game-reducer";
import createGame from "../functions/update-game";

export default function resetAction(
    height: number,
    width: number,
    mineRatio: number
): GameReducer {
    return function(): Game {
        const board = createBoard(height, width, mineRatio);
        return createGame(board);
    };
}
