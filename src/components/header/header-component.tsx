import { h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./header-component.css";
import { minesweeperRouteProps } from "../mine-sweeper/minesweeper-route-props";
import { statsRouteProps } from "../stats/stats-route-props";

export function HeaderComponent(): h.JSX.Element {
    return (
        <header className={style.header}>
            <h1>Minesweeper Game</h1>
            <nav>
                <Link
                    activeClassName={style.active}
                    href={minesweeperRouteProps.path}
                >
                    Play
                </Link>
                <Link
                    activeClassName={style.active}
                    href={statsRouteProps.path}
                >
                    Stats
                </Link>
            </nav>
        </header>
    );
}
