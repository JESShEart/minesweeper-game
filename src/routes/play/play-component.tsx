import { h } from "preact";
import * as style from "./style.css";
import { MineSweeperComponent } from "../../components/mine-sweeper/mine-sweeper-component";
import { Game } from "../../mine-sweeper/types/game";
import { GameDispatch } from "../../mine-sweeper/game-reducer";
import { StatsDispatch } from "../../stats/stats-reducer";

interface Props {
    game: Game;
    dispatch: GameDispatch;
    statsDispatch: StatsDispatch;
}

function PlayComponent(props: Props): h.JSX.Element {
    const { game, dispatch, statsDispatch } = props;
    return (
        <div className={style.home}>
            <MineSweeperComponent
                game={game}
                dispatch={dispatch}
                statsDispatch={statsDispatch}
            />
        </div>
    );
}

export default PlayComponent;
