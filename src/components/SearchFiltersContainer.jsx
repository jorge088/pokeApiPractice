import DefaultPokemonFilter from "./searchFilters/DefaultPokemonFilter";

const SearchFiltersContainer = ({ results, onFilterCallback }) => {
  return (
    <>
      <div>
        <DefaultPokemonFilter
          results={results}
          onFilterCallback={onFilterCallback}
        ></DefaultPokemonFilter>
      </div>
    </>
  );
};

export default SearchFiltersContainer;
