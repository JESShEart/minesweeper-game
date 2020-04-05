import Square from "./square";

export type GameStatus = "PLAY" | "WIN" | "FAIL";

export default interface Game {
    status: GameStatus;
    board: Square[][];
}
