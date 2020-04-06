import { Game } from "../types/game";
import { getStatus } from "./get-status";
import { revealMines } from "./reveal-mines";
import { Square } from "../types/square";
import { GameStatus } from "../types/game-status";

function finished(status: GameStatus): boolean {
    return status === "FAIL" || status === "WIN";
}

function revealMinesIfFinished({ status, board }: Game): Game {
    return {
        status,
        board: finished(status) ? revealMines(board) : board
    };
}

function createGameWithStatus(board: Square[][]): Game {
    return {
        board,
        status: getStatus(board)
    };
}

export function createGame(board: Square[][]): Game {
    const gameWithStatus = createGameWithStatus(board);
    return revealMinesIfFinished(gameWithStatus);
}
