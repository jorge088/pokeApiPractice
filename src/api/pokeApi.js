import axios from "axios";

export const getAllPokemonList = async () => {
    try {
        const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0)}`        
        );
        return response.data.results;
    } catch (err) {
      return null;
    }
}