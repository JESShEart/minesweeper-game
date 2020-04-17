import { Game } from "../types/game";
import { createBoard } from "./create-board";
import { Difficulty } from "../types/difficulty";

export function resetGame({ height, width, mineRatio }: Difficulty): Game {
    return {
        board: createBoard(height, width, mineRatio),
        status: "START",
        flagging: false,
        startedAt: null,
        finishedAt: null
    };
}
