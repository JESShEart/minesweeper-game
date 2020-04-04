import { h } from "preact";
import { useReducer } from "preact/hooks";
import gameReducer from "../game-action";
import BoardComponent from "../board/board-component";
import ResetComponent from "../reset/reset-component";
import Game from "../types/game";
import { createBoard } from "../functions/create-board";
import getStatus from "../functions/get-status";

function newGame(): Game {
    const board = createBoard(10, 10, 8);
    const status = getStatus(board);
    return { board, status };
}

function GameComponent(): h.JSX.Element {
    const [game, dispatch] = useReducer(gameReducer, newGame());

    return (
        <div>
            <span>Game Status: {game.status}</span>
            <ResetComponent dispatch={dispatch} />
            <BoardComponent game={game} dispatch={dispatch} />
        </div>
    );
}

export default GameComponent;
