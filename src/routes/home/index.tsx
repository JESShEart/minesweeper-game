import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import BoardComponent from "../../components/mine-sweeper/board/board-component";
import { createBoard } from "../../components/mine-sweeper/board-functions";

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h1 />
            <BoardComponent squares={createBoard(10, 8)} />
        </div>
    );
};

export default Home;
