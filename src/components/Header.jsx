import React from "react";
import "../styling/Header.css";

function Header({ searchName, selectName, searchAbilities, selectAbilities, filterPokemonList, pokemonList}) {
  const abilityOptions = filterPokemonList.reduce((abilities, pokemon) => {
    pokemon.abilities.forEach(ability => {
      if (!abilities.includes(ability)) {
        abilities.push(ability);
      }
    });
    return abilities;
  }, []);
  

  return (
    <div className="header">
    <h1>Desafío Pokedéx</h1>
    <div className="filters">
      <div className="search">
      <input className="searchName" type="text" placeholder="Buscar por nombre" value={searchName} onChange={selectName} />
      <select className="searchAbilities"  value={searchAbilities} onChange={selectAbilities}>
        <option>Filtrar por habilidad</option>
        {abilityOptions.map((ability, index) => (
          <option key={index} value={ability}>{ability}</option>
        ))}
      </select>
      </div>
      </div>

    </div>
  );
}

export default Header;