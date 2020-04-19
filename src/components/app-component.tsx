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

    return (
        <div id="app">
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
                </Router>
            </main>
        </div>
    );
}
