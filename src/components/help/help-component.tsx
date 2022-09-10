import { h } from "preact";
import { helpRouteProps } from "./help-route-props";
import {
    EASY,
    EASY_PLUS,
    EASY_PLUS_PLUS
} from "../../minesweeper/types/difficulty";
import * as style from "./help-component.css";
import { useUpdateTitle } from "../../hooks/update-title";

export function HelpComponent(): h.JSX.Element {
    useUpdateTitle(helpRouteProps.title);

    return (
        <div>
            <h2>How to Play</h2>
            <h3>🤔 Objective</h3>
            Reveal all squares that do not contain a 💣.
            <ul>
                <li>
                    😎 Your win when all squares are revealed that do not
                    contain a 💣.
                </li>
                <li>😵 You lose when you reveal a 💣.</li>
            </ul>
            <h3>⛏️ Normal Mode</h3>
            When a gray square is revealed, it will show one of the following:
            <ul>
                <li>
                    Blank - adjacent squares will also be revealed until squares
                    which contain numbers are found.
                </li>
                <li>
                    Number 1 through 8 - the count of how many 💣 squares are
                    touching this square.
                </li>
                <li>💣 - the game is over.</li>
            </ul>
            <h3>🚩 Flagging Mode</h3>
            Activate flagging mode to place or remove a 🚩 on hidden squares.
            <ul>
                <li>
                    Use the 🚩 button below the game board to swap between
                    flagging mode and normal mode.
                </li>
                <li>
                    While flagging mode is active, squares cannot be revealed.
                </li>
                <li>Flagged Squares cannot be revealed in normal mode.</li>
            </ul>
            <h3>🤯 Difficulty</h3>
            There is a range of difficulty options. There is different board
            sizes, as well as rates at which a 💣 is placed. Difficulties marked
            with a<strong>+</strong> or <strong>++</strong> will have more
            hidden 💣&apos;s.
            <ul>
                <li className={style.standardDescription}>
                    <strong>Standard</strong> has a 1:{EASY.mineRatio} chance
                    for a 💣 to be placed.
                </li>
                <li className={style.plusDescription}>
                    <strong>+</strong> has a 1:{EASY_PLUS.mineRatio} chance for
                    a 💣 to be placed.
                </li>
                <li className={style.plusPlusDescription}>
                    <strong>++</strong> has a 1:{EASY_PLUS_PLUS.mineRatio}{" "}
                    chance for a 💣 to be placed.
                </li>
            </ul>
            <h2>Controls</h2>
            <h3>👆Touch Controls</h3>
            <ul>
                <li>
                    <li>
                        <strong>Press and Hold</strong> on a gray square for 1
                        second to reveal it.
                    </li>
                    <li>
                        If you tap on the wrong square, <strong>Swipe</strong>{" "}
                        or <strong>Raise</strong> your finger to prevent
                        revealing it by accident.
                    </li>
                    <li>
                        <strong>Tap</strong> on the 🚩 button to activate or
                        deactivate flagging mode.
                    </li>
                    <li>
                        When flagging mode is active, <strong>Tap</strong> on a
                        gray square to place or remove a 🚩.
                    </li>
                </li>
            </ul>
            <h3>🖱 Mouse Controls</h3>
            <ul>
                <li>
                    <strong>Click</strong> on a gray square to reveal it.
                </li>
                <li>
                    <strong>Click</strong> on the 🚩 button to activate or
                    deactivate flagging mode.
                </li>
                <li>
                    When flagging mode is active, <strong>Click</strong> on a
                    gray square to place or remove a 🚩.
                </li>
            </ul>
            <h3>⌨️ Keyboard Controls</h3>
            <ul>
                <li>
                    Press <strong>&quot;Tab&quot;</strong> key to move the
                    cursor forward through the board.
                </li>
                <li>
                    Press <strong>&quot;Shift + Tab&quot;</strong> keys to move
                    the cursor backward through the board.
                </li>
                <li>
                    Press <strong>&quot;Space&quot;</strong> or
                    <strong>&quot;Enter&quot;</strong> keys on a gray square to
                    reveal it.
                </li>
                <li>
                    Press <strong>&quot;F&quot;</strong> key to activate or
                    deactivate flagging mode.
                </li>
                <li>
                    When flagging mode is active, press
                    <strong>&quot;Space&quot;</strong> or
                    <strong>&quot;Enter&quot;</strong> keys on a gray square to
                    place or remove a 🚩.
                </li>
            </ul>
        </div>
    );
}
