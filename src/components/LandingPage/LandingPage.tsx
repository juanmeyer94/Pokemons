import { Link } from "react-router-dom";
import usePokemonsContext from "../../Utils/usePokemonContext";

export const LandingPage = () => {
  const { loading } = usePokemonsContext();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow h-3/4 flex justify-center bg-stone-500 bg-[center_top_2rem] items-center  bg-hero-pattern bg-no-repeat animate-pulse animate-infinite "></div>
      <div className="bg-blue-400 h-1/2 text-white flex-grow flex justify-center items-center opacity-80"></div>
      <div className="absolute top-[60vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140vh] h-[35vh] bg-white rounded-lg shadow-md">
        <div className="p-8 space-x-3 space-y-8 text-center">
          <h1 className="text-5xl font-extrabold">
            <span className="bg-gradient-to-r from-yellow-300 to-blue-400 bg-clip-text text-transparent">
              Bienvenido a nuestro mundo Pokémon!
            </span>
          </h1>
          <br />
          <div className="flex items-center justify-center">
            <p className="text-3xl">
              Exploremos sus pokemons y elijamos nuestros favoritos!
            </p>
          </div>
          <div className="flex items-center justify-center">
            {!loading ? (
              <p>¡Cargando 1300 pokemons!</p>
            ) : (
              <Link
                to="/Test"
                className="bg-gray-500 hover:bg-red-600 text-white font-bold p-4 rounded-xl"
              >
                Ver Pokemons
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
