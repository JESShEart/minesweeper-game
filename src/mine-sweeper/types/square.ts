import { Position } from "./position";

export interface Square {
    position: Position;
    revealed: boolean;
    flagged: boolean;
    mine: boolean;
    adjacentMines: number;
}
