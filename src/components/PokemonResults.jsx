import styles from "./PokemonResults.module.css";
import PokemonCard from "./PokemonCard";

const PokemonResults = ({ pokemons }) => {
  return (
    <>
        <div>
            <h3>
                {pokemons.length ? `Resultados encontrado ${pokemons.length}` : ''}
            </h3>
        </div>
        <div className={styles.resultsContainer}>
            {pokemons.map(pokemon => (
            <PokemonCard pokemon={pokemon} key={pokemon.id}></PokemonCard>
            ))}
        </div>
    </>
  );
}

export default PokemonResults;