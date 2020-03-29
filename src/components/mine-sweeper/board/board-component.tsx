import { FunctionalComponent, h } from "preact";
import Square from "../square/square";
import SquareComponent from "../square/square-component";
import * as style from "./style.css";
import { Game } from "../game";

interface Props {
    game: Game;
    dispatch: any;
}

const BoardComponent: FunctionalComponent<Props> = ({ game, dispatch }: Props) => {
    const { status, board } = game;

    const finished = status === "FAIL";

    const renderSquare = (square: Square) => (
        <SquareComponent square={square} reveal={dispatch} finished={finished} />
    );

    const renderRow = (row: Square[]) => (
        <div class={style.row}>{row.map(square => renderSquare(square))}</div>
    );

    return <div class={style.board}>{board.map(row => renderRow(row))}</div>;
};

export default BoardComponent;
