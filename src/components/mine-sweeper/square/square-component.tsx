import { h } from "preact";
import * as style from "./style.css";
import Square from "../types/square";
import { GameDispatch } from "../game-action";
import revealAction from "../reveal-action";

interface Props {
    finished: boolean;
    square: Square;
    dispatch: GameDispatch;
}

export default function SquareComponent(props: Props): h.JSX.Element {
    const { finished, square, dispatch } = props;
    const { mine, adjacentMines, revealed } = square;

    function reveal(): void {
        dispatch(revealAction(square));
    }

    function hiddenSquare(): h.JSX.Element {
        return (
            <button disabled={finished} class={style.square} onClick={reveal} />
        );
    }

    function mineImg(): h.JSX.Element {
        const mineImgSrc = "/assets/icons/mine.png";
        return <img src={mineImgSrc} alt="Mine" />;
    }

    function revealedSquare(): h.JSX.Element {
        const content = mine ? mineImg() : adjacentMines || "";
        return <div class={style.revealed}>{content}</div>;
    }

    return <div>{revealed ? revealedSquare() : hiddenSquare()}</div>;
}
