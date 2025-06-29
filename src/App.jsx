import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const Card = ({ title, description }) => {
  const [hasLiked, setHasLiked] = useState([false]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`${title} has been liked`);
  }, [hasLiked, title]);

  return (
    <div
      className="card"
      onClick={() => setCount((prevCount) => prevCount + 1)}
    >
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <button onClick={() => [setHasLiked((prevState) => !prevState)]}>
        {count} {hasLiked ? "Like" : "Unlike"}
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h2>Movies</h2>
      <div className="card-container">
        <Card
          title="Inception"
          description="A mind-bending thriller by Christopher Nolan."
        />
        <Card
          title="The Matrix"
          description="A sci-fi classic that questions reality."
        />
        <Card
          title="Interstellar"
          description="A space epic that explores love and sacrifice."
        />
      </div>
    </div>
  );
};

export default App;
