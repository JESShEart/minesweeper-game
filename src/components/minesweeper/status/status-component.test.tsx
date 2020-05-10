/// <reference types="enzyme-adapter-preact-pure" />
import { shallow, ShallowWrapper } from "enzyme";
import { h } from "preact";
import { StatusComponent } from "./status-component";
import { GameStatus } from "../../../minesweeper/types/game-status";
import * as style from "./status-component.css";
import {
    DIFFICULTIES,
    DifficultyName
} from "../../../minesweeper/types/difficulty";

describe("StatusComponent", function() {
    let wrapper: ShallowWrapper<h.JSX.Element>;

    function setup(
        status: GameStatus,
        difficultyName: DifficultyName = "EASY"
    ): void {
        wrapper = shallow(
            <StatusComponent status={status} difficultyName={difficultyName} />
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

    DIFFICULTIES.forEach(function(difficulty) {
        test(`should display difficulty name ${difficulty.name}`, function() {
            setup("PLAY", difficulty.name);
            expect(wrapper.find(`.${style.difficulty}`).text()).toBe(
                difficulty.displayName
            );
        });
    });
});
