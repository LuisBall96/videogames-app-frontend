import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    let url = await axios("https://videogames-app-backend-production.up.railway.app/videogames");
    return dispatch({
      type: "TRAER_VIDEOJUEGOS",
      payload: url.data,
    });
  };
}
export function getNames(name) {
  return async function (dispatch) {
    let url = await axios("https://videogames-app-backend-production.up.railway.app/videogames?name=" + name);
    return dispatch({
      type: "BUSCAR_POR_NOMBRE",
      payload: url.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      let url = await axios("https://videogames-app-backend-production.up.railway.app/genres");
      return dispatch({
        type: "TRAER_GENEROS",
        payload: url.data,
      });
    } catch (error) {
      console.log("ERROR EN TRAER GENEROS");
    }
  };
}

export function filterDB(payload) {
  return (dispatch) => {
    dispatch({
      type: "FILTRAR_BD",
      payload,
    });
  };
}
export function filterGenre(payload) {
  return (dispatch) => {
    dispatch({
      type: "FILTRAR_GENERO",
      payload,
    });
  };
}

export function orderAlphabetic(payload) {
  return (dispatch) => {
    dispatch({
      type: "ORDENAR_ALFABETICAMENTE",
      payload: payload,
    });
  };
}

export function orderRating(payload) {
  return {
    type: "ORDENAR_RATING",
    payload,
  };
}

export function createVideogame(payload) {
  return async function () {
    let url = await axios.post("https://videogames-app-backend-production.up.railway.app/crearJuego", payload);
    return url;
  };
}

export function videogameDetail(id) {
  return async function (dispatch) {
    try {
      let url = await axios(`https://videogames-app-backend-production.up.railway.app/videogames/${id}`);

      return dispatch({
        type: "TRAER_DETALLE",
        payload: url.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
