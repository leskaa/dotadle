import React, { useState, useEffect } from "react";

const convertToDoubleDigits = (num: number): string => {
  if (num.toString().length === 1) {
    return "0" + num;
  }
  return num.toString();
};

const CountdownClock = () => {
  const [time, setTime] = useState(0);

  const tick = () => {
    const currentTime = new Date().getTime();
    const midnight = new Date();
    // CST is UTC - 6 hours
    // A 5 hour offset is used to account for getTimezoneOffset adjusting for DST
    midnight.setHours(24 + 5, 0, 0, 0);
    const timezoneAdjustment = new Date().getTimezoneOffset() * 60 * 1000;
    setTime(midnight.getTime() - currentTime - timezoneAdjustment);
  };

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  // if the time is negative, return "NOW"
  if (
    convertToDoubleDigits(Math.floor(time / 1000 / 60 / 60) % 60).includes("-")
  ) {
    return (
      <div className="text-center font-extrabold text-amber-600 tracking-widest">
        NOW
      </div>
    );
  }

  // otherwise, return the time
  return (
    <div className="text-center font-extrabold text-amber-600 tracking-widest">
      {convertToDoubleDigits(Math.floor(time / 1000 / 60 / 60) % 60) +
        ":" +
        convertToDoubleDigits(Math.floor(time / 1000 / 60) % 60) +
        ":" +
        convertToDoubleDigits(Math.floor(time / 1000) % 60)}
    </div>
  );
};

export default CountdownClock;
