import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNames } from "../Redux/actions";
import estilos from "../Estilos/SearchBar.module.css";

export default function SearchBar({ setPaginaActual }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInput(e) {
    let target = e.target.value;
    e.preventDefault(e);
    setName(target);
    console.log("Este es setname", typeof name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) alert("You must fill in this field");
    // else if (!getNames(name)) alert("No existe este videojuego");
    else {
      dispatch(getNames(name));
      // setOrden(`${name}`);
      setPaginaActual(1);
      setName("");
    }
  }
  return (
    <div className={estilos.td}>
      <input
        onChange={(e) => handleInput(e)}
        type="text"
        placeholder="Write your videogame..."
        value={name}
      />
      <button
        className={estilos.button}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Find
      </button>
    </div>
  );
}
