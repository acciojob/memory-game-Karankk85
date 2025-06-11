import React, { useState, useEffect } from "react";
import "./../styles/App.css";

const App = () => {
  const [level, setLevel] = useState(null);
  const [tiles, setTiles] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);

  const levelPairs = {
    easy: 4,
    normal: 8,
    hard: 16,
  };

  useEffect(() => {
    if (level) {
      const totalPairs = levelPairs[level];
      const values = [...Array(totalPairs).keys()].flatMap(i => [i, i]);
      const shuffled = values.sort(() => Math.random() - 0.5);
      setTiles(shuffled);
      setMatched([]);
      setFlipped([]);
      setAttempts(0);
    }
  }, [level]);

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts(a => a + 1);
      const [first, second] = newFlipped;
      if (tiles[first] === tiles[second]) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div>
      {/* Do not remove the main div */}
      <h1>Welcome!</h1>

      <div className="levels_container">
        <label htmlFor="easy">
          <input
            type="radio"
            id="easy"
            name="difficulty"
            onChange={() => setLevel("easy")}
          />
          Easy
        </label>

        <label htmlFor="normal">
          <input
            type="radio"
            id="normal"
            name="difficulty"
            onChange={() => setLevel("normal")}
          />
          Normal
        </label>

        <label htmlFor="hard">
          <input
            type="radio"
            id="hard"
            name="difficulty"
            onChange={() => setLevel("hard")}
          />
          Hard
        </label>
      </div>

      <div className="cells_container">
        {tiles.map((val, i) => (
          <div
            key={i}
            className={`tile ${flipped.includes(i) || matched.includes(i) ? "flipped" : ""}`}
            onClick={() => handleFlip(i)}
          >
            {(flipped.includes(i) || matched.includes(i)) ? val : ""}
          </div>
        ))}
      </div>

      {level && matched.length === tiles.length && (
        <div className="message">You solved it in {attempts} attempts!</div>
      )}
    </div>
  );
};

export default App;
