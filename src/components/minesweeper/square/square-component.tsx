import { h } from "preact";
import { Square } from "../../../mine-sweeper/types/square";
import { GameDispatch } from "../../../mine-sweeper/game-reducer";
import { GameStatus } from "../../../mine-sweeper/types/game-status";
import { HiddenSquareComponent } from "./hidden-square-component";
import { RevealedSquareComponent } from "./revealed-square-component";
import * as style from "./square-component.css";
import { StatsDispatch } from "../../../stats/stats-reducer";

interface Props {
    square: Square;
    status: GameStatus;
    flagging: boolean;
    dispatch: GameDispatch;
    statsDispatch: StatsDispatch;
}

export function SquareComponent(props: Props): h.JSX.Element {
    const { square, status, flagging, dispatch, statsDispatch } = props;
    const { revealed } = square;

    function revealedSquare(): h.JSX.Element {
        return <RevealedSquareComponent square={square} status={status} />;
    }

    function hiddenSquare(): h.JSX.Element {
        return (
            <HiddenSquareComponent
                square={square}
                status={status}
                flagging={flagging}
                dispatch={dispatch}
                statsDispatch={statsDispatch}
            />
        );
    }

    return (
        <div className={style.container}>
            {revealed ? revealedSquare() : hiddenSquare()}
        </div>
    );
}
