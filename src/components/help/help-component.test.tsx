/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference types="enzyme-adapter-preact-pure" />
import { shallow, ShallowWrapper } from "enzyme";
import { HelpComponent } from "./help-component";
import { h } from "preact";
import { helpRouteProps } from "./help-route-props";
import {
    Difficulty,
    EASY,
    EASY_PLUS,
    EASY_PLUS_PLUS
} from "../../minesweeper/types/difficulty";
import * as style from "./help-component.css";

describe("HelpComponent", function() {
    let wrapper: ShallowWrapper<h.JSX.Element>;

    function setup(): void {
        wrapper = shallow(<HelpComponent />);
    }

    ([
        [EASY, style.standardDescription],
        [EASY_PLUS, style.plusDescription],
        [EASY_PLUS_PLUS, style.plusPlusDescription]
    ] as [Difficulty, string][]).forEach(([difficulty, className]) => {
        test(`should show description for mine ratio of 1:${difficulty.mineRatio}`, function() {
            setup();
            expect(wrapper.find(`.${className}`).text()).toContain(
                `1:${difficulty.mineRatio}`
            );
        });
    });

    test("should update title", function() {
        setup();
        expect(document.title).toContain(helpRouteProps.title);
    });
});
