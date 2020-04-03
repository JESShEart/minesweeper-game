import { h } from "preact";
import * as style from "./style.css";
import GameComponent from "../../components/mine-sweeper/game/game-component";

function PlayComponent(): h.JSX.Element {
    return (
        <div class={style.home}>
            <GameComponent />
        </div>
    );
}

export default PlayComponent;
