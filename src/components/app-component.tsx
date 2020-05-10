import { h } from "preact";
import { Route, Router } from "preact-router";
import { HeaderComponent } from "./header/header-component";
import { useReducer } from "preact/hooks";
import { gameReducer } from "../minesweeper/game-reducer";
import { resetGame } from "../minesweeper/functions/reset-game";
import { EASY } from "../minesweeper/types/difficulty";
import { statsReducer } from "../stats/stats-reducer";
import { loadStats } from "../stats/functions/load-stats";
import { MinesweeperComponent } from "./minesweeper/minesweeper-component";
import { StatsComponent } from "./stats/stats-component";
import { minesweeperRouteProps } from "./minesweeper/minesweeper-route-props";
import { statsRouteProps } from "./stats/stats-route-props";
import { helpRouteProps } from "./help/help-route-props";
import { HelpComponent } from "./help/help-component";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

export type TitleUpdater = (routeTitle: string) => void;

export function AppComponent(): h.JSX.Element {
    const [game, gameDispatch] = useReducer(gameReducer, resetGame(EASY));
    const [stats, statsDispatch] = useReducer(statsReducer, loadStats());

    function updateTitle(routeTitle: string): void {
        document.title = `Minesweeper Game - ${routeTitle}`;
    }

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
                        game={game}
                        dispatch={gameDispatch}
                        statsDispatch={statsDispatch}
                        updateTitle={updateTitle}
                    />
                    <Route
                        path={statsRouteProps.path}
                        component={StatsComponent}
                        stats={stats}
                        dispatch={statsDispatch}
                        updateTitle={updateTitle}
                    />
                    <Route
                        path={helpRouteProps.path}
                        component={HelpComponent}
                        updateTitle={updateTitle}
                    />
                </Router>
            </main>
        </div>
    );
}
