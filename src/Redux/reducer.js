const initialState = {
  videogames: [],
  copiaVideogames: [],
  videogameDefault: [],
  generos: [],
  videogame: [],
};

function videogameReducer(state = initialState, action) {
  switch (action.type) {
    case "TRAER_VIDEOJUEGOS": {
      return {
        ...state,
        videogames: action.payload,
        copiaVideogames: action.payload,
        videogameDefault: action.payload,
      };
    }

    case "BUSCAR_POR_NOMBRE": {
      return {
        ...state,
        copiaVideogames:
          action.payload === "No existen videojuegos con ese nombre"
            ? (alert("There are no games with that name"),
              [...state.videogames])
            : action.payload,
      };
    }

    case "TRAER_GENEROS":
      return {
        ...state,
        generos: action.payload,
      };

    case "FILTRAR_BD":
      const infoDB = [...state.videogames];
      const filtrarDB =
        action.payload === "db"
          ? infoDB.filter((e) => e.createdInDB)
          : infoDB.filter((e) => !e.createdInDB);
      const revisar =
        filtrarDB.length >= 1
          ? filtrarDB
          : (alert("There are no videogames created, go to the form"),
            [...state.videogames]);
      return {
        ...state,
        copiaVideogames:
          action.payload === "All"
            ? [...state.videogames]
            : filtrarDB.length > 0
            ? filtrarDB
            : revisar,
      };

    case "FILTRAR_GENERO":
      const info = [...state.copiaVideogames];
      const filtrar =
        action.payload === "All" || action.payload === "default"
          ? info
          : info.filter((e) =>
              e.genres.map((ele) => ele.name).includes(action.payload)
            );

      return {
        ...state,
        copiaVideogames:
          filtrar.length > 0
            ? filtrar
            : (alert("There are no genres in this item"),
              [...state.videogameDefault]),
      };

    case "ORDENAR_RATING":
      let estado = [...state.copiaVideogames];
      let ordenar =
        action.payload === "MAX"
          ? estado.sort((a, b) => {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : estado.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        copiaVideogames: ordenar,
      };

    case "ORDENAR_ALFABETICAMENTE":
      let sinOrden = [...state.copiaVideogames]; //será que es una copia?
      let orden =
        action.payload === "ASC"
          ? sinOrden.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : sinOrden.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        copiaVideogames: orden,
      };

    case "TRAER_DETALLE":
      return {
        ...state,
        videogame: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}

export default videogameReducer;
