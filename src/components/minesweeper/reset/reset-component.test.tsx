/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference types="enzyme-adapter-preact-pure" />
import { shallow, ShallowWrapper } from "enzyme";
import { FormEvent } from "react";
import { h } from "preact";
import { ResetComponent } from "./reset-component";
import * as resetActionObj from "../../../minesweeper/actions/reset-action";
import { DIFFICULTIES } from "../../../minesweeper/types/difficulty";

describe("ResetComponent", function() {
    let wrapper: ShallowWrapper<h.JSX.Element>;
    let resetAction: jasmine.Spy;
    let dispatch: jasmine.Spy;

    beforeEach(function() {
        const dispatcher = { dispatch: (): void => {} };
        dispatch = spyOn(dispatcher, "dispatch");

        resetAction = spyOn(resetActionObj, "resetAction").and.returnValue(
            "RESET_ACTION"
        );

        wrapper = shallow(<ResetComponent dispatch={dispatcher.dispatch} />);
    });

    function setFormValue(value: string): void {
        const onInput =
            wrapper.find("select").props().onInput ??
            fail("select onInput should never be undefined");
        onInput(({ currentTarget: { value } } as unknown) as FormEvent);
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

    DIFFICULTIES.forEach(function(difficulty) {
        test(`should call reset action with ${difficulty.name} values`, function() {
            setFormValue(difficulty.name);
            wrapper.find("form").simulate("submit");
            expect(resetAction).toHaveBeenCalledWith(difficulty);
        });
    });
});
