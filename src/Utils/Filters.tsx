import { useMemo } from 'react';
import usePokemonsContext from "./usePokemonContext";

export const useFilteredPokemons = () => {
  const { pokemons, filters } = usePokemonsContext();

  const sortedPokemons = useMemo(() => {
    let sortedList = [...pokemons];

    if (filters.sort.by) {
      sortedList.sort((a, b) => {
        const field: 'weight' | 'height' = filters.sort.by;
        const aField = a[field];
        const bField = b[field];

        if (filters.sort.direction === 'asc') {
          return aField - bField;
        } else {
          return bField - aField;
        }
      });
    }

    return sortedList;
  }, [pokemons, filters.sort]);

  return sortedPokemons.filter((pokemon) => {
    const weightMatch = pokemon.weight <= filters.weight;
    const heightMatch = pokemon.height <= filters.height / 10;
    const typeMatch = filters.types.size === 0 || pokemon.types.some((typeInfo) => filters.types.has(typeInfo.type.name));
    const searchMatch = pokemon.name.toLowerCase().includes(filters.search.toLowerCase());

    return weightMatch && heightMatch && typeMatch && searchMatch;
  });
};
