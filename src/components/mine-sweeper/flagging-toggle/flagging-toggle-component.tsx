import { h } from "preact";
import { GameDispatch } from "../../../mine-sweeper/game-reducer";
import * as style from "./flagging-toggle-component.css";
import { GameStatus } from "../../../mine-sweeper/types/game-status";
import { toggleFlaggingAction } from "../../../mine-sweeper/actions/toggle-flagging-action";
import { useEffect } from "preact/hooks";

interface Props {
    status: GameStatus;
    flagging: boolean;
    dispatch: GameDispatch;
}

export function FlaggingToggleComponent(props: Props): h.JSX.Element {
    const { status, flagging, dispatch } = props;
    const buttonFlaggingClass = flagging ? style.buttonActive : "";
    const disabled = status === "WIN" || status === "FAIL";

    function toggleFlagging(): void {
        dispatch(toggleFlaggingAction());
    }

    function onKeyPress(e: KeyboardEvent): void {
        if (!disabled && e.key === "f") {
            toggleFlagging();
        }
    }

    useEffect(function() {
        document.addEventListener("keydown", onKeyPress);
        return function(): void {
            document.removeEventListener("keydown", onKeyPress);
        };
    });

    return (
        <div className={`${style.container} ${buttonFlaggingClass}`}>
            <div className={style.buttonBackground}>
                <button
                    onClick={toggleFlagging}
                    disabled={disabled}
                    className={style.button}
                    title="Toggle flagging mines (Press F for shortcut)"
                >
                    <span className={style.flag}>🚩</span>
                </button>
            </div>
        </div>
    );
}
