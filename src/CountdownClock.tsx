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
    const startingTime = new Date(2023, 3, 12, 5).getTime();
    const timezoneAdjustment = new Date().getTimezoneOffset() * 60 * 1000;
    const milisecondsUntilNextDay =
      1000 * 3600 * 24 -
      ((currentTime - startingTime + timezoneAdjustment) % (1000 * 3600 * 24));
    setTime(milisecondsUntilNextDay);
  };

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  // if the time is negative, return "NOW"
  // TODO: Fix this by moving the time functions into a shared file and using the guessesStore
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
