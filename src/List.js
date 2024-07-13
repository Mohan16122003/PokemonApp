
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tilt from 'react-parallax-tilt';
import './List.css';


const List = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        const pokemonData = await Promise.all(response.data.results.map(async (p) => {
          const pokemonDetails = await axios.get(p.url);
          return pokemonDetails.data;
        }));
        setPokemon(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPokemon = pokemon.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-list">
      <h1>Pokemon List</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
        
      />
      
      <div className="cards-container">
        {filteredPokemon.map(p => (
          <Tilt className="card" key={p.name} perspective={500}>
            <div>
              <img src={p.sprites.front_default} alt={p.name} />
              <h2>{p.name}</h2>
            </div>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

export default List;
