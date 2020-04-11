import { getStatus } from "./get-status";
import { revealMines } from "./reveal-mines";
import { GameStatus } from "../types/game-status";
import { Game } from "../types/game";

function finishedStatus(status: GameStatus): boolean {
    return status === "FAIL" || status === "WIN";
}

export function createGame(game: Game): Game {
    const { board, startedAt } = game;
    const status = getStatus(board);
    const finished = finishedStatus(status);
    return {
        board: finished ? revealMines(board) : board,
        status,
        startedAt,
        finishedAt: finished ? Date.now() : null
    };
}
