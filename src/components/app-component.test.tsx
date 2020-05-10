/// <reference types="enzyme-adapter-preact-pure" />
import { shallow, ShallowWrapper } from "enzyme";
import { h } from "preact";
import { AppComponent, TitleUpdater } from "./app-component";
import * as resetGameObj from "../minesweeper/functions/reset-game";
import * as loadStatsObj from "../stats/functions/load-stats";
import { Route } from "preact-router";
import { MinesweeperComponent } from "./minesweeper/minesweeper-component";
import { minesweeperRouteProps } from "./minesweeper/minesweeper-route-props";
import { statsRouteProps } from "./stats/stats-route-props";
import { StatsComponent } from "./stats/stats-component";

describe("AppComponent", function() {
    let wrapper: ShallowWrapper<h.JSX.Element>;

    beforeEach(function() {
        spyOn(resetGameObj, "resetGame").and.stub();
        spyOn(loadStatsObj, "loadStats").and.stub();
        wrapper = shallow(<AppComponent />);
    });

    afterEach(function() {
        window.getSelection = function(): null {
            return null;
        };
    });

    test("should render minesweeper route", function() {
        const foundLink = wrapper
            .find(Route)
            .filterWhere(
                item =>
                    item.prop("path") === minesweeperRouteProps.path &&
                    item.prop("component") === MinesweeperComponent
            );
        expect(foundLink.length).toBe(1);
    });

    test("should render stats route", function() {
        const foundLink = wrapper
            .find(Route)
            .filterWhere(
                item =>
                    item.prop("path") === statsRouteProps.path &&
                    item.prop("component") === StatsComponent
            );
        expect(foundLink.length).toBe(1);
    });

    test("should set title when updateTitle functions are called", function() {
        const titleUpdaters: TitleUpdater[] = wrapper
            .find(Route)
            .map(item => item.prop("updateTitle"));
        expect(titleUpdaters.length).toBe(3);
        titleUpdaters[0]("TEST0");
        expect(document.title).toBe("Minesweeper Game - TEST0");
        titleUpdaters[1]("TEST1");
        expect(document.title).toBe("Minesweeper Game - TEST1");
        titleUpdaters[2]("TEST2");
        expect(document.title).toBe("Minesweeper Game - TEST2");
    });

    function simulateTouchStartOnApp(): void {
        const onTouchStart = wrapper.find("#app").props().onTouchStart;
        onTouchStart && onTouchStart({} as React.TouchEvent);
    }

    function simulateTouchEndOnApp(): void {
        const onTouchEnd = wrapper.find("#app").props().onTouchEnd;
        onTouchEnd && onTouchEnd({} as React.TouchEvent);
    }

    test("should clear selection for chrome-like touches", function() {
        let emptyCalled;

        window.getSelection = function(): Selection {
            return {
                empty: function(): void {
                    emptyCalled = true;
                }
            } as Selection;
        };

        emptyCalled = false;
        simulateTouchStartOnApp();
        expect(emptyCalled).toBeTruthy();

        emptyCalled = false;
        simulateTouchEndOnApp();
        expect(emptyCalled).toBeTruthy();
    });

    test("should clear selection for firefox-like touches", function() {
        let removeAllRangesCalled;

        window.getSelection = function(): Selection {
            return {
                removeAllRanges: function(): void {
                    removeAllRangesCalled = true;
                }
            } as Selection;
        };

        removeAllRangesCalled = false;
        simulateTouchStartOnApp();
        expect(removeAllRangesCalled).toBeTruthy();

        removeAllRangesCalled = false;
        simulateTouchEndOnApp();
        expect(removeAllRangesCalled).toBeTruthy();
    });

    test("should not error when no selection for touches", function() {
        window.getSelection = function(): null {
            return null;
        };

        expect(function() {
            simulateTouchStartOnApp();
        }).not.toThrowError();

        expect(function() {
            simulateTouchEndOnApp();
        }).not.toThrowError();
    });
});
