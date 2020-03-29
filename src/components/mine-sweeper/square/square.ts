import Position from "../position";

export default interface Square {
    readonly position: Position;
    readonly revealed: boolean;
    readonly mine: boolean;
    readonly adjacentMines: number;
}
