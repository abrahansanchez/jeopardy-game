import React from 'react';

function Pokecard({ name, id, type, base_experience }) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="pokecard">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>Type: {type}</p>
      <p>Base Experience: {base_experience}</p>
    </div>
  );
}

export default Pokecard;
