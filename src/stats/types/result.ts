import { DifficultyName } from "../../mine-sweeper/types/difficulty";

export interface Result {
    difficulty: DifficultyName;
    win: boolean;
    startedAt: number;
    finishedAt: number;
}
