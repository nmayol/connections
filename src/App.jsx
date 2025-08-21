import React, { useState } from "react";
import './App.css';

const words = [
  { text: "Conservatori", category: "al Liceu" },
  { text: "Bomba", category: "al Liceu" },
  { text: "Òpera", category: "al Liceu" },
  { text: "Incendi", category: "al Liceu" },
  { text: "La Rosalia", category: "el 25 de setembre" },
  { text: "Will Smith", category: "el 25 de setembre"},
  { text: "Pedro Almodóvar", category: "el 25 de setembre" },
  { text: "Adolfo Suárez", category: "el 25 de setembre" },
  { text: "Ca n'Ensenya", category: "La Guineueta" },
  { text: "Llucmajor", category: "La Guineueta" },
  { text: "Valldaura", category: "La Guineueta" },
  { text: "Karl Marx", category: "La Guineueta" },
  { text: "Viva", category: "Astuta" },
  { text: "Sagaç", category: "Astuta" },
  { text: "Espavilada", category: "Astuta" },
  { text: "Desacom- plexada", category: "Astuta" }
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const ConnectionsGame = () => {
  const [shuffledWords, setShuffledWords] = useState(shuffleArray(words));
  const [selectedWords, setSelectedWords] = useState([]);
  const [foundCategories, setFoundCategories] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);

  const handleSelect = (word) => {
    setSelectedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : prev.length < 4 ? [...prev, word] : prev
    );
  };

  const checkSelection = () => {
    if (selectedWords.length === 4) {
      const category = selectedWords[0].category;
      if (selectedWords.every((word) => word.category === category)) {
        const newFound = [...foundCategories, category];
        setFoundCategories(newFound);
        setShuffledWords((prev) => prev.filter((word) => !selectedWords.includes(word)));
        if (newFound.length === 4) {
          setGameComplete(true);
        }
      }
      setSelectedWords([]);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Connexions</h1>
      <h4>Seràs capaç de trobar el teu regal?</h4>

      <div className="grid">
        {shuffledWords.map((word) => (
          <div
            key={word.text}
            onClick={() => handleSelect(word)}
            className={`word-card ${selectedWords.includes(word) ? "selected" : ""}`}
          >
            {word.text}
          </div>
        ))}
      </div>

      <button
        onClick={checkSelection}
        className="submit-button"
      >
        Submit
      </button>

      <div className="categories">
        <h2>Trobat:</h2>
        <ul className="category-list">
          {foundCategories.map((cat, index) => (
            <li key={index}>{cat}</li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {gameComplete && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🎉 Val per dos entrades a l'òpera: La Guineueta Astuta (Leoš Janáček)</h2>
            <h3>al Liceu. 25 de setembre a les 19:30h</h3>
            <p>Per molts anys papa!!!</p>
            <img src="20240821_130506.jpg" alt="Regal" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionsGame;
