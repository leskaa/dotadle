import { create } from "zustand";
import Hero from "../types/hero";
import options from "../datasets/heroData.json";

interface GuessesState {
  guessedHeroes: Hero[];
  addGuess: (heroName: string) => void;
  removaAllGuesses: () => void;
}

const useGuessesStore = create<GuessesState>((set) => ({
  guessedHeroes: [],
  addGuess: (heroName) =>
    set((state) => ({
      guessedHeroes: [
        ...state.guessedHeroes,
        options.filter(
          (entry) => entry.heroName.toLowerCase() === heroName.toLowerCase()
        )[0],
      ],
    })),
  removaAllGuesses: () => set({ guessedHeroes: [] }),
}));

export default useGuessesStore;
