/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/no-explicit-any */
/// <reference types="enzyme-adapter-preact-pure" />
import { shallow, ShallowWrapper } from "enzyme";
import { GameStatus } from "../../../minesweeper/types/game-status";
import { Square } from "../../../minesweeper/types/square";
import { h } from "preact";
import { HiddenSquareComponent } from "./hidden-square-component";
import * as revealActionObj from "../../../minesweeper/actions/reveal-action";
import * as toggleFlaggedActionObj from "../../../minesweeper/actions/toggle-flagged-square-action";
import * as style from "./hidden-square-component.css";
import { StatsDispatch } from "../../../stats/stats-reducer";

describe("HiddenSquareComponent", function() {
    let wrapper: ShallowWrapper<h.JSX.Element>;
    let revealAction: jasmine.Spy;
    let toggleFlaggedAction: jasmine.Spy;
    let blur: jasmine.Spy;
    let statsDispatch: StatsDispatch;

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
        blur = spyOn(document.activeElement as HTMLElement, "blur");
        statsDispatch = function(): void {};
        wrapper = shallow(
            <HiddenSquareComponent
                square={square as Square}
                status={status}
                flagging={flagging}
                dispatch={function(): void {}}
                statsDispatch={statsDispatch}
            />
        );
    }

    function simulateEventOnButton(
        eventProp: string,
        preventDefault = function(): void {}
    ): void {
        (wrapper.find("button").prop(eventProp) as any)({
            preventDefault
        } as h.JSX.TargetedTouchEvent<HTMLButtonElement>);
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
        expect(revealAction).toHaveBeenCalledWith(
            { flagged: false },
            statsDispatch
        );
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
        expect(blur).not.toHaveBeenCalled();
    });

    test("should blur when flagging and clicked", function() {
        setup("PLAY", {}, true);
        wrapper.find("button").simulate("click");
        expect(blur).toHaveBeenCalled();
    });

    test("should prevent default when touched", function() {
        setup("PLAY", { flagged: false }, false);
        const setTimeout = spyOn(window, "setTimeout");

        let defaultPrevented = false;
        simulateEventOnButton("onTouchStart", () => (defaultPrevented = true));

        expect(defaultPrevented).toBeTruthy();
        expect(setTimeout).toHaveBeenCalled();
    });

    test("should call reveal action with timeout callback when touched", function() {
        setup("PLAY", { flagged: false }, false);
        spyOn(window, "setTimeout").and.callFake(callback => {
            callback();
            return 1;
        });
        simulateEventOnButton("onTouchStart");

        expect(revealAction).toHaveBeenCalled();
    });

    test("should clear timeout when touch ends", function() {
        setup("PLAY", { flagged: false }, false);
        spyOn(window, "setTimeout").and.callFake(() => 1);
        const clearTimeout = spyOn(window, "clearTimeout");

        simulateEventOnButton("onTouchStart");
        simulateEventOnButton("onTouchEnd");

        expect(clearTimeout).toHaveBeenCalledWith(1);
        expect(revealAction).not.toHaveBeenCalled();
    });

    test("should not clear timeout when no timeout and touch ends", function() {
        setup("PLAY", { flagged: false }, false);
        spyOn(window, "setTimeout").and.callFake(() => 1);
        const clearTimeout = spyOn(window, "clearTimeout");

        simulateEventOnButton("onTouchEnd");

        expect(clearTimeout).not.toHaveBeenCalled();
        expect(revealAction).not.toHaveBeenCalled();
    });

    test("should clear timeout when touch moves", function() {
        setup("PLAY", { flagged: false }, false);
        spyOn(window, "setTimeout").and.callFake(() => 1);
        const clearTimeout = spyOn(window, "clearTimeout");

        simulateEventOnButton("onTouchStart");
        simulateEventOnButton("onTouchMove");

        expect(clearTimeout).toHaveBeenCalledWith(1);
        expect(revealAction).not.toHaveBeenCalled();
    });

    test("should not clear timeout when no timeout and touch moves", function() {
        setup("PLAY", { flagged: false }, false);
        spyOn(window, "setTimeout").and.callFake(() => 1);
        const clearTimeout = spyOn(window, "clearTimeout");

        simulateEventOnButton("onTouchMove");

        expect(clearTimeout).not.toHaveBeenCalled();
        expect(revealAction).not.toHaveBeenCalled();
    });
});
