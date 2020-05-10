import { GameStatus } from "../../../minesweeper/types/game-status";
import { h } from "preact";
import * as style from "./status-component.css";
import {
    DIFFICULTIES,
    DifficultyName
} from "../../../minesweeper/types/difficulty";

interface Props {
    status: GameStatus;
    difficultyName: DifficultyName;
}

export function StatusComponent(props: Props): h.JSX.Element {
    const { status, difficultyName } = props;
    const difficulty = DIFFICULTIES.find(it => it.name === difficultyName);
    const difficultyDisplayName = difficulty ? difficulty.displayName : "";

    function description(): string {
        switch (status) {
            case "START":
                return "";
            case "PLAY":
                return "Game in progress...";
            case "FAIL":
                return "You lost!  Please, try again!";
            case "WIN":
                return "You won!";
        }
    }

    function emoji(): string {
        switch (status) {
            case "START":
                return "🙂";
            case "PLAY":
                return "🤔";
            case "FAIL":
                return "😵";
            case "WIN":
                return "😎";
        }
    }

    return (
        <div className={style.status}>
            <div className={style.emoji} title={description()}>
                {emoji()}
            </div>
            <div className={style.difficulty}>{difficultyDisplayName}</div>
        </div>
    );
}
