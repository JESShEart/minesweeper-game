import { Reducer } from "preact/hooks";
import Square from "./square/square";
import Position from "./position";
import { reveal } from "./board-functions";

export const boardReducer: Reducer<Square[][], Position> = (
    squares,
    position
) => {
    return reveal(position, squares);
};
