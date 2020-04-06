import { createGame } from "./create-game";
import Spy = jasmine.Spy;
import { Square } from "../types/square";
import * as GetStatus from "./get-status";
import * as RevealMines from "./reveal-mines";
import { GameStatus } from "../types/game-status";

describe("createGame", function() {
    let revealMinesSpy: Spy;
    let getStatusSpy: Spy;

    function setup(revealMines: Square[][], getStatus: GameStatus): void {
        revealMinesSpy = spyOn(RevealMines, "revealMines").and.returnValue(
            revealMines
        );
        getStatusSpy = spyOn(GetStatus, "getStatus").and.returnValues(
            getStatus
        );
    }

    test("should reveal mines when the game is won", function() {
        setup([], "WIN");
        const game = createGame([]);
        expect(game).toEqual({ board: [], status: "WIN" });
        expect(getStatusSpy).toHaveBeenCalled();
        expect(revealMinesSpy).toHaveBeenCalled();
    });

    test("should reveal mines when the game is lost", function() {
        setup([], "FAIL");
        const game = createGame([]);
        expect(game).toEqual({ board: [], status: "FAIL" });
        expect(getStatusSpy).toHaveBeenCalled();
        expect(revealMinesSpy).toHaveBeenCalled();
    });

    test("should not reveal mines when the game is ongoing", function() {
        setup([], "PLAY");
        const game = createGame([]);
        expect(game).toEqual({ board: [], status: "PLAY" });
        expect(getStatusSpy).toHaveBeenCalled();
        expect(revealMinesSpy).not.toHaveBeenCalled();
    });
});
