import { h } from "preact";
import { useReducer } from "preact/hooks";
import { boardReducer, resetAction } from "../board-reducer";
import BoardComponent from "../board/board-component";
import ResetComponent from "../reset/reset-component";
import { Game } from "../game";

const initialGame: Game = resetAction({ size: 10, mineRatio: 8 });

function GameComponent(): h.JSX.Element {
    const [game, dispatch] = useReducer(boardReducer, initialGame);

    return (
        <div>
            <span>Game Status: {game.status}</span>
            <ResetComponent dispatch={dispatch} />
            <BoardComponent game={game} reveal={dispatch} />
        </div>
    );
}

export default GameComponent;
