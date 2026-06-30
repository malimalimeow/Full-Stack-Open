const AnecdoteForm = ({ addAneToServer }) => {
  //create new anecdote
  const getId = () => (100000 * Math.random()).toFixed(0);

  const asObject = (anecdote) => ({
    content: anecdote,
    id: getId(),
    votes: 0,
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    const newAnecdote = asObject(content);
    addAneToServer(newAnecdote);
  };
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
