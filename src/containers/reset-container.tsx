import { h } from "preact";
import { ResetComponent } from "../components/minesweeper/reset/reset-component";
import { useGame } from "../hooks/use-game";

export function ResetContainer(): h.JSX.Element {
    const { gameDispatch } = useGame();
    return <ResetComponent dispatch={gameDispatch} />;
}
