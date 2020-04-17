import { h } from "preact";
import { GameDispatch } from "../../../mine-sweeper/game-reducer";
import { useState } from "preact/hooks";
import { resetAction } from "../../../mine-sweeper/actions/reset-action";
import * as style from "./reset-component.css";
import {
    Difficulty,
    DifficultyName,
    EASY,
    HARD,
    NORMAL
} from "../../../mine-sweeper/types/difficulty";

interface Props {
    dispatch: GameDispatch;
}

export function ResetComponent(props: Props): h.JSX.Element {
    const { dispatch } = props;
    const [difficulty, updateDifficulty] = useState("EASY" as DifficultyName);

    function getResetDifficultyValue(): Difficulty {
        switch (difficulty) {
            case "HARD":
                return HARD;
            case "NORMAL":
                return NORMAL;
            case "EASY":
                return EASY;
        }
    }

    function reset(e: h.JSX.TargetedEvent): void {
        e.preventDefault();
        dispatch(resetAction(getResetDifficultyValue()));
    }

    function onDifficultyInput(
        e: h.JSX.TargetedEvent<HTMLSelectElement, Event>
    ): void {
        updateDifficulty(e.currentTarget.value as DifficultyName);
    }

    return (
        <div className={style.reset}>
            <form onSubmit={reset}>
                <select
                    className={style.select}
                    value={difficulty}
                    onInput={onDifficultyInput}
                >
                    <option value={EASY.name}>
                        Easy ({EASY.width}x{EASY.height})
                    </option>
                    <option value={NORMAL.name}>
                        Normal ({NORMAL.width}x{NORMAL.height})
                    </option>
                    <option value={HARD.name}>
                        Hard ({HARD.width}x{HARD.height})
                    </option>
                </select>
                <button className={style.submit} type="submit">
                    Reset
                </button>
            </form>
        </div>
    );
}
