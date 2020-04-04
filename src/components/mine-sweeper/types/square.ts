import Position from "./position";

interface Square {
    position: Position;
    revealed: boolean;
    mine: boolean;
    adjacentMines: number;
}

export default Square;
