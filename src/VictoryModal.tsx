import React from "react";
import useHighScoresStore from "./stores/highScoresStore";
import options from "./datasets/heroData.json";
import answers from "./datasets/answerIds.json";
import clipboard from "./assets/clipboard.svg";
import CountdownClock from "./CountdownClock";
import Score from "./types/score";
import useGuessesStore from "./stores/guessesStore";
import Colors from "./types/colors";

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

const checkIfListsMatch = (
  correctList: string[],
  guessedList: string[]
): Colors => {
  if (correctList?.sort().join(",") === guessedList.sort().join(",")) {
    return Colors.CORRECT;
  } else if (correctList?.some((role) => guessedList.includes(role))) {
    return Colors.PARTIAL;
  } else {
    return Colors.INCORRECT;
  }
};

const VictoryModal = () => {
  const scores = useHighScoresStore((state) => state.scores);
  const guessedHeroes = useGuessesStore((state) => state.guessedHeroes);
  const heroToday = options.filter(
    (option) => option.id === answers[scores[scores.length - 1]?.questionId]
  )[0];
  const imageURL = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroToday?.heroImageName}.png`;
  const scoreToday = scores.at(scores.length - 1)?.score;

  const generateShareText = (): string => {
    let emojis = "";

    guessedHeroes
      .slice(-6)
      .reverse()
      .map((hero) => {
        if (heroToday?.attribute === hero.attribute) {
          emojis += `🟩`;
        } else {
          emojis += `🟥`;
        }
        if (
          checkIfListsMatch(heroToday?.lanes, hero.lanes) === Colors.CORRECT
        ) {
          emojis += `🟩`;
        } else if (
          checkIfListsMatch(heroToday?.lanes, hero.lanes) === Colors.PARTIAL
        ) {
          emojis += `🟨`;
        } else {
          emojis += `🟥`;
        }
        if (heroToday?.gender === hero.gender) {
          emojis += `🟩`;
        } else {
          emojis += `🟥`;
        }
        if (checkIfListsMatch(heroToday?.race, hero.race) === Colors.CORRECT) {
          emojis += `🟩`;
        } else if (
          checkIfListsMatch(heroToday?.race, hero.race) === Colors.PARTIAL
        ) {
          emojis += `🟨`;
        } else {
          emojis += `🟥`;
        }
        if (heroToday?.complexity === hero.complexity) {
          emojis += `🟩`;
        } else {
          emojis += `🟥`;
        }
        if (heroToday?.legs === hero.legs) {
          emojis += `🟩`;
        } else {
          emojis += `🟥`;
        }
        if (heroToday?.releaseYear > hero.releaseYear) {
          emojis += `⬆️`;
        } else if (heroToday?.releaseYear < hero.releaseYear) {
          emojis += `⬇️`;
        } else {
          emojis += `🟩`;
        }
        emojis += "\n";
      });

    let overflowGuesses = "";

    if (guessedHeroes.length > 6) {
      overflowGuesses = `+${guessedHeroes.length - 6} more guess${
        guessedHeroes.length > 7 ? "es" : ""
      }\n`;
    }

    return `I found #DOTADLE hero #${
      scores[scores.length - 1]?.questionId + 1
    } in ${scoreToday} attempt${
      guessedHeroes.length > 1 ? "s" : ""
    }!\n${emojis}${overflowGuesses}https://dotadle.netlify.app`;
  };

  const handleCopyButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(generateShareText());
  };

  return (
    <div>
      <div className="text-3xl text-center">
        <strong className="text-amber-600">{heroToday?.heroName}!</strong>
        &nbsp;&nbsp;
        <img
          src={imageURL}
          alt={heroToday?.heroImageName}
          className="object-cover h-10 inline border border-amber-600 rounded-md mb-1"
        ></img>
      </div>
      <div className="text-lg text-center m-1">
        You solved today's{" "}
        <em className="text-lg italic text-red-700">DOTADLE</em>
        &nbsp;&nbsp;in{" "}
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
      <div className="container mx-auto mt-2 p-2 border border-slate-200 bg-slate-800 w-72 rounded-md">
        <div className="text-sm text-center whitespace-pre-wrap">
          {generateShareText()}
        </div>
        <div className="flex justify-center mt-2">
          <a
            href="#"
            onClick={handleCopyButtonClick}
            className="border border-slate-200 w-20 h-10 relative inline-flex items-center justify-start py-2 pl-2 pr-4 overflow-hidden font-semibold text-slate-200 transition-all duration-150 ease-in-out rounded hover:pl-7 hover:pr-6 bg-slate-800 group"
          >
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-amber-700 group-hover:h-full"></span>
            <span className="absolute right-0 pr-1 duration-200 ease-out group-hover:translate-x-8">
              <img src={clipboard} alt="clipboard" className="w-6 h-6 pb-1" />
            </span>
            <span className="absolute left-0 pl-1 -translate-x-8 group-hover:translate-x-0 ease-out duration-200">
              <img src={clipboard} alt="clipboard" className="w-6 h-6 pb-1" />
            </span>
            <span className="relative text-left text-sm transition-colors duration-200 ease-in-out group-hover:text-slate-200">
              Copy
            </span>
          </a>
        </div>
      </div>
      <div className="flex w-80 h-16 place-content-center items-center container mx-auto">
        <div className="flex flex-col justify-center">
          <div className="mt-2 text-sm text-slate-300 text-center">
            Next hero in →
          </div>
          <CountdownClock />
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;
