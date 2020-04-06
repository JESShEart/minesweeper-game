import { Square } from "./square";
import { GameStatus } from "./game-status";

export interface Game {
    status: GameStatus;
    board: Square[][];
}
