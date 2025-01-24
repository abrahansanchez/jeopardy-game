//this component will display a single pokemon' detail
//name,img,& type
import React from "react";
import './PokeCard.css';

const PokeCard = ({id, name, type, base_experience}) => {
    //destructure props into individual variables 
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    //dynamically creates the url for the pokemon's img based on its ID
    
}