import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import GameComponent from "../../components/mine-sweeper/game/game-component";

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <GameComponent />
        </div>
    );
};

export default Home;
