//this component will display a single pokemon' detail
//name,img,& type
import React from "react";
import './PokeCard.css';

const PokeCard = ({id, name, type, base_experience}) => {
    //destructure props into individual variables 
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    //dynamically creates the url for the pokemon's img based on its ID
    
    return (
        <div className="PokeCard"> 
        <h2>{name}</h2> //display pokemon name
        <img src={imgSrc} alt={name}/> //display img 
        <p>Type: {type}</p> //display type
        <p>EXP: {base_experience}</p>//display base_experience

        
        
        </div>
    );
};
export default PokeCard;