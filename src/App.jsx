import { createHashRouter, RouterProvider } from 'react-router-dom';
import Pokedex from './pages/Pokedex';
import PokemonDetails from './pages/PokemonDetails';
import About from './pages/About';
import './App.css'

const router = createHashRouter([
  {
    path: "/",
    element: <Pokedex />,
  },
  {
    path: "/pokemon/:name", // :name is a dynamic parameter
    element: <PokemonDetails />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
