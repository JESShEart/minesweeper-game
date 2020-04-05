import Square from "./square";

export type GameStatus = "PLAY" | "WIN" | "FAIL";

export interface Game {
    status: GameStatus;
    board: Square[][];
}
