import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import Square from "./square";
import { RevealSquare } from "../board-reducer";

interface Props {
    finished: boolean;
    square: Square;
    reveal: (revealSquare: RevealSquare) => void;
}

const SquareComponent: FunctionalComponent<Props> = (props: Props) => {
    const { finished, square } = props;
    const { mine, adjacentMines, position, revealed } = square;

    const reveal = () => props.reveal(new RevealSquare(position));

    const hiddenSquare = () => (
        <button disabled={finished} class={style.square} onClick={reveal} />
    );

    const adjacentMinesOrBlank = () => adjacentMines || "";

    const mineImg = () => {
        const mineImgSrc = "/assets/icons/mine.png";
        return <img src={mineImgSrc} />;
    };

    const revealedSquare = () => {
        return (
            <div class={style.revealed}>
                {mine ? mineImg() : adjacentMinesOrBlank()}
            </div>
        );
    };

    return <div>{revealed ? revealedSquare() : hiddenSquare()}</div>;
};

export default SquareComponent;
