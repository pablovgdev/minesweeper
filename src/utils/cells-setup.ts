import { Cell, CellState, CellValue, Coordinate, MAX_COLS, MAX_ROWS, NUMBER_OF_MINES } from "../types";

export const generateCells = (): Cell[][] => {
	const cells: Cell[][] = [];

	for (let row = 0; row < MAX_ROWS; row++) {
		cells.push([]);

		for (let col = 0; col < MAX_COLS; col++) {
			cells[row].push({
				value: CellValue.none,
				state: CellState.hidden
			})
		}
	}

	let minesPlaced = 0;
	while (minesPlaced < NUMBER_OF_MINES) {
		const row = Math.floor(Math.random() * MAX_ROWS);
		const col = Math.floor(Math.random() * MAX_COLS);

		if (cells[row][col].value !== CellValue.mine) {
			cells[row][col].value = CellValue.mine;
			minesPlaced++;
		}
	}

	for (let row = 0; row < MAX_ROWS; row++) {
		for (let col = 0; col < MAX_COLS; col++) {
			let mines = 0;
			const surroundingCells = getSurroundingCells(cells, row, col);

			for (const cell of surroundingCells) {
				if (cells[cell.row][cell.col].value === CellValue.mine) {
					mines++;
				}
			}

			if (cells[row][col].value !== CellValue.mine) {
				cells[row][col].value = mines;
			}
		}
	}

	return cells;
}

export const openBlankCells = (cells: Cell[][], row: number, col: number): Cell[][] => {
	cells[row][col].state = CellState.visible;
	console.log("==========", row, col, "==========");

	if (cells[row][col].value === CellValue.none) {
		const surroundingCells = getHiddenSurroundingCells(cells, row, col);

		for (const cell of surroundingCells) {
			cells = openBlankCells(cells, cell.row, cell.col);
		}
	}
	return cells;
}

const getSurroundingCells = (cells: Cell[][], row: number, col: number): Coordinate[] => {
	const coordinates = []

	for (let r = row - 1; r <= row + 1; r++) {
		for (let c = col - 1; c <= col + 1; c++) {
			if (r >= 0 && r < MAX_ROWS && c >= 0 && c < MAX_COLS) {
				coordinates.push({ row: r, col: c });
			}
		}
	}

	return coordinates;
}

const getHiddenSurroundingCells = (cells: Cell[][], row: number, col: number): Coordinate[] => {
	const coordinates = []

	for (let r = row - 1; r <= row + 1; r++) {
		for (let c = col - 1; c <= col + 1; c++) {
			if (r >= 0 && r < MAX_ROWS && c >= 0 && c < MAX_COLS) {
				if (
					cells[r][c].state === CellState.hidden &&
					cells[r][c].value !== CellValue.mine
				) {
					coordinates.push({ row: r, col: c });
				}
			}
		}
	}

	return coordinates;
}