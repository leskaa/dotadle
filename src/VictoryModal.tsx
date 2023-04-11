import React from "react";
import useHighScoresStore from "./stores/highScoresStore";
import options from "./datasets/heroData.json";
import answers from "./datasets/answerIds.json";
import CountdownClock from "./CountdownClock";
import Score from "./types/score";

type VictoryModalProps = {};

const getAverageScore = (scores: Score[]) => {
  let total = 0;
  scores.forEach((score) => {
    total += score.score;
  });
  return Math.round(total / scores.length);
};

const getCurrentStreak = (scores: Score[]) => {
  let streak = 1;
  // iterate through a list of scores in reverse order
  if (scores.length > 1) {
    for (let i = scores.length - 2; i >= 0; i--) {
      // if the current score is the previous question id, increment the streak
      if (scores[i].questionId === scores[i + 1]?.questionId - 1) {
        streak++;
      }
    }
  }
  return streak;
};

const getLongestStreak = (scores: Score[]) => {
  let streak = 1;
  let longestStreak = 1;
  // iterate through a list of scores in reverse order
  if (scores.length > 1) {
    for (let i = scores.length - 2; i >= 0; i--) {
      // if the current score is the previous question id, increment the streak
      if (scores[i].questionId === scores[i + 1]?.questionId - 1) {
        streak++;
        // if the streak is longer than the longest streak, update the longest streak
        if (streak > longestStreak) {
          longestStreak = streak;
        }
      } else {
        // if the current score is not the previous question id, reset the streak
        streak = 1;
      }
    }
  }
  return longestStreak;
};

const VictoryModal = () => {
  const scores = useHighScoresStore((state) => state.scores);
  const heroToday = options[answers[scores[scores.length - 1]?.questionId]];
  const scoreToday = scores.at(scores.length - 1)?.score;
  return (
    <div>
      Correct Answer&nbsp;
      <strong>{heroToday?.heroName}</strong>!
      <div className="text-sm text-center m-1">
        You found the correct answer in{" "}
        <strong className="text-amber-500 text-md">{scoreToday}</strong>{" "}
        {scoreToday && scoreToday > 1 ? "guesses" : "guess"}
      </div>
      <div className="container mx-auto mt-4 p-2 border border-slate-200 bg-slate-800 w-72 rounded-md">
        <div className="flex justify-center gap-4">
          <div className="flex flex-col text-sm text-center">
            <h3 className="text-2xl font-bold text-amber-500">
              {scores.length}
            </h3>
            <div className="text-slate-300 text-xs font-extrabold w-14">
              Played
            </div>
          </div>
          <div className="flex flex-col text-sm text-center">
            <h3 className="text-2xl font-bold text-amber-500">
              {getAverageScore(scores)}
            </h3>
            <div className="text-slate-300 text-xs font-extrabold w-14">
              Average Score
            </div>
          </div>
          <div className="flex flex-col text-sm text-center">
            <h3 className="text-2xl font-bold text-amber-500">
              {getCurrentStreak(scores)}
              {getCurrentStreak(scores) > 1 && "🔥"}
            </h3>
            <div className="text-slate-300 text-xs font-extrabold w-14">
              Current Streak
            </div>
          </div>
          <div className="flex flex-col text-sm text-center">
            <h3 className="text-2xl font-bold text-amber-500">
              {getLongestStreak(scores)}
            </h3>
            <div className="text-slate-300 text-xs font-extrabold w-14">
              Max Streak
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-sm text-slate-300 text-center">
        Next hero in →
      </div>
      <CountdownClock />
    </div>
  );
};

export default VictoryModal;
