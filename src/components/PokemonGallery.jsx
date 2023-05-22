import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styling/PokemonGallery.css";

function PokemonGallery() {
    /*     const [pokemonList, setPokemonList] = useState([]); */
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.pokemonList)

    useEffect(() => {
        console.log('%cSe montó el componente', 'color: pink');
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'SET_POKEMON_LIST', payload: data.results });
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
            const pokemonId = pokemon.url.split("/")[6];
            return (
              <div key={i} className="card">
                <div className="card-image">
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} alt={pokemon.name} />
                </div>
                <div>{pokemon.name}</div>
              </div>
            );
          })}
        </div>
      );
}

export default PokemonGallery;