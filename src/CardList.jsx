import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      const response = await fetch("/data.json");
      const data = await response.json();
      setCards(data);
    }
    fetchCards();
    // fetch('/data.json')
    //   .then((response) => response.json())
    //   .then((data) => setCards(data));
  }, []);

  return (
    <div>
      <h1>Card List</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <h2>{card.name}</h2>
            <Link to={`/cards/${card.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
