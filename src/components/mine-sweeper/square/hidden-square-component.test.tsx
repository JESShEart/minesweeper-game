/* eslint-disable @typescript-eslint/no-empty-function */
import { shallow, ShallowWrapper } from "enzyme";
import { GameStatus } from "../../../mine-sweeper/types/game-status";
import { Square } from "../../../mine-sweeper/types/square";
import { ReactElement } from "react";
import { h } from "preact";
import { HiddenSquareComponent } from "./hidden-square-component";
import Spy = jasmine.Spy;
import * as revealActionObj from "../../../mine-sweeper/actions/reveal-action";
import * as toggleFlaggedActionObj from "../../../mine-sweeper/actions/toggle-flagged-square-action";
import * as style from "./hidden-square-component.css";

describe("HiddenSquareComponent", function() {
    let wrapper: ShallowWrapper;
    let revealAction: Spy;
    let toggleFlaggedAction: Spy;

    function setup(
        status: GameStatus,
        square: Partial<Square>,
        flagging: boolean
    ): void {
        revealAction = spyOn(revealActionObj, "revealAction");
        toggleFlaggedAction = spyOn(
            toggleFlaggedActionObj,
            "toggleFlaggedSquareAction"
        );
        wrapper = shallow(
            (
                <HiddenSquareComponent
                    square={square as Square}
                    status={status}
                    flagging={flagging}
                    dispatch={function(): void {}}
                />
            ) as ReactElement
        );
    }

    test("should be enabled when status is START", function() {
        setup("START", { flagged: false }, false);
        expect(wrapper.find("button").prop("disabled")).toBeFalsy();
    });

    test("should be enabled when status is PLAY", function() {
        setup("PLAY", { flagged: false }, false);
        expect(wrapper.find("button").prop("disabled")).toBeFalsy();
    });

    test("should be disabled when status is WIN", function() {
        setup("WIN", { flagged: false }, false);
        expect(wrapper.find("button").prop("disabled")).toBeTruthy();
    });

    test("should be disabled when status is FAIL", function() {
        setup("FAIL", { flagged: false }, false);
        expect(wrapper.find("button").prop("disabled")).toBeTruthy();
    });

    test("should have flagged class when flagged is true", function() {
        setup("PLAY", { flagged: true }, false);
        expect(wrapper.find(`.${style.flagged}`).exists()).toBeTruthy();
    });

    test("should not have flagged class when flagged is false", function() {
        setup("PLAY", { flagged: false }, false);
        expect(wrapper.find(`.${style.flagged}`).exists()).toBeFalsy();
    });

    test("should call revealAction when clicked, flagged is false and flagging is false", function() {
        setup("PLAY", { flagged: false }, false);
        wrapper.find("button").simulate("click");
        expect(revealAction).toHaveBeenCalledWith({ flagged: false });
        expect(toggleFlaggedAction).not.toHaveBeenCalled();
    });

    test("should call toggleFlaggedAction when clicked, flagged is true and flagging is true", function() {
        setup("PLAY", { flagged: true }, true);
        wrapper.find("button").simulate("click");
        expect(revealAction).not.toHaveBeenCalled();
        expect(toggleFlaggedAction).toHaveBeenCalledWith({ flagged: true });
    });

    test("should call toggleFlaggedAction when clicked, flagged is false and flagging is true", function() {
        setup("PLAY", { flagged: false }, true);
        wrapper.find("button").simulate("click");
        expect(revealAction).not.toHaveBeenCalled();
        expect(toggleFlaggedAction).toHaveBeenCalledWith({ flagged: false });
    });

    test("should not dispatch when clicked, flagged is true and flagging is false", function() {
        setup("PLAY", { flagged: true }, false);
        wrapper.find("button").simulate("click");
        expect(revealAction).not.toHaveBeenCalled();
        expect(toggleFlaggedAction).not.toHaveBeenCalled();
    });

    test("should not dispatch when not clicked", function() {
        setup("PLAY", { flagged: false }, false);
        expect(revealAction).not.toHaveBeenCalled();
        expect(toggleFlaggedAction).not.toHaveBeenCalled();
    });
});
