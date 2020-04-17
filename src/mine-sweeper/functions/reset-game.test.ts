import * as createBoardObj from "./create-board";
import Spy = jasmine.Spy;
import { resetGame } from "./reset-game";
import { EASY, NORMAL } from "../types/difficulty";

describe("resetGame", function() {
    let createBoard: Spy;

    beforeEach(function() {
        createBoard = spyOn(createBoardObj, "createBoard");
        createBoard.and.returnValue([]);
    });

    test("should pass params through to create board", function() {
        resetGame(NORMAL);
        expect(createBoard).toHaveBeenCalledWith(
            NORMAL.height,
            NORMAL.width,
            NORMAL.mineRatio
        );
    });

    test("should reset game", function() {
        const game = resetGame(EASY);
        expect(game).toEqual({
            board: [],
            status: "START",
            flagging: false,
            startedAt: null,
            finishedAt: null
        });
    });
});
