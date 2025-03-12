import React, { useState } from "react";
import './App.css';

const words = [
  { text: "Del dia", category: "Menú" },
  { text: "Repertori", category: "Menú" },
  { text: "Llista", category: "Menú" },
  { text: "Carta", category: "Menú" },
  { text: "Tast", category: "Degustació" },
  { text: "Deleïtament", category: "Degustació" },
  { text: "Delectació", category: "Degustació" },
  { text: "Assaboriment", category: "Degustació" },
  { text: "Cafè", category: "Doble" },
  { text: "Pas", category: "Doble" },
  { text: "Agent", category: "Doble" },
  { text: "capa", category: "Doble" },
  { text: "avinentesa", category: "Saó" },
  { text: "ocasió", category: "Saó" },
  { text: "oportunitat", category: "Saó" },
  { text: "tanda", category: "Saó" }
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const ConnectionsGame = () => {
  const [shuffledWords, setShuffledWords] = useState(shuffleArray(words));
  const [selectedWords, setSelectedWords] = useState([]);
  const [foundCategories, setFoundCategories] = useState([]);

  const handleSelect = (word) => {
    setSelectedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : prev.length < 4 ? [...prev, word] : prev
    );
  };

  const checkSelection = () => {
    if (selectedWords.length === 4) {
      const category = selectedWords[0].category;
      if (selectedWords.every((word) => word.category === category)) {
        setFoundCategories((prev) => [...prev, category]);
        setShuffledWords((prev) => prev.filter((word) => !selectedWords.includes(word)));
      }
      setSelectedWords([]);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Connections</h1>
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
        <h2>Found Categories</h2>
        <ul className="category-list">
          {foundCategories.map((cat, index) => (
            <li key={index}>{cat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConnectionsGame;