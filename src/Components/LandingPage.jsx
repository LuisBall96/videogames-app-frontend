import React from "react";
import { Link } from "react-router-dom";
import estilos from "../Estilos/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={estilos.LandingPage}>
      <h1>Follow the path of the hero</h1>

      <Link to="/home">
        <button type="button" className={estilos.Boton}></button>
      </Link>
    </div>
  );
}
