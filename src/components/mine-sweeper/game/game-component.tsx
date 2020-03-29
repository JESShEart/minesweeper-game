import { FunctionalComponent, h } from "preact";
import { useReducer } from "preact/hooks";
import { boardReducer, resetAction, ResetGame } from "../board-reducer";
import BoardComponent from "../board/board-component";
import ResetComponent from "../reset/reset-component";

const initialGame = resetAction({ size: 10, mineRatio: 8 });

const GameComponent: FunctionalComponent = () => {
    const [game, dispatch] = useReducer(boardReducer, initialGame);

    return (
        <div>
            <span>Game Status: {game.status}</span>
            <ResetComponent dispatch={dispatch}></ResetComponent>
            <BoardComponent game={game} dispatch={dispatch} />
        </div>
    );
};

export default GameComponent;
