import React, { useEffect, useState } from "react";
import NumberDisplay from "./NumberDisplay";

interface TimerProps {
	live: boolean;
}

const Timer: React.FC<TimerProps> = ({ live }) => {
	const [time, setTime] = useState<number>(0);

	useEffect(() => {
		if (live) {
			const interval = setInterval(() => setTime(Math.min(time + 1, 999)), 1000);
			return () => clearInterval(interval);
		} else {
			setTime(0);
		}
	}, [live, time]);

	return <NumberDisplay value={time} />
}

export default Timer;