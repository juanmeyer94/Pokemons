import axios from 'axios';
import { Pokemon } from '../../interfaces/pokemonInterface';

export const getPokemons = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1400&offset=0');
    return response.data.results
  } catch (error) {
    console.error('Error fetching heroes:', error);
  }
};



export const getPokemonInfo = async (name: string): Promise<Pokemon | null> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = response.data;

    const transformedData: Pokemon = {
      name: data.name,
      abilities: data.abilities,
      base_experience: data.base_experience,
      height: data.height,
      weight: data.weight,
      id: data.id,
      types: data.types,
      sprites: {
        other: {
          "official-artwork": {
            front_default: data.sprites.other['official-artwork'].front_default,
          },
          "showdown": {
            front_default: data.sprites.other.showdown?.front_default || '',
          },
        },
      },
      stats: data.stats,
    };

    return transformedData;
  } catch (error) {
    console.error(`Error fetching details for ${name}:`, error);
    return null;
  }
};

