import { h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./header-component.css";

export function HeaderComponent(): h.JSX.Element {
    return (
        <header className={style.header}>
            <h1>Mine Sweeper Game</h1>
            <nav>
                <Link activeClassName={style.active} href="/">
                    Play
                </Link>
                <Link activeClassName={style.active} href="/stats">
                    Stats
                </Link>
            </nav>
        </header>
    );
}
