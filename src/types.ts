export const MAX_ROWS = 9;
export const MAX_COLS = 9;
export const NUMBER_OF_MINES = 10;

export interface Cell {
	value: CellValue;
	state: CellState;
};

export enum CellValue {
	none,
	one,
	two,
	three,
	four,
	five,
	six,
	seven,
	eight,
	mine
}

export enum Face {
	smile = "😁",
	careful = "😨",
	lost = "😭",
	won = "😎"
}

export enum CellState {
	hidden,
	visible,
	flagged
}

export interface Coordinate {
	row: number;
	col: number;
}