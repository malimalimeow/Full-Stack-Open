import { create } from "zustand";
import anecdoteService from "./service/anecdoteService";
import { useNotiStore } from "./notiStore";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
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
}));

export const useAnecdoteAdd = () => useAnecdoteStore((state) => state.add);
export const useAnecdoteVote = () => useAnecdoteStore((state) => state.vote);
export const useRemove = () => useAnecdoteStore((state) => state.remove);
export const useAneSetFilter = () =>
  useAnecdoteStore((state) => state.setFilter);
export const useMessage = () => useAnecdoteStore((state) => state.message);
export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);
  if (filter !== "") return anecdotes.filter((a) => a.content.includes(filter));

  return anecdotes;
};

useAnecdoteStore.getState().initialize();
