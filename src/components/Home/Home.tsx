import usePokemonContext from "../../Utils/usePokemonContext";
import PokemonCard from "../PokemonsCards/pokemonCard";
import Sidebar from "../SideBar/SideBar";
import { usePagination } from "../../Utils/Paginado";


export function Home() {
  const { pokemons, loading, error, filters } = usePokemonContext();
  const { currentPage, postsPerPage, currentPosts, nextPage, prevPage } = usePagination();

  if (!loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

    const typeNames = pokemons.map(pokemon => {
      return pokemon.types.map(typeInfo => typeInfo.type.name);
    });
    const allTypeNames = typeNames.flat();
      const uniqueTypeNames = [...new Set(allTypeNames)]; 

  return (
    <div className="flex">
      <Sidebar filters={filters}  uniqueTypeNames={uniqueTypeNames}/>
      <div className="container mx-auto ml-[35vh] mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentPosts.map((pokemon: any) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
        <div className="flex justify-center mt-4 mb-4 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(pokemons.length / postsPerPage)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
  
}
