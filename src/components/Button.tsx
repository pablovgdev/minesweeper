import React from "react";
import "../styles/Button.scss";
import { CellState, CellValue } from "../types";

interface ButtonProps {
	state: CellState;
	value: CellValue;
	row: number;
	col: number;
	onClick(row: number, col: number): (e: React.MouseEvent) => void;
	onContext(row: number, col: number): (e: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ state, value, row, col, onClick, onContext }) => {
	const renderContent = (): React.ReactNode => {
		if (state === CellState.visible) {
			if (value === CellValue.mine) {
				return <span role="img" aria-label="face">💣</span>
			} else if (value === CellValue.none) {
				return null;
			} else {
				return value;
			}
		} else if (state === CellState.flagged) {
			return <span role="img" aria-label="face">🚩</span>
		}

		return null;
	}

	const stateClass = state === CellState.visible ? "visible" : "";
	const valueClass = `value-${value}`;

	return (
		<div
			className={`Button ${stateClass} ${valueClass}`}
			onClick={onClick(row, col)}
			onContextMenu={onContext(row, col)}
		>
			{renderContent()}
		</div >
	)
}

export default Button;