import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAnecdotes,
  createAnecdote,
  deleteAnecdote,
} from "../services/requestAne";

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
    onError: (error) => {
      setMessage(error.message);
    },
  });

  const deleteAneMutation = useMutation({
    mutationFn: deleteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: (error) => {
      setMessage(error.message);
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAneMutation.mutate(content),
    deleteAnecdote: (anecdote) => deleteAneMutation.mutate(anecdote),
  };
};
