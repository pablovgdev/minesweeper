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
	nine,
	bomb
}

export enum CellState {
	open,
	visible,
	flagged
}