import React from "react";
import useHighScoresStore from "./stores/highScoresStore";
import options from "./datasets/heroData.json";
import answers from "./datasets/answerIds.json";
import CountdownClock from "./CountdownClock";

type VictoryModalProps = {};

const VictoryModal = () => {
  const scores = useHighScoresStore((state) => state.scores);
  const todaysHero = options[answers[scores[scores.length - 1].questionId]];
  return (
    <div>
      Correct Answer&nbsp;
      <strong>{todaysHero.heroName}</strong>!
      <div className="mt-2 text-sm text-slate-400 text-center">
        <hr className="w-1/3 mx-auto mb-2" />
        Next hero in →
      </div>
      <CountdownClock />
    </div>
  );
};

export default VictoryModal;
