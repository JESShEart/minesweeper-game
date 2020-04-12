import { h } from "preact";
import { GameDispatch } from "../../mine-sweeper/game-reducer";
import { BoardComponent } from "./board/board-component";
import { ResetComponent } from "./reset/reset-component";
import { Game } from "../../mine-sweeper/types/game";
import { StatusComponent } from "./status/status-component";
import * as style from "./mine-sweeper-component.css";
import { TimerComponent } from "./timer/timer-component";
import { FlagComponent } from "./flag/flag-component";

interface Props {
    game: Game;
    dispatch: GameDispatch;
}

export function MineSweeperComponent(props: Props): h.JSX.Element {
    const { game, dispatch } = props;

    return (
        <div>
            <div className={style.topRow}>
                <StatusComponent status={game.status} />
                <ResetComponent dispatch={dispatch} />
                <TimerComponent
                    startedAt={game.startedAt}
                    finishedAt={game.finishedAt}
                />
            </div>
            <BoardComponent game={game} dispatch={dispatch} />
            <div className={style.bottomRow}>
                <FlagComponent
                    status={game.status}
                    flagging={false}
                    dispatch={dispatch}
                />
            </div>
        </div>
    );
}
