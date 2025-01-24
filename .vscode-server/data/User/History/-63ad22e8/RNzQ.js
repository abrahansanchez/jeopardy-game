// src/components/Pokedex.js
import React from 'react'; // Import React.
import PokeCard from './PokeCard'; // Import the PokeCard component.
import './Pokedex.css'; // Import optional CSS for styling.

const Pokedex = ({ pokemon }) => { // Destructure `pokemon` prop, an array of Pokémon objects.
  return (
    <div className="Pokedex"> {/* Apply CSS class for styling */}
      <h1>Pokedex</h1> {/* Heading for the component */}
      <div className="Pokedex-cards"> {/* Flex container for arranging cards */}
        {pokemon.map(p => (
          // Map through the `pokemon` array to create a PokeCard for each Pokémon.
          <PokeCard
            key={p.id} // Provide a unique key for React to efficiently render the list.
            id={p.id}
            name={p.name}
            type={p.type}
            base_experience={p.base_experience}
          />
        ))}
      </div>
    </div>
  );
};

// Default list of Pokémon
Pokedex.defaultProps = {
  pokemon: [
    { id: 4, name: 'Charmander', type: 'fire', base_experience: 62 },
    { id: 7, name: 'Squirtle', type: 'water', base_experience: 63 },
    { id: 11, name: 'Metapod', type: 'bug', base_experience: 72 },
    { id: 12, name: 'Butterfree', type: 'flying', base_experience: 178 },
    { id: 25, name: 'Pikachu', type: 'electric', base_experience: 112 },
    { id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95 },
    { id: 94, name: 'Gengar', type: 'poison', base_experience: 225 },
    { id: 133, name: 'Eevee', type: 'normal', base_experience: 65 },
  ]
};

export default Pokedex; // Make this component available to other files.
