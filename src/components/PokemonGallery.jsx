import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import Card from "./Card";
import "../styling/PokemonGallery.css";

function PokemonGallery() {
    /*     const [pokemonList, setPokemonList] = useState([]); */
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.pokemonList)
    const [searchName, setSearchName] = useState("");
    const [searchAbilities, setSearchAbilities] = useState([]);
    const [selectPokemon, setSelectPokemon] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log('%cSe montó el componente', 'color: blue');
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`)
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
    }, [dispatch, page]);

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
        let abilitiesMatches = searchAbilities.length === 0 || searchAbilities.some(ability => pokemon.abilities.includes(ability));

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

    const loadMore = () => {
        setPage(page + 1);
    };

    return (
        <div className="body">
      <Header
        searchName={searchName}
        selectName={selectName}
        searchAbilities={searchAbilities}
        selectAbilities={selectAbilities}
        filterPokemonList={filterPokemonList}
      />
      <div className="boxPokemonRemove">
       <select className="pokemonRemove"
        value={selectPokemonToRemove}
        onChange={selectPokemonToRemove}
      >
                <option>Seleccionar pokemón</option>
        {filterPokemonList.map((pokemon) => (
          <option key={pokemon.id} value={pokemon.id}>
            {pokemon.name}
          </option>
        ))}
      </select>
      <button className="buttonRemove" onClick={PokemonRemove}>Eliminar Pokémon</button>
      </div>
      <div className="pokemon-gallery">
            {filterPokemonList.length === 0 && <p>Cargando</p>}
            {filterPokemonList.map((pokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} />
            ))}
            </div>
            <button onClick={loadMore}>Siguiente página</button>
        </div>
    );
}


export default PokemonGallery;