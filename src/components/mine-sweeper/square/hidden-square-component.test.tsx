/* eslint-disable @typescript-eslint/no-empty-function */
import { shallow, ShallowWrapper } from "enzyme";
import { GameStatus } from "../../../mine-sweeper/types/game-status";
import { Square } from "../../../mine-sweeper/types/square";
import { ReactElement } from "react";
import { h } from "preact";
import { HiddenSquareComponent } from "./hidden-square-component";
import * as revealActionObj from "../../../mine-sweeper/actions/reveal-action";
import Spy = jasmine.Spy;

describe("HiddenSquareComponent", function() {
    let wrapper: ShallowWrapper;
    let revealAction: Spy;

    function setup(status: GameStatus, square: Partial<Square>): void {
        revealAction = spyOn(revealActionObj, "revealAction");
        wrapper = shallow(
            (
                <HiddenSquareComponent
                    square={square as Square}
                    status={status}
                    dispatch={function(): void {}}
                />
            ) as ReactElement
        );
    }

    test("should be enabled when status is PLAY", function() {
        setup("PLAY", {});
        expect(wrapper.find("button").prop("disabled")).toBeFalsy();
    });

    test("should be disabled when status is WIN", function() {
        setup("WIN", {});
        expect(wrapper.find("button").prop("disabled")).toBeTruthy();
    });

    test("should be disabled when status is FAIL", function() {
        setup("FAIL", {});
        expect(wrapper.find("button").prop("disabled")).toBeTruthy();
    });

    test("should call revealAction when clicked", function() {
        setup("PLAY", {});
        wrapper.find("button").simulate("click");
        expect(revealAction).toHaveBeenCalledWith({});
    });

    test("should not call dispatch when not clicked", function() {
        setup("PLAY", {});
        expect(revealAction).not.toHaveBeenCalled();
    });
});
