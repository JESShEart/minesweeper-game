import { FunctionalComponent, h } from "preact";
import { AiMemory } from "./ai-memory";
import {
    AiAction,
    AiContinueAction,
    AiPauseAction,
    AiPlayAction,
    AiResetRecentAction
} from "./ai-memory-reducer";
import { Game } from "../mine-sweeper/game";
import { BoardAction } from "../mine-sweeper/board-reducer";
import { useEffect } from "preact/hooks";

interface Props {
    ai: AiMemory;
    game: Game;
    aiDispatch: (aiAction: AiAction) => void;
    gameDispatch: (gameAction: BoardAction) => void;
}

const AiComponent: FunctionalComponent<Props> = (props: Props) => {
    const { ai, game, aiDispatch, gameDispatch } = props;

    useEffect(() => {
        const timer = window.setTimeout(() => {
            if (ai.continue) {
                aiDispatch(new AiPlayAction(game, gameDispatch));
            }
        }, ai.speed);

        return () => {
            clearInterval(timer);
        };
    }, [ai, game]);

    const play = (): void => aiDispatch(new AiContinueAction());
    const playButton = <button onClick={play}>►</button>;

    const pause = (): void => aiDispatch(new AiPauseAction());
    const pauseButton = <button onClick={pause}>■</button>;

    const winRate = () => {
        if (ai.totalGames === 0) {
            return 0;
        } else {
            return Math.floor((ai.gamesWon * 100) / ai.totalGames);
        }
    };

    const recentWinRate = () => {
        if (ai.recentTotalGames === 0) {
            return 0;
        } else {
            return Math.floor((ai.recentGamesWon * 100) / ai.recentTotalGames);
        }
    };

    const print = () => {
        console.log(ai.outcomes);
    };

    const resetRecent = () => aiDispatch(new AiResetRecentAction());
    const step = () => aiDispatch(new AiPlayAction(game, gameDispatch));

    return (
        <div>
            <div>
                Last Move: [{ai.lastMove.position.x}, {ai.lastMove.position.y}]
                &nbsp;
                {ai.lastMove.confidence}% {ai.lastMove.trials}
            </div>
            <div>
                Win Rate: {winRate()}% ({ai.gamesWon}/{ai.totalGames})
            </div>
            <div>
                Recent Win Rate: {recentWinRate()}% ({ai.recentGamesWon}/
                {ai.recentTotalGames})
            </div>
            <div>
                {ai.continue ? pauseButton : playButton}
                <button onClick={step} disabled={ai.continue}>
                    Step
                </button>
                <button onClick={print}>Print</button>
                <button onClick={resetRecent}>Reset Recent Games</button>
            </div>
        </div>
    );
};

export default AiComponent;
