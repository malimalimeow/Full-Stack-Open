const Buttons = ({ tools }) => {
  const { setGood, setBad, setNeutral } = tools;

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood((prev) => prev + 1)}>good</button>
      <button onClick={() => setNeutral((prev) => prev + 1)}>neutral</button>
      <button onClick={() => setBad((prev) => prev + 1)}>bad</button>
    </div>
  );
};

export default Buttons;
