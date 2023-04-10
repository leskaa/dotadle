import { useState } from "react";
import GameBoard from "./GameBoard";
import HeroInput from "./HeroInput";
import DotadleLogo from "./assets/DotadleAlphaLogo.png";
import Hero from "./types/hero";
import options from "./datasets/editedHeroData.json";
import answers from "./datasets/answerIds.json";

// TODO: Remove hardcoded values
const correctAnswerId =
  answers[
    Math.floor(
      Math.abs(new Date().getTime() - new Date(2023, 3, 10).getTime()) /
        (1000 * 3600 * 24)
    )
  ];

function App() {
  const [guessedHeroes, setGuessedHeroes] = useState<Hero[]>([]);

  const handleHeroGuess = (heroName: string) => {
    setGuessedHeroes((guessedHeroes) => {
      return [
        ...guessedHeroes,
        options.filter((entry) => entry.heroName === heroName)[0],
      ];
    });
  };

  return (
    <div className="app h-full w-full min-h-screen">
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
      {guessedHeroes.includes(options[correctAnswerId]) && (
        <h2 className="mt-4 mb-8 text-slate-200 text-2xl font-bold flex place-content-center">
          Correct Answer&nbsp;
          <strong>{options[correctAnswerId].heroName}</strong>!
        </h2>
      )}
      {
        // Display the input field only if the correct answer is not guessed yet
        !guessedHeroes.includes(options[correctAnswerId]) && (
          <HeroInput
            handleGuessSubmission={handleHeroGuess}
            guessedHeroes={guessedHeroes}
          />
        )
      }
      <GameBoard guessedHeroes={guessedHeroes} />
    </div>
  );
}

export default App;
