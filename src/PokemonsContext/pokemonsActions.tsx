import {
  createContext,
  useCallback,
  useReducer,
  useEffect,
  useRef,
} from "react";
import { initialState, pokemonsReducer } from "./pokemonsReducer";
import {
  getPokemonInfo,
  getPokemons,
} from "../services/Pokemons/pokemonServices";

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
      console.log("Fetching all pokemons...");
      const data = await getPokemons();
      dispatch({ type: "GET_POKEMONS_SUCCESS", payload: data, loading: false });
      console.log("Pokemons fetched:", data.length);
      const loadInBatches = async (batchSize: number, delay: number) => {
        for (let i = 0; i < data.length; i += batchSize) {
          const batch = data.slice(i, i + batchSize);
          console.log(`Loading batch from index ${i} to ${i + batchSize}`);
          await Promise.all(
            batch.map(async (pokemon: { name: string }) => {
              const individualData = await getPokemonInfo(pokemon.name);
              dispatch({
                type: "GET_POKEMON_DETAILS_SUCCESS",
                payload: individualData,
              });
            })
          );
  
          console.log(`Batch from index ${i} to ${i + batchSize} loaded`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        console.log("All batches loaded. Dispatching SET_TRUE...");
        dispatch({ type: "SET_TRUE" });
      };
  
      loadInBatches(250, 200);
    } catch (error) {
      console.error("Error in getAllPokemons:", error);
      dispatch({ type: "GET_POKEMONS_ERROR", payload: error });
    }
  }, []);
  

  //filters

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_WEIGHT", payload: Number(e.target.value) });
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_HEIGHT", payload: Number(e.target.value) });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH", payload: e.target.value });
  };

  const handleTypeToggle = (type: string) => {
    dispatch({ type: "TOGGLE_TYPE", payload: type });
  };

  const handleSortChange = (sortBy: string, direction: string) => {
    dispatch({
      type: "SET_SORT",
      payload: { by: sortBy, direction: direction },
    });
  };

  useEffect(() => {
    if (!executedRef.current) {
      getAllPokemons();
      executedRef.current = true;
    }
  }, [getAllPokemons]);
  return (
    <PokemonsContext.Provider
      value={{
        ...state,
        getAllPokemons,
        dispatch,
        handleWeightChange,
        handleHeightChange,
        handleSearchChange,
        handleTypeToggle,
        handleSortChange,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};

export default PokemonsContext;
