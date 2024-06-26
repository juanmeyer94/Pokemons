import { createContext, useCallback, useReducer, useEffect, useRef } from "react";
import { initialState, pokemonsReducer } from "./pokemonsReducer";
import { getPokemonInfo, getPokemons} from "../services/Pokemons/pokemonServices";


const PokemonsContext = createContext(initialState);


export const PokemonsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(pokemonsReducer, initialState);
  const executedRef = useRef(false);

  const getAllPokemons = useCallback(async () => {
    try {
      const data = await getPokemons();
      dispatch({ type: "GET_POKEMONS_SUCCESS", payload: data, loading: false });
      const individualPokemonData = data.map(
        async (pokemon: { name: string }) => {
          const individualData = await getPokemonInfo(pokemon.name);
          dispatch({
            type: "GET_POKEMON_DETAILS_SUCCESS",
            payload: individualData,
          });
        }
      );
     setTimeout(() => {
      dispatch({
        type: "SET_TRUE"
      })
     }, 2500);

      await Promise.all(individualPokemonData);
    } catch (error) {
      dispatch({ type: "GET_POKEMONS_ERROR", payload: error });
    }
  }, []);




  //filters

  
  const handleWeightChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_WEIGHT', payload: Number(e.target.value) });
  };

  const handleHeightChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_HEIGHT', payload: Number(e.target.value) });
  };

  const handleSearchChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const handleTypeToggle = (type:string) => {
    dispatch({ type: 'TOGGLE_TYPE', payload: type });
  };

  const handleSortChange = (sortBy: string, direction: string) => {
    dispatch({ type: 'SET_SORT', payload: { by: sortBy, direction: direction } });
  };

  useEffect(() => {
    if (!executedRef.current) {
      getAllPokemons();
      executedRef.current = true;
    }
  }, [getAllPokemons]);
  return (
    <PokemonsContext.Provider value={{ ...state, getAllPokemons, dispatch, handleWeightChange, handleHeightChange, handleSearchChange, handleTypeToggle, handleSortChange }}>
      {children}
    </PokemonsContext.Provider>
  );
};

export default PokemonsContext;
