import React from "react";
import { Link } from "react-router-dom";
import estilos from "../Estilos/Error.module.css";

export default function Error() {
  return (
    <div className={estilos.error}>
      <h1>404</h1>
      <h2>You've met with a terrible fate, haven't you?</h2>
      <br />
      <button>
        <Link to="/home">Back to home</Link>
      </button>
    </div>
  );
}
