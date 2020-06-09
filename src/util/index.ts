import { Cell, CellState, CellValue, MAX_COLS, MAX_ROWS, NUMBER_OF_MINES } from "../types";

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

			for (let nearRow = row - 1; nearRow <= row + 1; nearRow++) {
				for (let nearCol = col - 1; nearCol <= col + 1; nearCol++) {
					if (nearRow >= 0 && nearRow < MAX_ROWS && nearCol >= 0 && nearCol < MAX_COLS) {
						if (cells[nearRow][nearCol].value === CellValue.mine) {
							mines++;
						}
					}
				}
			}

			if (cells[row][col].value !== CellValue.mine) {
				cells[row][col].value = mines;
			}
		}
	}

	return cells;
}
