import Square from "../types/square";
import { GameStatus } from "../types/game";

export function getStatus(squares: Square[][]): GameStatus {
    const mineRevealed = squares.find(row =>
        row.find(square => square.revealed && square.mine)
    );

    if (mineRevealed) {
        return "FAIL";
    }

    const nonMineNotRevealed = squares.find(row =>
        row.find(square => !square.revealed && !square.mine)
    );
    return nonMineNotRevealed ? "PLAY" : "WIN";
}
