import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Score {
  questionId: number;
  score: number;
}

interface HighScoresState {
  scores: Score[];
  addScore: (questionId: number, score: number) => void;
}

const useHighScoresStore = create<HighScoresState>()(
  persist(
    (set) => ({
      scores: [],
      addScore: (questionId, score) => {
        set((state) => ({
          scores: [...state.scores, { questionId: questionId, score: score }],
        }));
      },
    }),
    {
      name: "high-scores-store-alpha",
    }
  )
);

export default useHighScoresStore;
