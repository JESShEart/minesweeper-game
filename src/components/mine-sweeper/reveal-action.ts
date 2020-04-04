import Game from "./types/game";
import Square from "./types/square";
import { GameAction } from "./game-action";
import reveal from "./functions/reveal";
import createGame from "./functions/update-game";

export default function revealAction(square: Square): GameAction {
    return function(game: Game): Game {
        return createGame(reveal(square, game.board));
    };
}
