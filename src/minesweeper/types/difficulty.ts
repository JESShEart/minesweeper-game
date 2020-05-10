export type DifficultyName =
    | "EASY"
    | "NORMAL"
    | "HARD"
    | "EASY+"
    | "NORMAL+"
    | "HARD+"
    | "EASY++"
    | "NORMAL++"
    | "HARD++";

export interface Difficulty {
    readonly name: DifficultyName;
    readonly displayName: string;
    readonly height: number;
    readonly width: number;
    readonly mineRatio: number;
}

export const EASY: Difficulty = {
    name: "EASY",
    displayName: "Easy",
    height: 10,
    width: 10,
    mineRatio: 8
};

export const NORMAL: Difficulty = {
    name: "NORMAL",
    displayName: "Normal",
    height: 15,
    width: 25,
    mineRatio: 8
};

export const HARD: Difficulty = {
    name: "HARD",
    displayName: "Hard",
    height: 20,
    width: 40,
    mineRatio: 8
};

export const EASY_PLUS: Difficulty = {
    name: "EASY+",
    displayName: "Easy+",
    height: 10,
    width: 10,
    mineRatio: 7
};

export const NORMAL_PLUS: Difficulty = {
    name: "NORMAL+",
    displayName: "Normal+",
    height: 15,
    width: 25,
    mineRatio: 7
};

export const HARD_PLUS: Difficulty = {
    name: "HARD+",
    displayName: "Hard+",
    height: 20,
    width: 40,
    mineRatio: 7
};

export const EASY_PLUS_PLUS: Difficulty = {
    name: "EASY++",
    displayName: "Easy++",
    height: 10,
    width: 10,
    mineRatio: 6
};

export const NORMAL_PLUS_PLUS: Difficulty = {
    name: "NORMAL++",
    displayName: "Normal++",
    height: 15,
    width: 25,
    mineRatio: 6
};

export const HARD_PLUS_PLUS: Difficulty = {
    name: "HARD++",
    displayName: "Hard++",
    height: 20,
    width: 40,
    mineRatio: 6
};

export const DIFFICULTIES: readonly Difficulty[] = [
    EASY,
    EASY_PLUS,
    EASY_PLUS_PLUS,
    NORMAL,
    NORMAL_PLUS,
    NORMAL_PLUS_PLUS,
    HARD,
    HARD_PLUS,
    HARD_PLUS_PLUS
];
