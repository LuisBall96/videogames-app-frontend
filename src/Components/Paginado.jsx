import Estilos from "../Estilos/Paginado.module.css";
import React from "react";

export default function Paginado({
  videogamesPorPagina,
  stateVideogames,
  paginado,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(stateVideogames / videogamesPorPagina); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={Estilos.paginacion}>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <button onClick={() => paginado(number)}>{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
