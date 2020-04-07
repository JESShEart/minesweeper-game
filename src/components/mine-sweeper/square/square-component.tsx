import { h } from "preact";
import { Square } from "../../../mine-sweeper/types/square";
import { GameDispatch } from "../../../mine-sweeper/game-reducer";
import { GameStatus } from "../../../mine-sweeper/types/game-status";
import { HiddenSquareComponent } from "./hidden-square-component";
import { RevealedSquareComponent } from "./revealed-square-component";

interface Props {
    status: GameStatus;
    square: Square;
    dispatch: GameDispatch;
}

export default function SquareComponent(props: Props): h.JSX.Element {
    const { status, square, dispatch } = props;
    const { revealed } = square;

    function revealedSquare(): h.JSX.Element {
        return <RevealedSquareComponent status={status} square={square} />;
    }

    function hiddenSquare(): h.JSX.Element {
        return (
            <HiddenSquareComponent
                status={status}
                square={square}
                dispatch={dispatch}
            />
        );
    }

    return <div>{revealed ? revealedSquare() : hiddenSquare()}</div>;
}
