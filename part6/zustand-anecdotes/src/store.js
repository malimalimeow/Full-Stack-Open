import { create } from "zustand";
import anecdoteService from "./service/anecdoteService";
import { useNotiStore } from "./notiStore";
import { shallow } from "zustand/shallow";
import { devtools } from "zustand/middleware";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const useAnecdoteStore = create(
  devtools((set, get) => ({
    anecdotes: [],
    filter: "",
    action: {
      initialize: async () => {
        const anecdotes = await anecdoteService.getAll();
        set(() => ({ anecdotes }));
      },

      add: async (content) => {
        try {
          const format_content = asObject(content);
          const ane = await anecdoteService.createNew(format_content);
          set((state) => ({
            anecdotes: state.anecdotes.concat(ane),
          }));
          useNotiStore.getState().setMessage(`"${ane.content}" is added`);
        } catch (error) {
          useNotiStore.getState().setMessage(error);
        }
      },
      vote: async (id) => {
        try {
          const ane = useAnecdoteStore
            .getState()
            .anecdotes.find((a) => a.id === id);
          const updated = await anecdoteService.update(id, {
            ...ane,
            votes: ane.votes + 1,
          });

          set((state) => ({
            anecdotes: state.anecdotes.map((anecdote) =>
              anecdote.id === id ? updated : anecdote,
            ),
          }));
          useNotiStore.getState().setMessage(`"${ane.content}" is voted`);
        } catch (error) {
          useNotiStore.getState().setMessage(error);
        }
      },
      setFilter: (value) => set(() => ({ filter: value })),
      remove: async (id) => {
        try {
          await anecdoteService.remove(id);
          set((state) => ({
            anecdotes: state.anecdotes.filter((ane) => ane.id !== id),
          }));
          useNotiStore.getState().setMessage("An anecdote is deleted");
        } catch (error) {
          useNotiStore.getState().setMessage(error);
        }
      },
    },
  })),
);

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes, shallow);
  const filter = useAnecdoteStore((state) => state.filter);
  if (filter !== "") return anecdotes.filter((a) => a.content.includes(filter));

  return anecdotes;
};
export const useAnecdotesAction = () =>
  useAnecdoteStore((state) => state.action);
export const useFilter = () => useAnecdotesStore((state) => state.filter);

export default useAnecdoteStore;
