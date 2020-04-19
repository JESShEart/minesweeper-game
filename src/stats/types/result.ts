import { DifficultyName } from "../../minesweeper/types/difficulty";

export interface Result {
    difficultyName: DifficultyName;
    win: boolean;
    startedAt: number;
    finishedAt: number;
}
