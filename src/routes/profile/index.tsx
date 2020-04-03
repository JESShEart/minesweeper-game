import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

interface Props {
}

const Profile: FunctionalComponent<Props> = (props: Props) => {
    return (
        <div class={style.profile}>
            <div>
                This would show the game stats. And maybe a button to reset
                them.
            </div>
        </div>
    );
};

export default Profile;
