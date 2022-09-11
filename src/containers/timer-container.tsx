import { h } from "preact";
import { TimerComponent } from "../components/minesweeper/timer/timer-component";
import { useGame } from "../hooks/use-game";

export function TimerContainer(): h.JSX.Element {
    const { game } = useGame();
    const { startedAt, finishedAt } = game;
    return <TimerComponent startedAt={startedAt} finishedAt={finishedAt} />;
}
