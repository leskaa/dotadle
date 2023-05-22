import React, { useEffect } from "react";
import GameBoard from "./GameBoard";
import HeroInput from "./HeroInput";
import DotadleLogo from "./assets/DotadleLogo.png";
import Hero from "./types/hero";
import options from "./datasets/heroData.json";
import answers from "./datasets/answerIds.json";
import { Box } from "./Box";
import Colors from "./types/colors";
import useGuessesStore from "./stores/guessesStore";
import VictoryModal from "./VictoryModal";
import PatchNotes from "./PatchNotes";
import CountdownClock from "./CountdownClock";
import { getAnswerIndexToday } from "./timeUtilities";
import { getAnswerIdToday } from "./timeUtilities";

const dayIndex = getAnswerIndexToday();
const correctAnswerId = getAnswerIdToday();

function App() {
  // Remove non-season 1 local storage items
  useEffect(() => {
    localStorage.removeItem("guesses-store");
    localStorage.removeItem("high-scores-store");
    localStorage.removeItem("guesses-store-alpha");
    localStorage.removeItem("high-scores-store-alpha");
  }, []);

  const heroes = options as Hero[];
  const guessedHeroes: Hero[] = useGuessesStore((state) => state.guessedHeroes);
  const handleHeroGuess = useGuessesStore((state) => state.addGuess);

  // Reset local storage if the date has changed
  const localQuestionIndex = useGuessesStore((state) => state.questionIndex);
  const setQuestionIndex = useGuessesStore((state) => state.setQuestionIndex);
  const removaAllGuesses = useGuessesStore((state) => state.removaAllGuesses);
  if (dayIndex !== localQuestionIndex) {
    setQuestionIndex(dayIndex);
    removaAllGuesses();
  }

  if (dayIndex < 0) {
    return (
      <div className="app h-full w-full min-h-screen text-white mt-8 text-center text-3xl">
        <em className="text-2xl text-red-600 font-extrabold">DOTADLE</em>
        &nbsp;&nbsp;Season 1 starts on April 12th, 2023!
        <CountdownClock />
      </div>
    );
  }

  return (
    <div className="app h-full w-full min-h-screen flex flex-col overflow-x-hidden">
      <div className="relative">
        <PatchNotes />
      </div>
      <header className="mb-4 pt-5 flex place-content-center">
        <img src={DotadleLogo} alt="Dotadle Logo" />
      </header>
      {guessedHeroes.length === 0 && (
        <div className="container mx-auto p-2 border border-slate-200 bg-slate-800 w-80 rounded-md">
          <h2 className="text-slate-200 text-center font-bold text-xl">
            Guess today's Dota 2 hero!
          </h2>
          <p className="text-slate-400 text-center font-semibold text-lg">
            Type any hero to begin.
          </p>
        </div>
      )}
      {guessedHeroes.some(
        (hero) =>
          hero.heroId ==
          heroes.filter((option) => option.id === correctAnswerId)[0].heroId
      ) && (
        <h2 className="mt-4 text-slate-200 text-2xl font-bold flex place-content-center">
          <VictoryModal />
        </h2>
      )}
      {
        // Display the input field only if the correct answer is not guessed yet
        !guessedHeroes.some(
          (hero) =>
            hero.heroId ==
            heroes.filter((options) => options.id === correctAnswerId)[0].heroId
        ) && (
          <HeroInput
            handleGuessSubmission={handleHeroGuess}
            guessedHeroes={guessedHeroes}
          />
        )
      }
      <GameBoard guessedHeroes={guessedHeroes} />
      <div className="container mx-auto mb-2 p-2 border border-slate-200 bg-slate-800 w-80 rounded-md">
        <h2 className="text-slate-200 text-center font-bold text-xl">
          Color Guide
        </h2>
        <div className="flex justify-center items-center p-1">
          <Box color={Colors.CORRECT} content="Correct" />
          <Box
            color={Colors.PARTIAL}
            content="Partially Correct"
            isMultiline={true}
          />
          <Box color={Colors.INCORRECT} content="Incorrect" />
        </div>
      </div>
      {dayIndex !== 0 && (
        <p className="text-slate-300 text-center font-semibold text-md">
          Yesterday's hero was{" "}
          <em className="text-sm text-amber-500">#{dayIndex}&nbsp;&nbsp;</em>
          <strong className="text-green-500 text-lg">
            {
              heroes.filter((option) => option.id === answers[dayIndex - 1])[0]
                ?.heroName
            }
          </strong>
        </p>
      )}
      <footer className="mt-auto p-2 text-slate-300 text-sm text-center">
        <strong className="text-sm font-bold">DOTADLE</strong> — Created by{" "}
        <a
          className="text-amber-600 hover:text-amber-500"
          href="https://github.com/leskaa"
        >
          @leskaa
        </a>{" "}
        <br />
        Heavily inspired by{" "}
        <a
          className="text-cyan-600 hover:text-cyan-500"
          href="https://loldle.net/"
        >
          LoLdle.net
        </a>{" "}
        —{" "}
        <a
          className="text-amber-600 hover:text-amber-500"
          href="https://www.reddit.com/r/DotA2/comments/2b2tjb/dota_2_background_incorporating_the_107_heroes/"
        >
          Background Attribution
        </a>
      </footer>
    </div>
  );
}

export default App;
