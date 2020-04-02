import { Reducer } from "preact/hooks";
import Position from "./position";
import {
    createBoard,
    getStatus,
    revealLoop,
    revealMines
} from "./board-functions";
import { Game } from "./game";

export class RevealSquare {
    readonly type = "REVEAL";
    payload: Position;
    constructor(payload: Position) {
        this.payload = payload;
    }
}

function revealAction(game: Game, position: Position): Game {
    const revealedBoard = revealLoop(position, game.board);
    const status = getStatus(revealedBoard);
    const failed = status === "FAIL";
    const board = failed ? revealMines(revealedBoard) : revealedBoard;
    return { board, status };
}

export interface ResetPayload {
    size: number;
    mineRatio: number;
}

export class ResetGame {
    readonly type = "RESET";
    payload: ResetPayload;
    constructor(payload: ResetPayload) {
        this.payload = payload;
    }
}

export function resetAction({ size, mineRatio }: ResetPayload): Game {
    const board = createBoard(size, mineRatio);
    const status = getStatus(board);
    return { board, status };
}

export type BoardAction = RevealSquare | ResetGame;

export const boardReducer: Reducer<Game, BoardAction> = (
    game,
    action: BoardAction
) => {
    if (action.type === "REVEAL") {
        return revealAction(game, action.payload);
    } else {
        return resetAction(action.payload);
    }
};
