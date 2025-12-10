import styles from "./PokemonSearcher.module.css";
import { useState } from "react";
import axios from "axios";
import SearchFiltersContainer from "./SearchFiltersContainer";

const PokemonSearcher = ({
  pokemonData,
  onSearchCallback,
  onResultsFiltered,
}) => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonResults, setPokemonResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const filterPokemonSearch = (search) => {
    const matches = pokemonData.filter((p) => {
      return p.name.toLowerCase().includes(search.toLowerCase());
    });
    return matches;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let error = "";
    if (!pokemonName.trim()) {
      error = "Por favor, ingresa un nombre de Pokémon.";
      setPokemonResults([]);
      onSearchCallback([], error);
      return;
    }
    const pokemonsMatches = filterPokemonSearch(pokemonName);
    const matchesData = await Promise.all(
      pokemonsMatches.map((m) => axios.get(m.url).then((r) => r.data))
    );
    setPokemonResults(matchesData);
    onSearchCallback(matchesData, error);
  };

  const handleResultFilter = (resultsFiltered) => {
    if (resultsFiltered) {
      setFilteredResults(resultsFiltered);
      onResultsFiltered(resultsFiltered);
    } else {
      setFilteredResults([]);
      onResultsFiltered(pokemonResults);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          placeholder="Ingresa el nombre del Pokémon"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          className={styles.pokemonInput}
        />
        <button type="submit" className={styles.searchButton}>
          Buscar
        </button>
        {pokemonResults.length > 0 && (
          <SearchFiltersContainer
            results={pokemonResults}
            onFilterCallback={handleResultFilter}
          ></SearchFiltersContainer>
        )}
      </form>
    </>
  );
};

export default PokemonSearcher;
