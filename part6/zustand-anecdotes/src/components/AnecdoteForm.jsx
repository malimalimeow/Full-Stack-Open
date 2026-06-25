import { useAnecdoteAdd } from "../store";
const AnecdoteForm = () => {
  const add = useAnecdoteAdd();

  const addAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    add(anecdote);
    e.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
