import { FunctionalComponent, h } from "preact";
import Square from "../square/square";
import SquareComponent from "../square/square-component";
import * as style from "./style.css";
import { useReducer } from "preact/hooks";
import { boardReducer } from "../board-reducer";
import Position from "../position";

interface Props {
    squares: Square[][];
}

const BoardComponent: FunctionalComponent<Props> = (props: Props) => {
    const [squares, dispatch] = useReducer(boardReducer, props.squares);

    const onReveal = (position: Position) => dispatch(position);

    const renderSquare = (square: Square) => (
        <SquareComponent square={square} reveal={onReveal} />
    );

    const renderRow = (row: Square[]) => (
        <div class={style.row}>{row.map(square => renderSquare(square))}</div>
    );

    return <div class={style.board}>{squares.map(row => renderRow(row))}</div>;
};

export default BoardComponent;
