import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Hero from "../types/hero";
import options from "../datasets/heroData.json";

interface GuessesState {
  questionIndex: number;
  guessedHeroes: Hero[];
  setQuestionIndex: (index: number) => void;
  addGuess: (heroName: string) => void;
  removaAllGuesses: () => void;
}

const useGuessesStore = create<GuessesState>()(
  persist(
    (set) => ({
      questionIndex: 0,
      guessedHeroes: [],
      setQuestionIndex: (index) => set({ questionIndex: index }),
      addGuess: (heroName) => {
        set((state) => ({
          guessedHeroes: [
            ...state.guessedHeroes,
            options.filter(
              (entry) => entry.heroName.toLowerCase() === heroName.toLowerCase()
            )[0],
          ],
        }));
      },
      removaAllGuesses: () => set({ guessedHeroes: [] }),
    }),
    {
      name: "guessesStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGuessesStore;
