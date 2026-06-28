import { useAnecdotesAction, useAnecdotes } from "../store";

const AnecdoteList = () => {
  const { vote, remove } = useAnecdotesAction();
  const anecdotes = useAnecdotes();

  console.log(anecdotes);

  const anecdotesInDesc = [...anecdotes].toSorted((a, b) => b.votes - a.votes);
  const handleDelete = (anecdote) => {
    if (!window.confirm(`Delete "${anecdote.content}"?`)) {
      return;
    }
    remove(anecdote.id);
  };

  return (
    <div>
      {anecdotesInDesc.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
          {anecdote.votes === 0 && (
            <button
              onClick={() => {
                handleDelete(anecdote);
              }}
            >
              Delete
            </button>
          )}
          <br />
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
