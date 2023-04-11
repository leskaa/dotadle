import React, { useState, useEffect } from "react";

const convertToDoubleDigits = (num: number) => {
  if (num.toString().length === 1) {
    return "0" + num;
  }
  return num;
};

const CountdownClock = () => {
  const [time, setTime] = useState(0);

  const tick = () => {
    const midight = new Date();
    midight.setHours(24, 0, 0, 0);
    setTime(midight.getTime() - new Date().getTime());
  };

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="text-center font-extrabold text-amber-700 tracking-widest">
      {convertToDoubleDigits(Math.floor(time / 1000 / 60 / 60) % 60) +
        ":" +
        convertToDoubleDigits(Math.floor(time / 1000 / 60) % 60) +
        ":" +
        convertToDoubleDigits(Math.floor(time / 1000) % 60)}
    </div>
  );
};

export default CountdownClock;
