import {  State } from "../interfaces/interfacesIndex";



export const initialState: State = {
  pokemons: [],
  favspokemons: [],
  getAllPokemons: () => {},
  loading: false,
  error: "",
  filters: {
    weight: 500,
    height: 500,
    types: new Set<string>(),
    search: "",
    sort: {
      by: '',  // 'weight' or 'height'
      direction: 'asc'  // 'asc' or 'desc'
    }
    
  },
  handleWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleTypeToggle: (type: string) => {},
  handleSortChange: (sortBy: string, direction: string) => {},
  dispatch: () => {}
};

export const pokemonsReducer = (state: State, action: any) => {
  switch (action.type) {
    case "GET_POKEMONS_SUCCESS":
      return { ...state, pokemons: action.payload, loading: false };
    case "GET_POKEMONS_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "GET_POKEMON_DETAILS_SUCCESS":
      return {
        ...state,
        pokemons: state.pokemons.map((pokemon) =>
          pokemon.name === action.payload.name ? action.payload : pokemon
        ),
      };
    case "ADD_FAV":
      return {
        ...state,
        favspokemons: [...state.favspokemons, action.payload],
      };

    case "REMOVE_FAV":
      return {
        ...state,
        favspokemons: state.favspokemons.filter((hero: any) => {
          return hero.id !== action.payload.id;
        }),
      };
    case "SET_WEIGHT":
      return {
        ...state,
        filters: { ...state.filters, weight: action.payload },
      };
    case "SET_HEIGHT":
      return {
        ...state,
        filters: { ...state.filters, height: action.payload },
      };
    case "TOGGLE_TYPE":
      const newTypes = new Set(state.filters.types);
      if (newTypes.has(action.payload)) {
        newTypes.delete(action.payload);
      } else {
        newTypes.add(action.payload);
      }
      return { ...state, filters: { ...state.filters, types: newTypes } };
      case "SET_SEARCH":
        return {
          ...state,
          filters: { ...state.filters, search: action.payload },
        };
        case "SET_TRUE":
          return {
            ...state,
            loading: true
          }
          case "SET_SORT":
            return {
              ...state,
              filters: {
                ...state.filters,
                sort: {
                  by: action.payload.by,
                  direction: action.payload.direction,
                }
              }
            };
    default:
      throw new Error(
        `No case for type ${action.payload} found in shopReducer.`
      );
  }
};
