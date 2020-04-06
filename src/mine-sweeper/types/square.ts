import { Position } from "./position";

export interface Square {
    position: Position;
    revealed: boolean;
    mine: boolean;
    adjacentMines: number;
}
