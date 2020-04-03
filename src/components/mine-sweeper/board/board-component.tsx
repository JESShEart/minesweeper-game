import { h } from "preact";
import Square from "../square/square";
import SquareComponent from "../square/square-component";
import * as style from "./style.css";
import { Game } from "../game";
import { RevealSquare } from "../board-reducer";

interface Props {
    game: Game;
    reveal: (revealSquare: RevealSquare) => void;
}

function BoardComponent(props: Props): h.JSX.Element {
    const { game, reveal } = props;
    const { status, board } = game;
    const finished = status === "FAIL";

    function renderSquare(square: Square): h.JSX.Element {
        return (
            <SquareComponent
                square={square}
                reveal={reveal}
                finished={finished}
            />
        );
    }

    function renderRow(row: Square[]): h.JSX.Element {
        return (
            <div class={style.row}>
                {row.map(square => renderSquare(square))}
            </div>
        );
    }

    return <div class={style.board}>{board.map(row => renderRow(row))}</div>;
}

export default BoardComponent;
