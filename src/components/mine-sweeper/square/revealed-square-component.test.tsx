import { shallow, ShallowWrapper } from "enzyme";
import { ReactElement } from "react";
import { h } from "preact";
import { RevealedSquareComponent } from "./revealed-square-component";
import { Square } from "../../../mine-sweeper/types/square";
import { GameStatus } from "../../../mine-sweeper/types/game-status";
import * as style from "./revealed-square-component.css";

describe("RevealedSquareComponent", () => {
    let wrapper: ShallowWrapper;

    function setup(status: GameStatus, square: Partial<Square>): void {
        wrapper = shallow(
            (
                <RevealedSquareComponent
                    square={square as Square}
                    status={status}
                />
            ) as ReactElement
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
        expect(wrapper.find("img").exists()).toBeTruthy();
    });

    test("should not render mine img when no mine", () => {
        setup("PLAY", { mine: false });
        expect(wrapper.find("img").exists()).toBeFalsy();
    });

    test("should apply win class to mine img when WIN", () => {
        setup("WIN", { mine: true });
        expect(wrapper.find("img").hasClass(style.win)).toBeTruthy();
    });

    test("should not apply win class to mine img when FAIL", () => {
        setup("FAIL", { mine: true });
        expect(wrapper.find("img").hasClass(style.win)).toBeFalsy();
    });
});
