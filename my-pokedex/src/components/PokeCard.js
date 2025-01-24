import React from 'react';
import './PokeCard.css'; 

const PokeCard = ({ pokemon }) => {
    const { id, name, type, image } = pokemon; 
  
    return (
      <div className="poke-card"> 
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>Type: {type}</p>
      </div>
    );
  };
  
  export default PokeCard;