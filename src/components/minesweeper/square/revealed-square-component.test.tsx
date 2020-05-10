/// <reference types="enzyme-adapter-preact-pure" />
import { shallow, ShallowWrapper } from "enzyme";
import { h } from "preact";
import { RevealedSquareComponent } from "./revealed-square-component";
import { Square } from "../../../minesweeper/types/square";
import { GameStatus } from "../../../minesweeper/types/game-status";
import * as style from "./revealed-square-component.css";

describe("RevealedSquareComponent", () => {
    let wrapper: ShallowWrapper<h.JSX.Element>;

    function setup(status: GameStatus, square: Partial<Square>): void {
        wrapper = shallow(
            <RevealedSquareComponent
                square={square as Square}
                status={status}
            />
        );
    }

    test("should render blank div when 0 adjacent mines", () => {
        setup("PLAY", { mine: false, adjacentMines: 0 });
        expect(wrapper.find("div").text()).toBeFalsy();
    });

    test("should render adjacent mines when > 0 adjacent mines", () => {
        setup("PLAY", { mine: false, adjacentMines: 9000 });
        expect(wrapper.find("div").text()).toBe("9000");
    });

    test("should render mine img when mine", () => {
        setup("PLAY", { mine: true });
        expect(wrapper.find(`.${style.mine}`).exists()).toBeTruthy();
    });

    test("should not render mine img when no mine", () => {
        setup("PLAY", { mine: false });
        expect(wrapper.find(`.${style.mine}`).exists()).toBeFalsy();
    });

    test("should apply win class to mine img when WIN", () => {
        setup("WIN", { mine: true });
        expect(wrapper.find(`.${style.mine}`).hasClass(style.win)).toBeTruthy();
    });

    test("should not apply win class to mine img when FAIL", () => {
        setup("FAIL", { mine: true });
        expect(wrapper.find(`.${style.mine}`).hasClass(style.win)).toBeFalsy();
    });
});
