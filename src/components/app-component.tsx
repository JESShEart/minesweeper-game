import { h } from "preact";
import { Route, Router } from "preact-router";

import { HeaderComponent } from "./header/header-component";
import { useReducer } from "preact/hooks";
import { gameReducer } from "../mine-sweeper/game-reducer";
import { resetGame } from "../mine-sweeper/functions/reset-game";
import { EASY } from "../mine-sweeper/types/difficulty";
import { statsReducer } from "../stats/stats-reducer";
import { loadStats } from "../stats/functions/load-stats";
import { MineSweeperComponent } from "./mine-sweeper/mine-sweeper-component";
import { StatsComponent } from "./stats/stats-component";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

function AppComponent(): h.JSX.Element {
    const [game, gameDispatch] = useReducer(gameReducer, resetGame(EASY));
    const [stats, statsDispatch] = useReducer(statsReducer, loadStats());

    return (
        <div id="app">
            <HeaderComponent />
            <main>
                <Router>
                    <Route
                        path="/"
                        component={MineSweeperComponent}
                        game={game}
                        dispatch={gameDispatch}
                        statsDispatch={statsDispatch}
                    />
                    <Route
                        path="/stats/"
                        component={StatsComponent}
                        stats={stats}
                        dispatch={statsDispatch}
                    />
                </Router>
            </main>
        </div>
    );
}

export default AppComponent;
