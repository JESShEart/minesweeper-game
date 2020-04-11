import { GameStatus } from "./game-status";
import { Square } from "./square";

export interface BoardWithStatus {
    status: GameStatus;
    board: Square[][];
}
