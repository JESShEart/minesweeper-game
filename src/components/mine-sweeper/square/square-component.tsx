import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import * as style from "./style.css";
import Square from "./square";

const SquareComponent: FunctionalComponent<Square> = (props: Square) => {
    const { mine, adjacentMines } = props;
    const [revealed, setRevealed] = useState<boolean>(props.revealed);

    const reveal = () => setRevealed(true);

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
