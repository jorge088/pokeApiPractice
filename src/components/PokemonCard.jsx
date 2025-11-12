import styles from "./Card.module.css";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className={styles.container}>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className={styles.image}
      />
      <h2 className={styles.pokemonName}>
        {pokemon.name}
      </h2>
      <p>
        <strong>ID:</strong> {pokemon.id}
      </p>
      <p>
        <strong>Altura:</strong> {pokemon.height / 10} m
      </p>
      <p>
        <strong>Peso:</strong> {pokemon.weight / 10} kg
      </p>
      <p>
        <strong>Tipo:</strong>{" "}
        {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>
    </div>
  );
}

export default PokemonCard;
