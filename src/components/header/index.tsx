import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";

const Header: FunctionalComponent = () => {
    return (
        <header class={style.header}>
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
};

export default Header;
