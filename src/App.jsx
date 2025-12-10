import styles from "./App.module.css"
import { useState, useEffect } from "react";
import PokemonResults from "./components/PokemonResults";
import PokemonSearcher from "./components/PokemonSearcher";
import { getAllPokemonList } from "./api/pokeApi";

const App = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonResults, setPokemonResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
    const data = await getAllPokemonList();
    if (data) {
      setPokemonData(data);
    } else {
      setError("No se pudo obtener información de los pokemones");
    }
    };
    fetchData();
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
