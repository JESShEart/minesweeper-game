import { Game } from "../types/game";
import { createBoard } from "./create-board";
import { Difficulty } from "../types/difficulty";

export function resetGame(difficulty: Difficulty): Game {
    const { height, width, mineRatio, name } = difficulty;
    return {
        board: createBoard(height, width, mineRatio),
        status: "START",
        difficultyName: name,
        flagging: false,
        startedAt: null,
        finishedAt: null
    };
}
