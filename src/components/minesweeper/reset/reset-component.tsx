import { h } from "preact";
import { GameDispatch } from "../../../minesweeper/game-reducer";
import { useState } from "preact/hooks";
import { resetAction } from "../../../minesweeper/actions/reset-action";
import * as style from "./reset-component.css";
import {
    DIFFICULTIES,
    Difficulty,
    DifficultyName,
    EASY,
    HARD,
    NORMAL
} from "../../../minesweeper/types/difficulty";

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

    function difficultyOption(d: Difficulty): h.JSX.Element {
        const { name, displayName, width, height } = d;
        return (
            <option value={name}>
                {displayName} ({width}x{height})
            </option>
        );
    }

    return (
        <div className={style.reset}>
            <form onSubmit={reset}>
                <select
                    className={style.select}
                    value={difficulty}
                    onInput={onDifficultyInput}
                >
                    {DIFFICULTIES.map(difficultyOption)}
                </select>
                <button className={style.submit} type="submit">
                    Reset
                </button>
            </form>
        </div>
    );
}
