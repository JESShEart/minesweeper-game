import { h } from "preact";
import * as style from "./style.css";
import Square from "./square";
import { RevealSquare } from "../board-reducer";

interface Props {
    finished: boolean;
    square: Square;
    reveal: (revealSquare: RevealSquare) => void;
}

function SquareComponent(props: Props): h.JSX.Element {
    const { finished, square } = props;
    const { mine, adjacentMines, position, revealed } = square;

    function reveal(): void {
        props.reveal(new RevealSquare(position));
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

export default SquareComponent;
