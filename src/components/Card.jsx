import React from "react";
import "../styling/Card.css";

function Card({ pokemon }) {
  return (
    <div className="card">
      <div className="cardImagePosition">
        <div className="imagePokemon">
          <div className="pokemon">
        <img src={pokemon.imageUrl} alt={pokemon.name} />
        </div>
        </div>
      </div>
      <div className="name">{pokemon.name}</div>
      <div className="weight">Peso: {pokemon.weight}</div>
      <div className="pokemonAbilities">
        <h4>Habilidades:</h4>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>-{ability}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Card;