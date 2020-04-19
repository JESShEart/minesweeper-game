import { h } from "preact";
import { Route, Router } from "preact-router";

import StatsRouteComponent from "../routes/stats/stats-route-component";
import { HeaderComponent } from "./header/header-component";
import PlayComponent from "../routes/play/play-component";
import { useReducer } from "preact/hooks";
import { gameReducer } from "../mine-sweeper/game-reducer";
import { resetGame } from "../mine-sweeper/functions/reset-game";
import { EASY } from "../mine-sweeper/types/difficulty";
import { statsReducer } from "../stats/stats-reducer";
import { loadStats } from "../stats/functions/load-stats";

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
            <Router>
                <Route
                    path="/"
                    component={PlayComponent}
                    game={game}
                    dispatch={gameDispatch}
                    statsDispatch={statsDispatch}
                />
                <Route
                    path="/stats/"
                    component={StatsRouteComponent}
                    stats={stats}
                    dispatch={statsDispatch}
                />
            </Router>
        </div>
    );
}

export default AppComponent;
