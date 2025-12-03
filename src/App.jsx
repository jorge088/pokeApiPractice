import styles from "./App.module.css"
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonResults from "./components/PokemonResults";

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonResults, setPokemonResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
      const fetchAllPokemons = async () => {
        try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0)}`
        );
        setPokemonData(response.data.results);
        } catch (err) {
          setError("No se pudo obtener información de los pokemones");
        }
      }
      fetchAllPokemons();
  },[]);

  const filterPokemonSearch = (search) => {
    const matches = pokemonData.filter((p) => {
      return p.name.toLowerCase().includes(search.toLowerCase());
    });
    return matches;
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    if (!pokemonName.trim()) {
      setError("Por favor, ingresa un nombre de Pokémon.");
      return;
    }
    const pokemonsMatches = filterPokemonSearch(pokemonName);
    const matchesData = await Promise.all(
      pokemonsMatches.map(m => axios.get(m.url).then(r => r.data))
    );
    setPokemonResults(matchesData);
  };

  return (
    <div
      className={styles.container}
    >
      <h1 className={styles.title}>
        PokeApi practice
      </h1>

      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          placeholder="Ingresa el nombre del Pokémon"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          className={styles.pokemonInput}
        />
        <button
          type="submit"
          className={styles.searchButton}
        >
          Buscar
        </button>
      </form>
      {error && <p className={styles.errorMsg}>{error}</p>}
      <PokemonResults pokemons = {pokemonResults}></PokemonResults>
    </div>
  );
}

export default App;
