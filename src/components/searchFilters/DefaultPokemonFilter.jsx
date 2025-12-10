import { useState } from "react";

const DefaultPokemonFilter = ({ results, onFilterCallback }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    if (!checked) {
      const filteredResults = results.filter(
        (pokemon) => pokemon.is_default === !checked
      );
      onFilterCallback(filteredResults);
    } else {
      onFilterCallback(null);
    }
  };

  return (
    <>
      <label>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        Mostrar solo default
      </label>
    </>
  );
};

export default DefaultPokemonFilter;
