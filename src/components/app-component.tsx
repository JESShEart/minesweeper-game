import { h } from "preact";
import { Route, Router } from "preact-router";
import { HeaderComponent } from "./header/header-component";
import { MinesweeperComponent } from "./minesweeper/minesweeper-component";
import { minesweeperRouteProps } from "./minesweeper/minesweeper-route-props";
import { statsRouteProps } from "./stats/stats-route-props";
import { helpRouteProps } from "./help/help-route-props";
import { HelpComponent } from "./help/help-component";
import * as style from "./app-component.css";
import { StatsContainer } from "../containers/stats-container";
import { useGameReducer } from "../hooks/use-game";
import { useStatsReducer } from "../hooks/use-stats";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

export type TitleUpdater = (routeTitle: string) => void;

export function AppComponent(): h.JSX.Element {
    useGameReducer();
    useStatsReducer();

    function clearSelection(): void {
        // touch devices have a selection behavior for long presses,
        // since long presses are required to clear squares on touch devices,
        // this will automatically get rid of the selection.
        if (window.getSelection) {
            const selection = window.getSelection();
            if (!selection) {
                return;
            } else if (selection.empty) {
                selection.empty();
            } else if (selection.removeAllRanges) {
                selection.removeAllRanges();
            }
        }
    }

    return (
        <div id="app" onTouchStart={clearSelection} onTouchEnd={clearSelection}>
            <HeaderComponent />
            <main>
                <Router>
                    <Route
                        path={minesweeperRouteProps.path}
                        component={MinesweeperComponent}
                    />
                    <Route
                        path={statsRouteProps.path}
                        component={StatsContainer}
                    />
                    <Route
                        path={helpRouteProps.path}
                        component={HelpComponent}
                    />
                </Router>
                <small className={style.version}>v1.3.0</small>
            </main>
        </div>
    );
}
