import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import Footer from "./components/Footer";
import CreateNew from "./components/CreateNew";
import { useAnecdotes } from "./hooks/useAnecdote";

const App = () => {
  const { anecdotes, isPending, isError } = useAnecdotes();

  if (isPending) {
    return <div>Loading data...</div>;
  }

  if (isError) {
    return (
      <span>anecdote service not available due to problems in server.</span>
    );
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Routes>
          <Route path="/" element={<AnecdoteList />} />
          <Route path="/create" element={<CreateNew />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
