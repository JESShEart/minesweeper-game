import { h } from "preact";
import { Route, Router } from "preact-router";

import StatsComponent from "../routes/stats/stats-component";
import { HeaderComponent } from "./header/header-component";
import PlayComponent from "../routes/play/play-component";
import { useReducer } from "preact/hooks";
import { gameReducer } from "../mine-sweeper/game-reducer";
import { createGame } from "../mine-sweeper/functions/create-game";
import { createBoard } from "../mine-sweeper/functions/create-board";
import { Game } from "../mine-sweeper/types/game";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

function newGame(): Game {
    const board = createBoard(10, 10, 8);
    return createGame(board);
}

function AppComponent(): h.JSX.Element {
    const [game, dispatch] = useReducer(gameReducer, newGame());

    return (
        <div id="app">
            <HeaderComponent />
            <Router>
                <Route
                    path="/"
                    component={PlayComponent}
                    game={game}
                    dispatch={dispatch}
                />
                <Route path="/stats/" component={StatsComponent} />
            </Router>
        </div>
    );
}

export default AppComponent;
