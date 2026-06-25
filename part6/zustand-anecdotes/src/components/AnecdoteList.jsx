import { useAnecdotes, useAnecdoteVote } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const vote = useAnecdoteVote();

  const anecdotesInDesc = [...anecdotes].toSorted((a, b) => b.votes - a.votes);

  return (
    <div>
      {anecdotesInDesc.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
