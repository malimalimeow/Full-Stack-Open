import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";
import { useAnecdotes } from "../hooks/useAnecdote";

const CreateNew = () => {
  const { anecdotes, isPending, isError, addAnecdote } = useAnecdotes();
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: restInfo, ...info } = useField("text");
  const navigate = useNavigate();

  const getId = () => (100000 * Math.random()).toFixed(0);

  const asObject = (anecdote) => ({
    content: anecdote,
    id: getId(),
    votes: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnecdote = asObject(content.value);
    e.target.reset();
    const response = addAnecdote(newAnecdote);
    console.log(`"${content.value} is created"`);
    navigate("/");
  };

  const handleReset = (e) => {
    resetContent();
    resetAuthor();
    restInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button onClick={() => handleReset()}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
