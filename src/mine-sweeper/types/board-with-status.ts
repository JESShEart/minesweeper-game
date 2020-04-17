import { GameStatus } from "./game-status";
import { Square } from "./square";
import { DifficultyName } from "./difficulty";

export interface BoardWithStatus {
    difficultyName: DifficultyName;
    status: GameStatus;
    board: Square[][];
}
