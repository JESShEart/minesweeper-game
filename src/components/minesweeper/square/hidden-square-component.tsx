import { GameDispatch } from "../../../minesweeper/game-reducer";
import { h } from "preact";
import { GameStatus } from "../../../minesweeper/types/game-status";
import { Square } from "../../../minesweeper/types/square";
import { revealAction } from "../../../minesweeper/actions/reveal-action";
import * as squareStyle from "./square-component.css";
import * as style from "./hidden-square-component.css";
import { toggleFlaggedSquareAction } from "../../../minesweeper/actions/toggle-flagged-square-action";
import { StatsDispatch } from "../../../stats/stats-reducer";
import { useState } from "preact/hooks";

interface Props {
    square: Square;
    status: GameStatus;
    flagging: boolean;
    dispatch: GameDispatch;
    statsDispatch: StatsDispatch;
}

export function HiddenSquareComponent(props: Props): h.JSX.Element {
    const [timeoutId, updateTimeoutId] = useState(0);
    const { square, status, flagging, dispatch, statsDispatch } = props;
    const disabled = status === "FAIL" || status === "WIN";
    const flaggedClass = square.flagged ? style.flagged : "";
    const flaggingClass = flagging ? style.flagging : "";

    function blur(): void {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }

    function immediateReveal(): void {
        if (!square.flagged) {
            dispatch(revealAction(square, statsDispatch));
        }
    }

    function longPressReveal(): void {
        if (!flagging) {
            const newTimeoutId = window.setTimeout(immediateReveal, 1000);
            updateTimeoutId(newTimeoutId);
        }
    }

    function cancelLongPressReveal(): void {
        if (timeoutId) {
            window.clearTimeout(timeoutId);
            updateTimeoutId(0);
        }
        blur();
    }

    function reveal(revealFunction: () => void): void {
        if (disabled) {
            return;
        } else if (flagging) {
            dispatch(toggleFlaggedSquareAction(square));
            blur();
        } else if (!square.flagged) {
            revealFunction();
        }
    }

    function mouseReveal(): void {
        reveal(immediateReveal);
    }

    function touchReveal(
        event: h.JSX.TargetedTouchEvent<HTMLButtonElement>
    ): void {
        event.preventDefault();
        reveal(longPressReveal);
    }

    return (
        <div className={squareStyle.square}>
            <button
                disabled={disabled}
                className={`${squareStyle.square} ${style.hidden} ${flaggedClass} ${flaggingClass}`}
                onClick={mouseReveal}
                onTouchStart={touchReveal}
                onTouchEnd={cancelLongPressReveal}
                onTouchMove={cancelLongPressReveal}
            />
        </div>
    );
}
