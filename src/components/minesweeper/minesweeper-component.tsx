import { h } from "preact";
import { GameDispatch } from "../../minesweeper/game-reducer";
import { BoardComponent } from "./board/board-component";
import { ResetComponent } from "./reset/reset-component";
import { Game } from "../../minesweeper/types/game";
import { StatusComponent } from "./status/status-component";
import * as style from "./minesweeper-component.css";
import { TimerComponent } from "./timer/timer-component";
import { FlaggingToggleComponent } from "./flagging-toggle/flagging-toggle-component";
import { StatsDispatch } from "../../stats/stats-reducer";
import { useEffect } from "preact/hooks";
import { TitleUpdater } from "../app-component";
import { minesweeperRouteProps } from "./minesweeper-route-props";

interface Props {
    game: Game;
    dispatch: GameDispatch;
    statsDispatch: StatsDispatch;
    updateTitle: TitleUpdater;
}

export function MinesweeperComponent(props: Props): h.JSX.Element {
    const { game, dispatch, statsDispatch, updateTitle } = props;
    const { status, flagging, startedAt, finishedAt } = game;

    useEffect(function() {
        updateTitle(minesweeperRouteProps.title);
    }, []);

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
