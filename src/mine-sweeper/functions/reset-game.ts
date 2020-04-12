import { Game } from "../types/game";
import { createBoard } from "./create-board";

export function resetGame(
    height: number,
    width: number,
    mineRatio: number
): Game {
    return {
        board: createBoard(height, width, mineRatio),
        status: "START",
        flagging: false,
        startedAt: null,
        finishedAt: null
    };
}
