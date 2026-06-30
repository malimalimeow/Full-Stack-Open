import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote, createAnecdote } from "../requests";

export const useAnecdotes = () => {
  const queryClient = useQueryClient();

  //initial and get all anecdotes.
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const newAneMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAne) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAne));
    },
  });

  const updateAneMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAneMutation.mutate(content),
    votes: (anecdote) =>
      updateAneMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  };
};
