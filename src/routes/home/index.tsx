import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import BoardComponent from "../../components/mine-sweeper/board/board-component";
import { createBoard, getStatus } from "../../components/mine-sweeper/board-functions";
import { Game } from "../../components/mine-sweeper/game";
import GameComponent from "../../components/mine-sweeper/game/game-component";

const board = createBoard(10, 8);
const status = getStatus(board);
const game: Game = { board, status };

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h1 />
            <GameComponent />
        </div>
    );
};

export default Home;
