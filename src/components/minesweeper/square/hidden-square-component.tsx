import { GameDispatch } from "../../../minesweeper/game-reducer";
import { h } from "preact";
import { GameStatus } from "../../../minesweeper/types/game-status";
import { Square } from "../../../minesweeper/types/square";
import { revealAction } from "../../../minesweeper/actions/reveal-action";
import * as squareStyle from "./square-component.css";
import * as style from "./hidden-square-component.css";
import { toggleFlaggedSquareAction } from "../../../minesweeper/actions/toggle-flagged-square-action";
import { StatsDispatch } from "../../../stats/stats-reducer";

interface Props {
    square: Square;
    status: GameStatus;
    flagging: boolean;
    dispatch: GameDispatch;
    statsDispatch: StatsDispatch;
}

export function HiddenSquareComponent(props: Props): h.JSX.Element {
    const { square, status, flagging, dispatch, statsDispatch } = props;
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
            dispatch(revealAction(square, statsDispatch));
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
