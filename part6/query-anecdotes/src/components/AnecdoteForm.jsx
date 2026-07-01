import { useContext } from "react";
import NotificationContext from "../NotificationContext";
const AnecdoteForm = ({ addAneToServer }) => {
  const { message, setMessage } = useContext(NotificationContext);
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
    const response = addAneToServer(newAnecdote);
    setMessage(`"${content}" is created`);
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
