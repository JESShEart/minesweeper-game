import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import Square from "./square";
import Position from "../position";

interface Props {
    square: Square;
    reveal: (position: Position) => void;
}

const SquareComponent: FunctionalComponent<Props> = (props: Props) => {
    const { mine, adjacentMines, position, revealed } = props.square;

    const reveal = () => props.reveal(position);

    const hiddenSquare = () => <button class={style.square} onClick={reveal} />;

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
