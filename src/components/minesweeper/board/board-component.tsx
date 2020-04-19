import { h } from "preact";
import { Square } from "../../../minesweeper/types/square";
import { SquareComponent } from "../square/square-component";
import * as style from "./board-component.css";
import { Game } from "../../../minesweeper/types/game";
import { GameDispatch } from "../../../minesweeper/game-reducer";
import { StatsDispatch } from "../../../stats/stats-reducer";

interface Props {
    game: Game;
    dispatch: GameDispatch;
    statsDispatch: StatsDispatch;
}

export function BoardComponent(props: Props): h.JSX.Element {
    const { game, dispatch, statsDispatch } = props;
    const { status, board, flagging } = game;

    function renderSquare(square: Square): h.JSX.Element {
        return (
            <SquareComponent
                square={square}
                status={status}
                flagging={flagging}
                dispatch={dispatch}
                statsDispatch={statsDispatch}
            />
        );
    }

    function renderRow(row: Square[]): h.JSX.Element {
        return (
            <div className={style.row}>
                {row.map(square => renderSquare(square))}
            </div>
        );
    }

    return (
        <div className={style.board}>{board.map(row => renderRow(row))}</div>
    );
}
