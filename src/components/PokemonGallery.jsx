import React, { useEffect, useState } from "react";

function PokemonGallery() {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        console.log('%cSe montó el componente', 'color: pink');
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then(response => response.json())
            .then(data => {
                setPokemonList(data.results);
            })
            .catch(error => console.error(error));
    }, []);

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