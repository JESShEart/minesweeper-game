import { h } from "preact";
import { GameDispatch } from "../../../mine-sweeper/game-reducer";
import { useState } from "preact/hooks";
import * as style from "./flagging-toggle-component.css";
import { GameStatus } from "../../../mine-sweeper/types/game-status";

interface Props {
    status: GameStatus;
    flagging: boolean;
    dispatch: GameDispatch;
}

export function FlaggingToggleComponent(props: Props): h.JSX.Element {
    const { status, dispatch } = props;
    const [flagging, updateFlagging] = useState(props.flagging);
    const flaggingClass = flagging ? style.active : "";
    const label = flagging ? "Flagging" : "Clearing";
    const disabled = status === "WIN" || status === "FAIL";

    function toggleFlagging(): void {
        updateFlagging(!flagging);
    }

    return (
        <div className={style.container}>
            <button
                onClick={toggleFlagging}
                disabled={disabled}
                className={style.button}
            >
                <span className={`${style.flag} ${flaggingClass}`}>🚩</span>
                {label}
            </button>
        </div>
    );
}
