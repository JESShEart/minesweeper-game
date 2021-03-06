/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference types="enzyme-adapter-preact-pure" />
import { shallow, ShallowWrapper } from "enzyme";
import { BoardComponent } from "./board-component";
import { Game } from "../../../minesweeper/types/game";
import { h } from "preact";
import * as style from "./board-component.css";
import { createTestBoard } from "../../../testing/create-test-board";
import { SquareComponent } from "../square/square-component";
import { GameDispatch } from "../../../minesweeper/game-reducer";
import { GameStatus } from "../../../minesweeper/types/game-status";
import { Square } from "../../../minesweeper/types/square";
import { StatsDispatch } from "../../../stats/stats-reducer";

describe("BoardComponent", function() {
    let wrapper: ShallowWrapper<h.JSX.Element>;
    let board: Square[][];
    let status: GameStatus;
    let flagging: boolean;
    let dispatch: GameDispatch;
    let statsDispatch: StatsDispatch;

    function setup(squares: Square[][]): void {
        board = squares;
        status = "PLAY";
        flagging = true;
        const game: Game = { board, status, flagging } as Game;
        dispatch = (): void => {};
        statsDispatch = function(): void {};
        wrapper = shallow(
            <BoardComponent
                game={game}
                dispatch={dispatch}
                statsDispatch={statsDispatch}
            />
        );
    }

    function expectSquare(y: number, x: number): void {
        const squareWrapper = wrapper
            .find(`.${style.row}`)
            .at(y)
            .find(SquareComponent)
            .at(x);
        expect(squareWrapper.prop("square")).toBe(board[y][x]);
        expect(squareWrapper.prop("status")).toBe(status);
        expect(squareWrapper.prop("flagging")).toBe(flagging);
        expect(squareWrapper.prop("dispatch")).toBe(dispatch);
        expect(squareWrapper.prop("statsDispatch")).toBe(statsDispatch);
    }

    test("should render empty board", function() {
        setup([]);
        expect(wrapper.find(`.${style.board}`).length).toBe(1);
        expect(wrapper.find(`.${style.row}`).length).toBe(0);
    });

    test("should render 1 empty row", function() {
        setup([[]]);
        expect(wrapper.find(`.${style.board}`).length).toBe(1);
        expect(wrapper.find(`.${style.row}`).length).toBe(1);
    });

    test("should render 3 empty rows", function() {
        setup([[], [], []]);
        expect(wrapper.find(`.${style.row}`).length).toBe(3);
    });

    test("should render 1 row of 3 squares", function() {
        setup(createTestBoard([[0, 0, 0]]));
        expectSquare(0, 0);
        expectSquare(0, 1);
        expectSquare(0, 2);
    });

    test("should render 2 rows of 2 squares", function() {
        setup(
            createTestBoard([
                [0, 1],
                [1, 0]
            ])
        );
        expectSquare(0, 0);
        expectSquare(0, 1);
        expectSquare(1, 0);
        expectSquare(1, 1);
    });
});
