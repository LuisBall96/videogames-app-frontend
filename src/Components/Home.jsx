import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getVideogames,
  filterDB,
  filterGenre,
  orderAlphabetic,
  orderRating,
} from "../Redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import estilos from "../Estilos/Home.module.css";
import Loading from "../Components/Loading";

export default function Home() {
  let dispatch = useDispatch();
  let videogameState = useSelector((state) => state.copiaVideogames);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  const [orden, setOrden] = useState("");
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [videogamesPorPagina, setVideogamesPorPagina] = useState(15);
  const ultimoIndice = paginaActual * videogamesPorPagina;
  const primerIndice = ultimoIndice - videogamesPorPagina;
  const currentVideogames = videogameState.slice(primerIndice, ultimoIndice);

  if (videogameState.length > 0 && loading) {
    setLoading(false);
  }

  const paginado = (pageNumbers) => {
    setPaginaActual(pageNumbers);
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
    setVideogamesPorPagina(15);
  }

  function handleFiltrarDB(e) {
    dispatch(filterDB(e.target.value));
  }

  function handleOrden(e) {
    e.preventDefault();
    dispatch(orderAlphabetic(e.target.value));
    setVideogamesPorPagina(15);
    setOrden(`Orden ${e.target.value}`);
  }

  function handleOrdenRating(e) {
    e.preventDefault();
    dispatch(orderRating(e.target.value));
    // setVideogamesPorPagina(1);
    setOrden(`Orden ${e.target.value}`);
  }

  function handleFiltrarGenero(e) {
    dispatch(filterGenre(e.target.value));
  }

  return (
    <div className={estilos.home}>
      <h1>Welcome hero, choose your destiny</h1>
      <nav className={estilos.select}>
        <Link to="/formulario">Create your own path</Link>
      </nav>

      <br />

      <span className={estilos.select}>
        <button onClick={(e) => handleClick(e)}> Reset</button>
      </span>

      <span className={estilos.select}>
        <select onChange={(e) => handleOrden(e)}>
          <option value="default">Name</option>
          <option value="ASC">A-Z</option>
          <option value="DES">Z-A</option>
        </select>
      </span>

      <span className={estilos.select}>
        <select onChange={(e) => handleOrdenRating(e)}>
          <option>Rating</option>
          <option value="MIN">Highest rating</option>
          <option value="MAX">Lower rating</option>
        </select>
      </span>

      <span className={estilos.select}>
        <select onChange={(e) => handleFiltrarGenero(e)}>
          <option value="default">Genres</option>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Indie">Indie</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Strategy">Strategy</option>
          <option value="Shooter">Shooter</option>
          <option value="Casual">Casual</option>
          <option value="Simulation">Simulation</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Platformer">Platformer</option>
          <option value="Massively Multiplayer">Massively Multiplayer</option>
          <option value="Sports">Sports</option>
          <option value="Fighting">Fighting</option>
          <option value="Family">Family</option>
          <option value="Board Games">Board Games</option>
          <option value="Educational">Fighting</option>
          <option value="Card">Card</option>
        </select>
      </span>

      <span className={estilos.select}>
        <select onChange={(e) => handleFiltrarDB(e)}>
          <option value="default">Origin</option>
          <option value="All">All Videogames</option>
          <option value="db">Created videogames</option>
          <option value="api">Existing videogames</option>
        </select>
      </span>

      <SearchBar setPaginaActual={setPaginaActual} />

      <Paginado
        videogamesPorPagina={videogamesPorPagina}
        stateVideogames={videogameState.length}
        paginado={paginado}
      />

      <div className={estilos.current}>
        {currentVideogames.length > 0 && !loading ? (
          currentVideogames &&
          currentVideogames.map((ele) => {
            return (
              <div key={ele.id}>
                <Link to={`/detail/${ele.id}`}>
                  <Card
                    className={estilos.current}
                    key={ele.id}
                    name={ele.name}
                    background_image={ele.background_image}
                    rating={ele.rating}
                    genres={ele.genres}
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
