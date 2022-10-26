import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, createVideogame } from "../Redux/actions";
import { useHistory, Link } from "react-router-dom";
import estilos from "../Estilos/Formulario.module.css";

export default function Formulario() {
  let dispatch = useDispatch();
  let history = useHistory();
  let estadoGeneros = useSelector((state) => state.generos);

  const [error, setError] = useState({
    name: "El nombre es necesario",
  });
  const [videogames, setVideogames] = useState({
    name: "",
    description: "",
    released: "",
    background_image: "",
    rating: 0,
    platform: [],
    genres: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(createVideogame());
  }, [dispatch]);

  function handleChangeInput(e) {
    setVideogames({
      ...videogames,
      [e.target.name]: e.target.value,
    });
    setError(
      validacion({
        ...videogames,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleElegirGenero(e) {
    if (videogames.genres.includes(e.target.value)) {
      return;
    } else {
      setVideogames({
        ...videogames,
        genres: [...videogames.genres, e.target.value],
      });
    }
  }

  function handleDeleteGenero(e) {
    const filtrado = videogames.genres.filter(
      (ele) => ele !== e.target.innerHTML
    );
    setVideogames({
      ...videogames,
      genres: filtrado,
    });
  }

  function handleElegirPlataforma(e) {
    if (videogames.platform.includes(e.target.value)) {
      return;
    } else {
      setVideogames({
        ...videogames,
        platform: [...videogames.platform, e.target.value],
      });
    }
  }

  function handleDeletePlataformas(e) {
    const filtrado = videogames.platform.filter(
      (ele) => ele !== e.target.innerHTML
    );
    setVideogames({
      ...videogames,
      platform: filtrado,
    });
  }

  function handleCrearVideojuego(e) {
    // if (Object.keys(error).length === 0) {
    //   alert('Rellena todos los espacios en blanco')
    // }
    // else{
    e.preventDefault();
    const videojuegoFinal = {
      ...videogames,
    };
    dispatch(createVideogame(videojuegoFinal));
    alert("Videojuego creado con exito!");
    setTimeout(() => {
      history.push("/home");
    }, 1000);
  }

  function validacion(videogames) {
    let error = {};
    let verificarQueNoContNumero = /[1-9]/;
    let isAdate = /^(0[1-9]|[12][0-9]|3[01])-(0[1-2]|1[0-2])-\d{4}-$/;
    let isImage = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    let isURL =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    if (videogames.name.length === 0)
      error.name = "Debes colocar un nombre a tu videojuego";
    if (videogames.name.length > 30)
      error.name = "Tiene que tener un maximo de 30 caracteres";
    if (verificarQueNoContNumero.test(videogames.name))
      error.name = "Escribe solo texto";

    if (videogames.description.length === 0)
      error.description = "Debes colocar una descripción a tu videojuego";
    if (videogames.description.length > 100)
      error.description = "Tiene que tener un maximo de 100 caracteres";

    if (isAdate.test(videogames.released))
      error.released = "Debes seguir el formato de fecha";

    if (!isURL.test(videogames.background_image))
      error.background_image =
        "Debes ingresar una ruta correcta como http o htpps";
    if (!isImage.test(videogames.background_image))
      error.background_image = "Debes colocar un link formato jpg, png o gif";

    if (videogames.rating.length === 0)
      error.rating = "Debes añadir un rating a tu videojuego ";

    if (videogames.platform.length === 0)
      error.platform =
        "Debes colocar por lo menos una plataforma en tu videojuego";

    if (videogames.genres.length === 0)
      error.genres = "Debes colocar por lo menos un género a tu videojuego";

    return error;
  }

  return (
    <div className={estilos.formulario}>
      <h2>Create your own path</h2>

      <form>
        <div>
          <label>
            Name:
            <br />
            <input
              type="text"
              name="name"
              value={videogames.name}
              placeholder="Write a name..."
              onChange={(e) => handleChangeInput(e)}
            />
            <br />
            {error.name && <span style={{ color: "red" }}>{error.name}</span>}
          </label>
        </div>

        <div className={estilos.description}>
          <label>
            Description:
            <br />
            <input
              type="text"
              name="description"
              value={videogames.description}
              placeholder="Write a description..."
              onChange={(e) => handleChangeInput(e)}
              size="35"
            />
            <br />
            {error.description && (
              <span style={{ color: "red" }}>{error.description}</span>
            )}
          </label>
        </div>

        <div>
          <label>
            Released:
            <br />
            <input
              type="date"
              min="1970-01-01"
              max="2026-12-31"
              name="released"
              value={videogames.released}
              onChange={(e) => handleChangeInput(e)}
            />
            <br />
            {error.released && (
              <span style={{ color: "red" }}>{error.released}</span>
            )}
          </label>
        </div>

        <div>
          <label>
            Image:
            <br />
            <input
              type="text"
              name="background_image"
              placeholder="Write a valid url"
              value={videogames.background_image}
              onChange={(e) => handleChangeInput(e)}
            />
            <br />
            {error.background_image && (
              <span style={{ color: "red" }}>{error.background_image}</span>
            )}
          </label>
        </div>

        <div>
          <label>
            Rating:
            <br />
            <input
              type="number"
              name="rating"
              step="0.1"
              min="1"
              max="5"
              value={videogames.rating}
              onChange={(e) => handleChangeInput(e)}
            />
            <br />
            {error.rating && (
              <span style={{ color: "red" }}>{error.rating}</span>
            )}
          </label>
        </div>

        <span className={estilos.plataforma}>
          <select onChange={(e) => handleElegirPlataforma(e)}>
            <option value="default">Platform</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="XBOX">XBOX</option>
            <option value="iOS">iOS</option>
            <option value="Apple Macintosh">Apple Macintosh</option>
            <option value="Linux">Linux</option>
            <option value="Nintendo">Nintendo</option>
            <option value="Atari">Atari</option>
            <option value="Commodore / Amiga">Commodore / Amiga</option>
            <option value="Neo Geo">Neo Geo</option>
            <option value="Web">Web</option>
          </select>
          <br />
          {error.platform && (
            <span style={{ color: "red" }}>{error.platform}</span>
          )}

          {
            <ul>
              {videogames.platform.map((ele) => {
                return (
                  <li key={ele} onClick={(e) => handleDeletePlataformas(e)}>
                    {ele}
                  </li>
                );
              })}
            </ul>
          }

          <select
            defaultValue={"default"}
            onChange={(e) => handleElegirGenero(e)}
          >
            <option value="default">Genres</option>
            {estadoGeneros &&
              estadoGeneros.map((ele) => {
                return (
                  <option key={ele} value={ele.name}>
                    {ele}
                  </option>
                );
              })}
          </select>
          <br />

          {error.genres && <span style={{ color: "red" }}>{error.genres}</span>}
          {
            <ul>
              {videogames.genres.map((ele) => {
                return (
                  <li key={ele} onClick={(e) => handleDeleteGenero(e)}>
                    {ele}
                  </li>
                );
              })}
            </ul>
          }
        </span>

        <br />

        <button
          onClick={(e) => handleCrearVideojuego(e)}
          disabled={Object.keys(error).length === 0 ? false : true}
        >
          Enviar
        </button>
      </form>
      <button>
        <Link to="/home">Back to Home</Link>
      </button>
    </div>
  );
}
