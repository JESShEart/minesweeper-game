import { h } from "preact";
import { FlaggingToggleComponent } from "../components/minesweeper/flagging-toggle/flagging-toggle-component";
import { useGame } from "../hooks/use-game";

export function FlaggingToggleContainer(): h.JSX.Element {
    const { game, gameDispatch } = useGame();
    const { status, flagging } = game;
    return (
        <FlaggingToggleComponent
            status={status}
            flagging={flagging}
            dispatch={gameDispatch}
        />
    );
}
