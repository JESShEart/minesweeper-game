/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference types="enzyme-adapter-preact-pure" />

import { shallow, ShallowWrapper } from "enzyme";
import { Square } from "../../../minesweeper/types/square";
import { RevealedSquareComponent } from "./revealed-square-component";
import { h } from "preact";
import { SquareComponent } from "./square-component";
import { HiddenSquareComponent } from "./hidden-square-component";

describe("SquareComponent", function() {
    let wrapper: ShallowWrapper<h.JSX.Element>;
    let hiddenSquare: h.JSX.Element;
    let revealedSquare: h.JSX.Element;

    function setup(square: Partial<Square>): void {
        const status = "PLAY";
        const dispatch = function(): void {};
        const statsDispatch = function(): void {};
        const flagging = true;

        hiddenSquare = (
            <HiddenSquareComponent
                square={square as Square}
                status={status}
                flagging={flagging}
                dispatch={dispatch}
                statsDispatch={statsDispatch}
            />
        );

        revealedSquare = (
            <RevealedSquareComponent
                square={square as Square}
                status={status}
            />
        );

        wrapper = shallow(
            <SquareComponent
                square={square as Square}
                status={status}
                flagging={flagging}
                dispatch={dispatch}
                statsDispatch={statsDispatch}
            />
        );
    }

    test("should render hidden square", function() {
        setup({ revealed: false });
        expect(wrapper.contains(hiddenSquare)).toBeTruthy();
        expect(wrapper.contains(revealedSquare)).toBeFalsy();
    });

    test("should render revealed square", function() {
        setup({ revealed: true });
        expect(wrapper.contains(hiddenSquare)).toBeFalsy();
        expect(wrapper.contains(revealedSquare)).toBeTruthy();
    });
});
