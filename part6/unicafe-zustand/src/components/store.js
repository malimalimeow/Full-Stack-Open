import { create } from "zustand";
const useReviewStore = create((set) => ({
  good: 0,
  bad: 0,
  neutral: 0,
  actions: {
    incrementGood: () => set((state) => ({ good: state.good + 1 })),
    incrementBad: () => set((state) => ({ bad: state.bad + 1 })),
    incrementNeu: () => set((state) => ({ neutral: state.neutral + 1 })),
  },
}));

export const useGood = () => useReviewStore((state) => state.good);
export const useNeutral = () => useReviewStore((state) => state.neutral);
export const useBad = () => useReviewStore((state) => state.bad);

export const useReviewAction = () => useReviewStore((state) => state.actions);
