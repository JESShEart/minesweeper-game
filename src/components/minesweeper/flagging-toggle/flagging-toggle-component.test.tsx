/* eslint-disable @typescript-eslint/no-empty-function */
import { shallow, ShallowWrapper } from "enzyme";
import { ReactElement } from "react";
import { h } from "preact";
import { FlaggingToggleComponent } from "./flagging-toggle-component";
import * as style from "./flagging-toggle-component.css";
import * as toggleFlaggingActionObj from "../../../minesweeper/actions/toggle-flagging-action";
import { GameStatus } from "../../../minesweeper/types/game-status";
import Spy = jasmine.Spy;

describe("FlaggingToggleComponent", function() {
    let wrapper: ShallowWrapper;
    let toggleFlaggingAction: Spy;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let _documentEventSimulator: any;

    beforeEach(function() {
        _documentEventSimulator = {};
        document.addEventListener = jest.fn((event, cb) => {
            _documentEventSimulator[event] = cb;
        });
    });

    function setup(status: GameStatus, flagging: boolean): void {
        toggleFlaggingAction = spyOn(
            toggleFlaggingActionObj,
            "toggleFlaggingAction"
        );
        wrapper = shallow(
            (
                <FlaggingToggleComponent
                    status={status}
                    flagging={flagging}
                    dispatch={function(): void {}}
                />
            ) as ReactElement
        );
    }

    function simulateFKeyDown(): void {
        // noinspection TypeScriptValidateJSTypes
        _documentEventSimulator.keydown({
            keyCode: 37,
            key: "f"
        });
    }

    test("should be disabled when WIN", function() {
        setup("WIN", false);
        expect(wrapper.find("button").prop("disabled")).toBeTruthy();
    });

    test("should be disabled when FAIL", function() {
        setup("FAIL", false);
        expect(wrapper.find("button").prop("disabled")).toBeTruthy();
    });

    test("should be enabled when START", function() {
        setup("START", false);
        expect(wrapper.find("button").prop("disabled")).toBeFalsy();
    });

    test("should be enabled when PLAY", function() {
        setup("PLAY", false);
        expect(wrapper.find("button").prop("disabled")).toBeFalsy();
    });

    test("should not add buttonActive class when not flagging", function() {
        setup("PLAY", false);
        expect(wrapper.find(`.${style.buttonActive}`).exists()).toBeFalsy();
    });

    test("should add buttonActive class when flagging", function() {
        setup("PLAY", true);
        expect(wrapper.find(`.${style.buttonActive}`).exists()).toBeTruthy();
    });

    test("should dispatch toggleFlaggingAction when clicked", function() {
        setup("PLAY", false);
        wrapper.find("button").simulate("click");
        expect(toggleFlaggingAction).toHaveBeenCalled();
    });

    test("should not dispatch toggleFlaggingAction when disabled and clicked", function() {
        setup("WIN", false);
        wrapper.find("button").simulate("click");
        expect(toggleFlaggingAction).not.toHaveBeenCalled();
    });

    test("should dispatch toggleFlaggingAction when F keydown", function() {
        setup("PLAY", false);
        simulateFKeyDown();
        expect(toggleFlaggingAction).toHaveBeenCalled();
    });

    test("should not dispatch toggleFlaggingAction when disabled and F keydown", function() {
        setup("WIN", false);
        simulateFKeyDown();
        expect(toggleFlaggingAction).not.toHaveBeenCalled();
    });

    test("should add keydown listener when mounted", function() {
        const addEventListener = spyOn(document, "addEventListener");
        setup("PLAY", false);
        expect(addEventListener.calls.mostRecent().args[0]).toBe("keydown");
    });

    test("should remove keydown listener when unmounted", function() {
        setup("PLAY", false);
        const removeEventListener = spyOn(document, "removeEventListener");
        wrapper.unmount();
        expect(removeEventListener.calls.mostRecent().args[0]).toBe("keydown");
    });
});
