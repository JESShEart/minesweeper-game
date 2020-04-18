import { h } from "preact";
import * as style from "./stat-line-component.css";

interface Props {
    label: string;
    value: string | number;
}

export function StatLineComponent(props: Props): h.JSX.Element {
    const { label, value } = props;

    return (
        <div className={style.line}>
            <div className={style.label}>
                <strong>{label}</strong>
            </div>
            <div className={style.value}>{value}</div>
        </div>
    );
}
