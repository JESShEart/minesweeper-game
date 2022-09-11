import { h } from "preact";
import { StatusComponent } from "../components/minesweeper/status/status-component";
import { useGame } from "../hooks/use-game";

export function StatusContainer(): h.JSX.Element {
    const { game } = useGame();
    const { status, difficultyName } = game;
    return <StatusComponent status={status} difficultyName={difficultyName} />;
}
