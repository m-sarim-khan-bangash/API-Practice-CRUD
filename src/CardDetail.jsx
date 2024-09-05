import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CardDetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    async function fetchCard() {
      const response = await fetch('/data.json');
      const data = await response.json();
      const foundCard = data.find((card) => card.id === parseInt(id, 10));
      setCard(foundCard);
    }
    fetchCard();
    // fetch('/data.json')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const foundCard = data.find((card) => card.id === parseInt(id, 10));
    //     setCard(foundCard);
    //   });
  }, [id]);

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{card.name}</h1>
      <p>{card.description}</p>
    </div>
  );
};

export default CardDetail;
