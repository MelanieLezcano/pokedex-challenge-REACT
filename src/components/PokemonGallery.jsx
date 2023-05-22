import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styling/PokemonGallery.css";

function PokemonGallery() {
    /*     const [pokemonList, setPokemonList] = useState([]); */
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.pokemonList)

    useEffect(() => {
        console.log('%cSe montó el componente', 'color: red');
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then(response => response.json())
            .then(data => {
                const pokemonRequests = data.results.map(pokemon => fetch(pokemon.url).then(response => response.json()));
                Promise.all(pokemonRequests)
                    .then(pokemonData => {
                        const pokemonListWithDetails = pokemonData.map(pokemon => ({
                            id: pokemon.id,
                            name: pokemon.name,
                            weight: pokemon.weight,
                            abilities: pokemon.abilities.map(ability => ability.ability.name),
                            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
                        }));
                        dispatch({ type: 'SET_POKEMON_LIST', payload: pokemonListWithDetails });
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }, [dispatch]);

    useEffect(() => {
        console.log('%cSe actualizó el componente', 'color: pink');
    }, [pokemonList])

    return (
        <div className="pokemon-gallery">
            {pokemonList.length === 0 && <p>Cargando</p>}
            {pokemonList.map((pokemon, i) => {
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