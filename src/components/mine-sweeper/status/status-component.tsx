import { GameStatus } from "../../../mine-sweeper/types/game-status";
import { h } from "preact";
import * as style from "./status-component.css";

interface Props {
    status: GameStatus;
}

export function StatusComponent(props: Props): h.JSX.Element {
    const { status } = props;

    function description(): string {
        switch (status) {
            case "FAIL":
                return "You lost!  Please, try again!";
            case "WIN":
                return "You won!";
            case "PLAY":
            default:
                return "Game in progress...";
        }
    }

    function emoji(): string {
        switch (status) {
            case "FAIL":
                return "😵";
            case "WIN":
                return "😎";
            case "PLAY":
            default:
                return "🤔";
        }
    }

    return (
        <div className={style.status}>
            <div className={style.emoji} title={description()}>
                {emoji()}
            </div>
        </div>
    );
}