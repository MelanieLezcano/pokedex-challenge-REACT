import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
        <div>
            {pokemonList.length === 0 && <p>Cargando</p>}
            {
                pokemonList.map((pokemon, i) => {
                    return (
                        <div key={i}>
                            <div>{pokemon.name}</div>
                        </div>
                    )
                })
            }

        </div>
    );
}

export default PokemonGallery;