import { FunctionalComponent, h } from "preact";
import Square from "../square/square";
import SquareComponent from "../square/square-component";
import * as style from "./style.css";

interface Props {
    readonly squares: readonly Square[][];
}

const BoardComponent: FunctionalComponent<Props> = (props: Props) => {
    const { squares } = props;

    const renderSquare = (square: Square) => (
        <SquareComponent
            position={square.position}
            adjacentMines={square.adjacentMines}
            mine={square.mine}
            revealed={square.revealed}
        />
    );

    const renderRow = (row: Square[]) => (
        <div class={style.row}>{row.map(square => renderSquare(square))}</div>
    );

    return <div class={style.board}>{squares.map(row => renderRow(row))}</div>;
};

export default BoardComponent;
