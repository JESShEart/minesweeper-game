import { h } from "preact";
import { BoardComponent } from "../components/minesweeper/board/board-component";
import { useStats } from "../hooks/use-stats";
import { useGame } from "../hooks/use-game";

export function BoardContainer(): h.JSX.Element {
    const { game, gameDispatch } = useGame();
    const { statsDispatch } = useStats();
    return (
        <BoardComponent
            game={game}
            dispatch={gameDispatch}
            statsDispatch={statsDispatch}
        />
    );
}
