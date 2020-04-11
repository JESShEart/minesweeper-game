/* eslint-disable @typescript-eslint/no-empty-function */
import { shallow, ShallowWrapper } from "enzyme";
import { ReactElement, FormEvent } from "react";
import { h } from "preact";
import { ResetComponent } from "./reset-component";
import * as resetActionObj from "../../../mine-sweeper/actions/reset-action";
import Spy = jasmine.Spy;
import { GameReducer } from "../../../mine-sweeper/game-reducer";

describe("ResetComponent", function() {
    let wrapper: ShallowWrapper;
    let resetAction: Spy;
    let dispatch: Spy;

    beforeEach(function() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dispatcher = { dispatch: (action: GameReducer): void => {} };
        dispatch = spyOn(dispatcher, "dispatch");

        resetAction = spyOn(resetActionObj, "resetAction").and.returnValue(
            "RESET_ACTION"
        );

        wrapper = shallow(
            (<ResetComponent dispatch={dispatcher.dispatch} />) as ReactElement
        );
    });

    function setFormValue(value: string): void {
        const onInput =
            wrapper.find("select").props().onInput ??
            fail("select onInput should never be undefined");
        onInput(({ target: { value } } as unknown) as FormEvent);
    }

    test("should set select initial value to EASY", function() {
        expect(wrapper.find("select").props().value).toBe("EASY");
    });

    test("should update select with changed value", function() {
        setFormValue("HARD");
        expect(wrapper.find("select").props().value).toBe("HARD");
    });

    test("should pass reset action to dispatch function", function() {
        wrapper.find("form").simulate("submit");
        expect(dispatch).toHaveBeenCalledWith("RESET_ACTION");
    });

    test("should call reset action with EASY values", function() {
        setFormValue("EASY");
        wrapper.find("form").simulate("submit");
        expect(resetAction).toHaveBeenCalledWith(10, 10, 8);
    });

    test("should call reset action with NORMAL values", function() {
        setFormValue("NORMAL");
        wrapper.find("form").simulate("submit");
        expect(resetAction).toHaveBeenCalledWith(15, 25, 8);
    });

    test("should call reset action with HARD values", function() {
        setFormValue("HARD");
        wrapper.find("form").simulate("submit");
        expect(resetAction).toHaveBeenCalledWith(25, 50, 8);
    });
});
