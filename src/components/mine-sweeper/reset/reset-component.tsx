import { h } from "preact";
import { GameDispatch, GameReducer } from "../../../mine-sweeper/game-reducer";
import { useState } from "preact/hooks";
import { resetAction } from "../../../mine-sweeper/actions/reset-action";
import * as style from "./reset-component.css";

type Difficulty = "EASY" | "NORMAL" | "HARD";

interface Props {
    dispatch: GameDispatch;
}

export function ResetComponent(props: Props): h.JSX.Element {
    const { dispatch } = props;
    const [difficulty, updateDifficulty] = useState("EASY" as Difficulty);

    function getResetDifficultyAction(): GameReducer {
        switch (difficulty) {
            case "HARD":
                return resetAction(25, 50, 8);
            case "NORMAL":
                return resetAction(15, 25, 8);
            case "EASY":
            default:
                return resetAction(10, 10, 8);
        }
    }

    function reset(e: h.JSX.TargetedEvent): void {
        e.preventDefault();
        dispatch(getResetDifficultyAction());
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onDifficultyInput(e: any): void {
        updateDifficulty(e.target.value as Difficulty);
    }

    return (
        <div className={style.reset}>
            <form onSubmit={reset}>
                <select
                    className={style.select}
                    value={difficulty}
                    onInput={onDifficultyInput}
                >
                    <option value="EASY">Easy (10x10)</option>
                    <option value="NORMAL">Normal (25x15)</option>
                    <option value="HARD">Hard (50x25)</option>
                </select>
                <button type="submit">Reset</button>
            </form>
        </div>
    );
}
