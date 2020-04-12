import { h } from "preact";
import { GameStatus } from "../../../mine-sweeper/types/game-status";
import { Square } from "../../../mine-sweeper/types/square";
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
        const className = ` ${winStyle} ${style.mine}`;
        const mineImgSrc = "/assets/icons/mine.png";
        return <img className={className} src={mineImgSrc} alt="Mine" />;
    }

    return (
        <div className={`${squareStyle.square} ${style.revealed}`}>
            {mine ? mineImg() : adjacentMines || ""}
        </div>
    );
}
