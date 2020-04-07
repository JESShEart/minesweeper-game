import { h } from "preact";
import { Square } from "../../../mine-sweeper/types/square";
import SquareComponent from "../square/square-component";
import * as style from "./style.css";
import { Game } from "../../../mine-sweeper/types/game";
import { GameDispatch } from "../../../mine-sweeper/game-reducer";

interface Props {
    game: Game;
    dispatch: GameDispatch;
}

function BoardComponent(props: Props): h.JSX.Element {
    const { game, dispatch } = props;
    const { status, board } = game;

    function renderSquare(square: Square): h.JSX.Element {
        return (
            <SquareComponent
                square={square}
                status={status}
                dispatch={dispatch}
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

export default BoardComponent;
