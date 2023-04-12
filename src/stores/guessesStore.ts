import { create } from "zustand";
import { persist } from "zustand/middleware";
import Hero from "../types/hero";
import options from "../datasets/heroData.json";
import answers from "../datasets/answerIds.json";
import useHighScoresStore from "./highScoresStore";

interface GuessesState {
  questionIndex: number;
  guessedHeroes: Hero[];
  setQuestionIndex: (index: number) => void;
  addGuess: (heroName: string) => void;
  removaAllGuesses: () => void;
}

const useGuessesStore = create<GuessesState>()(
  persist(
    (set, get) => ({
      questionIndex: 0,
      guessedHeroes: [],
      setQuestionIndex: (index) => set({ questionIndex: index }),
      addGuess: (heroName) => {
        // Prevent duplicate guesses
        if (
          get().guessedHeroes.some(
            (hero) => hero.heroName.toLowerCase() === heroName.toLowerCase()
          )
        ) {
          return;
        }
        set((state) => ({
          guessedHeroes: [
            ...state.guessedHeroes,
            options.filter(
              (entry) => entry.heroName.toLowerCase() === heroName.toLowerCase()
            )[0],
          ],
        }));
        if (
          heroName.toLowerCase() ==
          options
            .filter((option) => option.id === answers[get().questionIndex])[0]
            .heroName.toLowerCase()
        ) {
          useHighScoresStore
            .getState()
            .addScore(get().questionIndex, get().guessedHeroes.length);
        }
      },
      removaAllGuesses: () => set({ guessedHeroes: [] }),
    }),
    {
      name: "guesses-store-beta",
    }
  )
);

export default useGuessesStore;
