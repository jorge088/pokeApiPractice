import styles from "./App.module.css"
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonResults from "./components/PokemonResults";
import PokemonSearcher from "./components/PokemonSearcher";

const App = () => {
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

  const handlePokemonSearch = (results, error) => {
    setError(error);
    setPokemonResults(results);
  };

  return (
    <div
      className={styles.container}
    >
      <h1 className={styles.title}>
        PokeApi practice
      </h1>
      <PokemonSearcher pokemonData = {pokemonData} onSearchCallback = {handlePokemonSearch} ></PokemonSearcher>
      {error && <p className={styles.errorMsg}>{error}</p>}
      <PokemonResults pokemons = {pokemonResults}></PokemonResults>
    </div>
  );
}

export default App;
