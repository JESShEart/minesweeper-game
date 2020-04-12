import { Square } from "../types/square";
import { GameStatus } from "../types/game-status";

interface StatusProof {
    gameStarted: boolean;
    mineRevealed: boolean;
    nonMineNotRevealed: boolean;
}

function findStatusProof(squares: Square[][]): StatusProof {
    let gameStarted = false;
    let mineRevealed = false;
    let nonMineNotRevealed = false;
    squares.forEach(row =>
        row.forEach(square => {
            if (!gameStarted && square.revealed) {
                gameStarted = true;
            }
            if (!mineRevealed && square.revealed && square.mine) {
                mineRevealed = true;
            }
            if (!nonMineNotRevealed && !square.revealed && !square.mine) {
                nonMineNotRevealed = true;
            }
        })
    );
    return { gameStarted, mineRevealed, nonMineNotRevealed };
}

export function getStatus(squares: Square[][]): GameStatus {
    const { gameStarted, mineRevealed, nonMineNotRevealed } = findStatusProof(
        squares
    );

    if (!gameStarted) {
        return "START";
    } else if (mineRevealed) {
        return "FAIL";
    } else if (nonMineNotRevealed) {
        return "PLAY";
    } else {
        return "WIN";
    }
}
