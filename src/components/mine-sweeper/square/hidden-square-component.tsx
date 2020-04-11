import { GameDispatch } from "../../../mine-sweeper/game-reducer";
import { h } from "preact";
import { GameStatus } from "../../../mine-sweeper/types/game-status";
import { Square } from "../../../mine-sweeper/types/square";
import { revealAction } from "../../../mine-sweeper/actions/reveal-action";
import * as squareStyle from "./square-component.css";
import * as style from "./hidden-square-component.css";

interface Props {
    status: GameStatus;
    square: Square;
    dispatch: GameDispatch;
}

export function HiddenSquareComponent(props: Props): h.JSX.Element {
    const { status, square, dispatch } = props;

    function reveal(): void {
        dispatch(revealAction(square));
    }

    return (
        <div className={squareStyle.square}>
            <button
                disabled={status !== "PLAY"}
                className={`${squareStyle.square} ${style.hidden}`}
                onClick={reveal}
            />
        </div>
    );
}
