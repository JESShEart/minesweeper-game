import { h } from "preact";
import { GameStatus } from "../../../minesweeper/types/game-status";
import { Square } from "../../../minesweeper/types/square";
import * as squareStyle from "./square-component.css";
import * as style from "./revealed-square-component.css";

interface Props {
    square: Square;
    status: GameStatus;
}

export function RevealedSquareComponent(props: Props): h.JSX.Element {
    const { status, square } = props;
    const { mine, adjacentMines } = square;

    function mineImg(): h.JSX.Element {
        const winStyle = status === "WIN" ? style.win : "";
        const className = `${winStyle} ${style.mine}`;
        return <span className={className}>💣</span>;
    }

    return (
        <div className={`${squareStyle.square} ${style.revealed}`}>
            {mine ? mineImg() : adjacentMines || ""}
        </div>
    );
}
