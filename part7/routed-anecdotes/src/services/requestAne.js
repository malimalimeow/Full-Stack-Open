const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return await response.json();
};

export const createAnecdote = async (newAnecdote) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAnecdote),
  };

  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create anecdote");
  }

  return await response.json();
};

export const deleteAnecdote = async (delAnecdote) => {
  const option = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(delAnecdote),
  };

  const response = await fetch(`${baseUrl}/${delAnecdote.id}`, option);
  if (!response.ok) {
    throw new Error("Failed to delete anecdote");
  }

  return await response.json();
};
