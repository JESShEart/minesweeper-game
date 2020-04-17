import { GameDispatch } from "../../../mine-sweeper/game-reducer";
import { h } from "preact";
import { GameStatus } from "../../../mine-sweeper/types/game-status";
import { Square } from "../../../mine-sweeper/types/square";
import { revealAction } from "../../../mine-sweeper/actions/reveal-action";
import * as squareStyle from "./square-component.css";
import * as style from "./hidden-square-component.css";
import { toggleFlaggedSquareAction } from "../../../mine-sweeper/actions/toggle-flagged-square-action";

interface Props {
    square: Square;
    status: GameStatus;
    flagging: boolean;
    dispatch: GameDispatch;
}

export function HiddenSquareComponent(props: Props): h.JSX.Element {
    const { square, status, flagging, dispatch } = props;
    const disabled = status === "FAIL" || status === "WIN";
    const flaggedClass = square.flagged ? style.flagged : "";
    const flaggingClass = flagging ? style.flagging : "";

    function blur(): void {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }

    function reveal(): void {
        if (flagging) {
            dispatch(toggleFlaggedSquareAction(square));
            blur();
        } else if (!square.flagged) {
            dispatch(revealAction(square));
            blur();
        }
    }

    return (
        <div className={squareStyle.square}>
            <button
                disabled={disabled}
                className={`${squareStyle.square} ${style.hidden} ${flaggedClass} ${flaggingClass}`}
                onClick={reveal}
            />
        </div>
    );
}
