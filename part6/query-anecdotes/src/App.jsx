import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks/useAnecdotes";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const App = () => {
  const {
    anecdotes,
    isPending,
    isError,
    addAnecdote: addAneToServer,
    votes,
  } = useAnecdotes();

  const { message, setMessage } = useContext(NotificationContext);
  const handleVote = (anecdote) => {
    votes(anecdote);
    setMessage(`anecdote "${anecdote.content}" voted`);
    console.log(message);
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
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAneToServer={addAneToServer} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default App;
