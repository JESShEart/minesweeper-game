import { FunctionalComponent, h } from "preact";
import { GameDispatch } from "../game-action";
import * as style from "./style.css";
import { useState } from "preact/hooks";
import resetAction from "../reset-action";

interface Props {
    dispatch: GameDispatch;
}

const ResetComponent: FunctionalComponent<Props> = (props: Props) => {
    const { dispatch } = props;
    const [size, updateSize] = useState(10);
    const [mineRatio, updateMineRatio] = useState(8);

    const reset = (e: h.JSX.TargetedEvent): void => {
        e.preventDefault();
        dispatch(resetAction(size, size, mineRatio));
    };

    const numberValue = (e: any): number => +e.target.value || 1;

    return (
        <form onSubmit={e => reset(e)}>
            <input
                class={style.numberInput}
                title="Board Size"
                type="number"
                value={size}
                onInput={e => updateSize(numberValue(e))}
            />
            <input
                class={style.numberInput}
                title="Mine Rate"
                type="number"
                value={mineRatio}
                onInput={e => updateMineRatio(numberValue(e))}
            />
            <button type="submit">Reset</button>
        </form>
    );
};

export default ResetComponent;
