import { FunctionalComponent, h } from "preact";
import { useReducer } from "preact/hooks";
import { boardReducer, resetAction } from "../board-reducer";
import BoardComponent from "../board/board-component";
import ResetComponent from "../reset/reset-component";
import { AiMemory } from "../../ai/ai-memory";
import { Game } from "../game";
import { aiReducer } from "../../ai/ai-memory-reducer";
import AiComponent from "../../ai/ai-component";

const initialGame: Game = resetAction({ size: 10, mineRatio: 8 });
const initialAiMemory: AiMemory = {
    outcomes: {},
    continue: false,
    speed: 0,
    lastMove: {
        trials: 0,
        confidence: 0,
        position: { x: -1, y: -1 }
    },
    gamesWon: 0,
    totalGames: 0,
    recentGamesWon: 0,
    recentTotalGames: 0
};

const GameComponent: FunctionalComponent = () => {
    const [game, dispatch] = useReducer(boardReducer, initialGame);
    const [ai, aiDispatch] = useReducer(aiReducer, initialAiMemory);

    return (
        <div>
            <span>Game Status: {game.status}</span>
            <AiComponent
                ai={ai}
                aiDispatch={aiDispatch}
                game={game}
                gameDispatch={dispatch}
            />
            <ResetComponent dispatch={dispatch} />
            <BoardComponent game={game} dispatch={dispatch} />
        </div>
    );
};

export default GameComponent;
