import { Pokemon } from "./interfacesIndex.tsx";

export type Filters = {
  weight: number;
  height: number;
  types: Set<string>;
  search: string;
  sort: {
    by: "weight" | "height";
    direction: "asc" | "desc";
  };
};

export type State = {
  pokemons: Pokemon[];
  favspokemons: Pokemon[];
  getAllPokemons: () => void;
  loading: boolean;
  error: string;
  filters: Filters;
  dispatch: (action: any) => void;
  handleWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTypeToggle: (type: string) => void;
  handleSortChange: (sortBy: string, direction: string) => void;
};
