import { create } from "zustand";

export const useNotiStore = create((set) => ({
  message: null,
  setMessage: (text) => set(() => ({ message: text })),
}));
