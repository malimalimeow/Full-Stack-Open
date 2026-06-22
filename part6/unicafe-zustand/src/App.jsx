import { useState } from "react";
import Buttons from "./components/Buttons";
import Statistics from "./components/Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const buttonTools = { setGood, setBad, setNeutral };
  const stat = { good, bad, neutral };

  return (
    <>
      <h1>Unicafe</h1>
      <Buttons tools={buttonTools} />
      <Statistics stat={stat} />
    </>
  );
};

export default App;
