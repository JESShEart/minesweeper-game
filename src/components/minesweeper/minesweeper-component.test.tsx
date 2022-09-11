/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference types="enzyme-adapter-preact-pure" />
import { h } from "preact";
import { MinesweeperComponent } from "./minesweeper-component";
import { minesweeperRouteProps } from "./minesweeper-route-props";
import { shallow, ShallowWrapper } from "enzyme";
import { BoardContainer } from "../../containers/board-container";
import { FlaggingToggleContainer } from "../../containers/flagging-toggle-container";
import { StatusContainer } from "../../containers/status-container";
import { ResetContainer } from "../../containers/reset-container";
import { TimerContainer } from "../../containers/timer-container";

describe("MinesweeperComponent", function() {
    let wrapper: ShallowWrapper<h.JSX.Element>;

    beforeEach(function() {
        wrapper = shallow(<MinesweeperComponent />);
    });

    test("should render status container", function() {
        expect(wrapper.find(StatusContainer).length).toBe(1);
    });

    test("should render reset container", function() {
        expect(wrapper.find(ResetContainer).length).toBe(1);
    });

    test("should render timer container", function() {
        expect(wrapper.find(TimerContainer).length).toBe(1);
    });

    test("should render board container", function() {
        expect(wrapper.find(BoardContainer).length).toBe(1);
    });

    test("should render flagging toggle container", function() {
        expect(wrapper.find(FlaggingToggleContainer).length).toBe(1);
    });

    test("should update title", function() {
        expect(document.title).toContain(minesweeperRouteProps.title);
    });
});
