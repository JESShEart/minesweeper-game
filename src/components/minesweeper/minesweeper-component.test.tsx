/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference types="enzyme-adapter-preact-pure" />

import { h } from "preact";
import { MinesweeperComponent } from "./minesweeper-component";
import { Game } from "../../minesweeper/types/game";
import { GameDispatch } from "../../minesweeper/game-reducer";
import { StatsDispatch } from "../../stats/stats-reducer";
import { minesweeperRouteProps } from "./minesweeper-route-props";
import { BoardComponent } from "./board/board-component";
import { StatusComponent } from "./status/status-component";
import { ResetComponent } from "./reset/reset-component";
import { TimerComponent } from "./timer/timer-component";
import { FlaggingToggleComponent } from "./flagging-toggle/flagging-toggle-component";
import { shallow, ShallowWrapper } from "enzyme";

describe("MinesweeperComponent", function() {
    let wrapper: ShallowWrapper<h.JSX.Element>;
    let game: Game;
    let title: string;
    let gameDispatch: GameDispatch;
    let statsDispatch: StatsDispatch;

    beforeEach(function() {
        game = {
            status: "START",
            startedAt: 1,
            finishedAt: 2,
            flagging: false
        } as Game;
        const titleUpdater = function(it: string): void {
            title = it;
        };
        gameDispatch = function(): void {};
        statsDispatch = function(): void {};
        wrapper = shallow(
            <MinesweeperComponent
                game={game}
                dispatch={gameDispatch}
                statsDispatch={statsDispatch}
                updateTitle={titleUpdater}
            />
        );
    });

    test("should render status component", function() {
        const statusComponent = wrapper.find(StatusComponent).props();
        expect(statusComponent.status).toBe(game.status);
    });

    test("should render reset component", function() {
        const resetComponent = wrapper.find(ResetComponent).props();
        expect(resetComponent.dispatch).toBe(gameDispatch);
    });

    test("should render timer component", function() {
        const timerComponent = wrapper.find(TimerComponent).props();
        expect(timerComponent.startedAt).toBe(game.startedAt);
        expect(timerComponent.finishedAt).toBe(game.finishedAt);
    });

    test("should render board component", function() {
        const boardComponent = wrapper.find(BoardComponent).props();
        expect(boardComponent.game).toBe(game);
        expect(boardComponent.dispatch).toBe(gameDispatch);
        expect(boardComponent.statsDispatch).toBe(statsDispatch);
    });

    test("should render flagging toggle component", function() {
        const flaggingToggleComponent = wrapper
            .find(FlaggingToggleComponent)
            .props();
        expect(flaggingToggleComponent.status).toBe(game.status);
        expect(flaggingToggleComponent.flagging).toBe(game.flagging);
        expect(flaggingToggleComponent.dispatch).toBe(gameDispatch);
    });

    test("should update title", function() {
        expect(title).toBe(minesweeperRouteProps.title);
    });
});
