import { h } from "preact";
import { useReducer } from "preact/hooks";
import { gameReducer } from "../../mine-sweeper/game-reducer";
import { BoardComponent } from "./board/board-component";
import { ResetComponent } from "./reset/reset-component";
import { Game } from "../../mine-sweeper/types/game";
import { createGame } from "../../mine-sweeper/functions/create-game";
import { createBoard } from "../../mine-sweeper/functions/create-board";
import { StatusComponent } from "./status/status-component";
import * as style from "./mine-sweeper-component.css";

function newGame(): Game {
    const board = createBoard(10, 10, 8);
    return createGame(board);
}

export function MineSweeperComponent(): h.JSX.Element {
    const [game, dispatch] = useReducer(gameReducer, newGame());

    return (
        <div>
            <div className={style.row}>
                <StatusComponent status={game.status} />
                <ResetComponent dispatch={dispatch} />
            </div>
            <BoardComponent game={game} dispatch={dispatch} />
        </div>
    );
}
