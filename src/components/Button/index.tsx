import React from "react";
import { CellState, CellValue } from "../../types";
import "./Button.scss";

interface ButtonProps {
	state: CellState;
	value: CellValue;
	row: number;
	col: number;
}

const Button: React.FC<ButtonProps> = ({ state, value, row, col }) => {
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
		<div className={`Button ${stateClass} ${valueClass}`}>
			{renderContent()}
		</div >
	)
}

export default Button;