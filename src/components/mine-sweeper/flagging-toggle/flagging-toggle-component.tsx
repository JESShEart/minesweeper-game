import { h } from "preact";
import { GameDispatch } from "../../../mine-sweeper/game-reducer";
import * as style from "./flagging-toggle-component.css";
import { GameStatus } from "../../../mine-sweeper/types/game-status";
import { toggleFlaggingAction } from "../../../mine-sweeper/actions/toggle-flagging-action";

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

    return (
        <div className={`${style.container} ${buttonFlaggingClass}`}>
            <div className={style.buttonBackground}>
                <button
                    onClick={toggleFlagging}
                    disabled={disabled}
                    className={style.button}
                >
                    <span className={style.flag}>🚩</span>
                </button>
            </div>
        </div>
    );
}
