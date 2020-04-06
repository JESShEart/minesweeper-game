import { h } from "preact";
import { Route, Router } from "preact-router";

import StatsComponent from "../routes/stats/stats-component";
import { HeaderComponent } from "./header/header-component";
import PlayComponent from "../routes/play/play-component";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

function AppComponent(): h.JSX.Element {
    return (
        <div id="app">
            <HeaderComponent />
            <Router>
                <Route path="/" component={PlayComponent} />
                <Route path="/stats/" component={StatsComponent} />
            </Router>
        </div>
    );
}

export default AppComponent;
