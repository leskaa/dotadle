import React, { useEffect } from "react";
import GameBoard from "./GameBoard";
import HeroInput from "./HeroInput";
import DotadleLogo from "./assets/DotadleBetaLogo.png";
import Hero from "./types/hero";
import options from "./datasets/heroData.json";
import answers from "./datasets/answerIds.json";
import { Box } from "./Box";
import Colors from "./types/colors";
import useGuessesStore from "./stores/guessesStore";
import VictoryModal from "./VictoryModal";
import PatchNotes from "./PatchNotes";
import CountdownClock from "./CountdownClock";

// TODO: Remove hardcoded values
const dayIndex = Math.floor(
  (new Date().getTime() - new Date(2023, 3, 12).getTime()) / (1000 * 3600 * 24)
);
const correctAnswerId = answers[dayIndex];

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
  const questionIndexToday = Math.floor(
    Math.abs(new Date().getTime() - new Date(2023, 3, 12).getTime()) /
      (1000 * 3600 * 24)
  );
  if (questionIndexToday !== localQuestionIndex) {
    setQuestionIndex(questionIndexToday);
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
    <div className="app h-full w-full min-h-screen">
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
        (hero) => hero.heroId == heroes[correctAnswerId].heroId
      ) && (
        <h2 className="mt-4 mb-4 text-slate-200 text-2xl font-bold flex place-content-center">
          <VictoryModal />
        </h2>
      )}
      {
        // Display the input field only if the correct answer is not guessed yet
        !guessedHeroes.some(
          (hero) => hero.heroId == heroes[correctAnswerId].heroId
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
            {heroes[answers[dayIndex - 1]]?.heroName}
          </strong>
        </p>
      )}
      <footer className="mb-4"></footer>
    </div>
  );
}

export default App;
