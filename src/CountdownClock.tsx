import React, { useState, useEffect } from "react";
import { getTimeUntilNextQuestion } from "./timeUtilities";
import useGuessesStore from "./stores/guessesStore";

const CountdownClock = () => {
  const localQuestionIndex = useGuessesStore((state) => state.questionIndex);
  const [time, setTime] = useState(
    getTimeUntilNextQuestion(localQuestionIndex)
  );

  const tick = () => {
    setTime(getTimeUntilNextQuestion(localQuestionIndex));
  };

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  // otherwise, return the time
  return (
    <div className="text-center font-extrabold text-amber-600 tracking-widest">
      {time}
    </div>
  );
};

export default CountdownClock;
