import * as createBoardObj from "./create-board";
import { resetGame } from "./reset-game";
import { EASY, NORMAL } from "../types/difficulty";
import Spy = jasmine.Spy;

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
            difficultyName: EASY.name,
            status: "START",
            flagging: false,
            startedAt: null,
            finishedAt: null
        });
    });
});
