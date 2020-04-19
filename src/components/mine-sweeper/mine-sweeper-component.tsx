import { h } from "preact";
import { GameDispatch } from "../../mine-sweeper/game-reducer";
import { BoardComponent } from "./board/board-component";
import { ResetComponent } from "./reset/reset-component";
import { Game } from "../../mine-sweeper/types/game";
import { StatusComponent } from "./status/status-component";
import * as style from "./mine-sweeper-component.css";
import { TimerComponent } from "./timer/timer-component";
import { FlaggingToggleComponent } from "./flagging-toggle/flagging-toggle-component";
import { StatsDispatch } from "../../stats/stats-reducer";

interface Props {
    game: Game;
    dispatch: GameDispatch;
    statsDispatch: StatsDispatch;
}

export function MineSweeperComponent(props: Props): h.JSX.Element {
    const { game, dispatch, statsDispatch } = props;
    const { status, flagging, startedAt, finishedAt } = game;

    return (
        <div>
            <div className={style.topRow}>
                <StatusComponent status={status} />
                <ResetComponent dispatch={dispatch} />
                <TimerComponent startedAt={startedAt} finishedAt={finishedAt} />
            </div>
            <BoardComponent
                game={game}
                dispatch={dispatch}
                statsDispatch={statsDispatch}
            />
            <div className={style.bottomRow}>
                <FlaggingToggleComponent
                    status={status}
                    flagging={flagging}
                    dispatch={dispatch}
                />
            </div>
        </div>
    );
}
