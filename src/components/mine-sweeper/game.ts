import Square from "./square/square";

export type GameStatus = "PLAY" | "WIN" | "FAIL";

export interface Game {
    status: GameStatus;
    board: Square[][];
}
