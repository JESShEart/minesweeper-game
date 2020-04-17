import { DifficultyName } from "../../mine-sweeper/types/difficulty";

export interface Result {
    difficultyName: DifficultyName;
    win: boolean;
    startedAt: number;
    finishedAt: number;
}
