import { h } from "preact";
import * as style from "./style.css";
import { MineSweeperComponent } from "../../components/mine-sweeper/mine-sweeper-component";

function PlayComponent(): h.JSX.Element {
    return (
        <div className={style.home}>
            <MineSweeperComponent />
        </div>
    );
}

export default PlayComponent;
