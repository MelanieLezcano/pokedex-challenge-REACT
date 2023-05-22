import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styling/PokemonGallery.css";

function PokemonGallery() {
    /*     const [pokemonList, setPokemonList] = useState([]); */
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.pokemonList)
    const [searchName, setSearchName] = useState("");
    const [searchAbilities, setSearchAbilities] = useState([]);
    const [selectPokemon, setSelectPokemon] = useState([]);

    useEffect(() => {
        console.log('%cSe montó el componente', 'color: blue');
        fetch('https://pokeapi.co/api/v2/pokemon?limit=200')
            .then(response => response.json())
            .then(data => {
                const pokemonRequests = data.results.map(pokemon => fetch(pokemon.url).then(response => response.json()));
                Promise.all(pokemonRequests)
                    .then(pokemonData => {
                        const pokemonListDetails = pokemonData.map(pokemon => ({
                            id: pokemon.id,
                            name: pokemon.name,
                            weight: pokemon.weight,
                            abilities: pokemon.abilities.map(ability => ability.ability.name),
                            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
                        }));
                        dispatch({ type: 'SET_POKEMON_LIST', payload: pokemonListDetails });
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }, [dispatch]);

    useEffect(() => {
        console.log('%cSe actualizó el componente', 'color: blue');
    }, [pokemonList])

    const selectName = event => {
        setSearchName(event.target.value);
    }

    const selectAbilities = event => {
        const selectedAbilities = Array.from(event.target.selectedOptions, option => option.value);
    setSearchAbilities(selectedAbilities);
};

const filterPokemonList = pokemonList.filter(pokemon => {
    let nameMatches = searchName === "" || pokemon.name.toLowerCase().includes(searchName.toLowerCase());
    let abilitiesMatches = searchAbilities.length === 0 ||  searchAbilities.some(ability => pokemon.abilities.includes(ability));
    
    // Buscar solo por nombre
    if (searchName !== "" && searchAbilities.length === 0) {
        return nameMatches;
    }
    
    // Buscar solo por habilidades
    if (searchName === "" && searchAbilities.length > 0) {
        return abilitiesMatches;
    }
    
    // Buscar por nombre y habilidades
    return nameMatches && abilitiesMatches;
});
const abilityOptions = pokemonList.reduce((abilities, pokemon) => {
    pokemon.abilities.forEach(ability => {
      if (!abilities.includes(ability)) {
        abilities.push(ability);
      }
    });
    return abilities;
  }, []);


  const selectPokemonToRemove = (event) => {
    const selectPokemonIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectPokemon(selectPokemonIds);
  };

  const PokemonRemove = () => {
    const updatedPokemonList = pokemonList.filter(
      (pokemon) => !selectPokemon.includes(pokemon.id.toString())
    );
    dispatch({ type: "SET_POKEMON_LIST", payload: updatedPokemonList });
    setSelectPokemon([]);
  };

    return (
        <div className="pokemon-gallery">
      <div className="filters">
        <input type="text" placeholder="Buscar por nombre" value={searchName} onChange={selectName} />
        <select multiple value={searchAbilities} onChange={selectAbilities}>
          {abilityOptions.map((ability, index) => (
            <option key={index} value={ability}>{ability}</option>
          ))}
        </select>
        <select
          multiple
          value={selectPokemon}
          onChange={selectPokemonToRemove}
        >
          {filterPokemonList.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.id}>
              {pokemon.name}
            </option>
          ))}
        </select>
        <button onClick={PokemonRemove}>Eliminar Pokémon</button>
            </div>
            {filterPokemonList.length === 0 && <p>Cargando</p>}
            {filterPokemonList.map((pokemon) => {
                /* console.log(pokemonList); */
                return (
                    <div key={pokemon.id} className="card">
                        <div className="card-image">
                            <img src={pokemon.imageUrl} alt={pokemon.name} />
                        </div>
                        <div>{pokemon.name}</div>
                        <div>Weight: {pokemon.weight}</div>
                        {<div className="pokemon-abilities">
                            <h4>Abilities:</h4>
                            <ul>
                                {pokemon.abilities.map((ability, index) => (
                                    <li key={index}>{ability}</li>
                                ))}
                            </ul>
                        </div>}
                    </div>
                );
            })}
        </div>
    );
};

export default PokemonGallery;