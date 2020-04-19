import { shallow, ShallowWrapper } from "enzyme";
import { ReactElement } from "react";
import { h } from "preact";
import { StatusComponent } from "./status-component";
import { GameStatus } from "../../../minesweeper/types/game-status";
import * as style from "./status-component.css";

describe("StatusComponent", function() {
    let wrapper: ShallowWrapper;

    function setup(status: GameStatus): void {
        wrapper = shallow(
            (<StatusComponent status={status} />) as ReactElement
        );
    }

    test("should display START status", function() {
        setup("START");
        expect(wrapper.find(`.${style.emoji}`).text()).toBe("🙂");
        expect(wrapper.find(`.${style.emoji}`).prop("title")).toBe("");
    });

    test("should display PLAY status", function() {
        setup("PLAY");
        expect(wrapper.find(`.${style.emoji}`).text()).toBe("🤔");
        expect(wrapper.find(`.${style.emoji}`).prop("title")).toBe(
            "Game in progress..."
        );
    });

    test("should display WIN status", function() {
        setup("WIN");
        expect(wrapper.find(`.${style.emoji}`).text()).toBe("😎");
        expect(wrapper.find(`.${style.emoji}`).prop("title")).toBe("You won!");
    });

    test("should display FAIL status", function() {
        setup("FAIL");
        expect(wrapper.find(`.${style.emoji}`).text()).toBe("😵");
        expect(wrapper.find(`.${style.emoji}`).prop("title")).toBe(
            "You lost!  Please, try again!"
        );
    });
});
