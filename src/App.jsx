import styles from "./App.module.css"
import { useState } from "react";
import axios from "axios";
import Card from "./components/Card";

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setPokemonData(null);
    if (!pokemonName.trim()) {
      setError("Por favor, ingresa un nombre de Pokémon.");
      return;
    }

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      setPokemonData(response.data);
    } catch (err) {
      setError("No se encontró ese Pokémon");
    }
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
      {pokemonData && <Card pokemon={pokemonData} />}
    </div>
  );
}

export default App;
