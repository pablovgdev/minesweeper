import React, { useContext, useEffect } from "react";
import GameContext from "./Context";
import NumberDisplay from "./NumberDisplay";

const Timer: React.FC = () => {
  const { start, time, setTime } = useContext(GameContext);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => setTime(Math.min(time + 1, 999)), 1000);
      return () => clearInterval(interval);
    }
  }, [start, time, setTime]);

  return <NumberDisplay value={time} />
}

export default Timer;