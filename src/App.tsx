import { LandingPage } from "./components/LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { PokemonsProvider } from "./PokemonsContext/pokemonsActions";
function App() {
  return (
    <PokemonsProvider>
    <Routes>
     <Route path="/" element={<LandingPage/>} />
     <Route path="/Test" element={<Home/>} />
     </Routes>
    </PokemonsProvider>
  );
}

export default App;
