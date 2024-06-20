import { useContext } from "react";
import PokemonsContext from "../PokemonsContext/pokemonsActions";

const usePokemonsContext = () => {
  const context = useContext(PokemonsContext);

  if (!context) {
    throw new Error("useHerosContext must be used within a PokemonsProvider");
    
  }

  return context;
};

export default usePokemonsContext;
