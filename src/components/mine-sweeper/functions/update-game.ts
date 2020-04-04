import Game, { GameStatus } from "../types/game";
import getStatus from "./get-status";
import revealMines from "./reveal-mines";
import Square from "../types/square";

function finished(status: GameStatus): boolean {
    return status === "FAIL" || status === "WIN";
}

function revealMinesIfFinished({ status, board }: Game): Game {
    return {
        status,
        board: finished(status) ? revealMines(board) : board
    };
}

function getGameStatus(board: Square[][]): Game {
    return {
        board,
        status: getStatus(board)
    };
}

export default function createGame(board: Square[][]): Game {
    return revealMinesIfFinished(getGameStatus(board));
}
