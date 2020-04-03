import { h } from "preact";
import * as style from "./style.css";

function StatsComponent(): h.JSX.Element {
    return (
        <div class={style.profile}>
            <div>
                This would show the game stats. And maybe a button to reset
                them.
            </div>
        </div>
    );
}

export default StatsComponent;
