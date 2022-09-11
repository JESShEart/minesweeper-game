import { h } from "preact";
import * as style from "./minesweeper-component.css";
import { minesweeperRouteProps } from "./minesweeper-route-props";
import { useUpdateTitle } from "../../hooks/use-update-title";
import { BoardContainer } from "../../containers/board-container";
import { TimerContainer } from "../../containers/timer-container";
import { StatusContainer } from "../../containers/status-container";
import { FlaggingToggleContainer } from "../../containers/flagging-toggle-container";
import { ResetContainer } from "../../containers/reset-container";

export function MinesweeperComponent(): h.JSX.Element {
    useUpdateTitle(minesweeperRouteProps.title);

    return (
        <div>
            <ResetContainer />
            <div className={style.topRow}>
                <StatusContainer />
                <TimerContainer />
            </div>
            <BoardContainer />
            <div className={style.bottomRow}>
                <FlaggingToggleContainer />
            </div>
        </div>
    );
}
