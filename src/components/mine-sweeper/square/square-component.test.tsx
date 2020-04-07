/* eslint-disable @typescript-eslint/no-empty-function */
import { shallow, ShallowWrapper } from "enzyme";
import { Square } from "../../../mine-sweeper/types/square";
import { RevealedSquareComponent } from "./revealed-square-component";
import { ReactElement } from "react";
import { h } from "preact";
import SquareComponent from "./square-component";
import { HiddenSquareComponent } from "./hidden-square-component";

describe("SquareComponent", function() {
    let wrapper: ShallowWrapper;
    let hiddenSquare: ReactElement;
    let revealedSquare: ReactElement;

    function setup(square: Partial<Square>): void {
        const status = "PLAY";
        const dispatch = function(): void {};

        hiddenSquare = (
            <HiddenSquareComponent
                status={status}
                square={square as Square}
                dispatch={dispatch}
            />
        ) as ReactElement;

        revealedSquare = (
            <RevealedSquareComponent
                status={status}
                square={square as Square}
            />
        ) as ReactElement;

        wrapper = shallow(
            (
                <SquareComponent
                    square={square as Square}
                    status={status}
                    dispatch={dispatch}
                />
            ) as ReactElement
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
