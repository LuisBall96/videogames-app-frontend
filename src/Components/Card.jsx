import React from "react";
import estilos from "../Estilos/Card.module.css";

export default function Card({ name, background_image, genres }) {
  return (
    <div className={estilos.Card}>
      <h3>{name}</h3>

      <img
        src={background_image}
        alt="not found"
        width="250px"
        height="200px"
      />

      {genres.map((ele, index) => {
        return <h4 key={index}>{ele.name}</h4>;
      })}
    </div>
  );
}
