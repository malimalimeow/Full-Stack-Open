import { useAnecdotes } from "../hooks/useAnecdote";

const AnecdoteList = () => {
  const { anecdotes, isPending, isError, deleteAnecdote } = useAnecdotes();

  const handleDelete = (anecdote) => {
    deleteAnecdote(anecdote);
    console.log(`deleted ${anecdote.content}`);
  };

  if (isPending) {
    return <div>Loading data...</div>;
  }

  if (isError) {
    return (
      <span>anecdote service not available due to problems in server.</span>
    );
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <li>{anecdote.content}</li>
            <button onClick={() => handleDelete(anecdote)}>delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
