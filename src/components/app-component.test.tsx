import { shallow, ShallowWrapper } from "enzyme";
import { ReactElement } from "react";
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
    let wrapper: ShallowWrapper;

    beforeEach(function() {
        spyOn(resetGameObj, "resetGame").and.stub();
        spyOn(loadStatsObj, "loadStats").and.stub();
        wrapper = shallow((<AppComponent />) as ReactElement);
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
        expect(titleUpdaters.length).toBe(2);
        titleUpdaters[0]("TEST0");
        expect(document.title).toBe("Minesweeper Game - TEST0");
        titleUpdaters[1]("TEST1");
        expect(document.title).toBe("Minesweeper Game - TEST1");
    });
});
