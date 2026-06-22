import { useReviewAction } from "./store";
const Buttons = () => {
  const { incrementGood, incrementBad, incrementNeu } = useReviewAction();

  return (
    <div>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeu}>neutral</button>
      <button onClick={incrementBad}>bad</button>
    </div>
  );
};

export default Buttons;
