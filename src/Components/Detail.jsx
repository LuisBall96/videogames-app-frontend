import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { videogameDetail } from "../Redux/actions";
import Loading from "../Components/Loading";
import estilos from "../Estilos/Detail.module.css";

// import { useState, useEffect } from "react";

export default function Detail(props) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // let id = props.match.params.id
  const { id } = useParams();

  const videogame = useSelector((state) => state.videogame);

  if (videogame.length > 0 && loading) {
    setLoading(false);
  }

  useEffect(() => {
    dispatch(videogameDetail(id));
  }, [dispatch, id]);

  return (
    <div className={estilos.detalle}>
      {videogame.length > 0 && !loading ? (
        <div>
          <h2>{videogame[0].name}</h2>
          <img
            src={videogame[0].background_image}
            alt="Not found"
            width="500px"
            height="500px"
          />
          <h5>
            {!videogame[0].createdInDB
              ? videogame[0].genres + "    "
              : videogame[0].genres.map((ele) => ele.name + "  ")}
          </h5>
          <h5 className={estilos.description}>
            {!videogame[0].createdInDB
              ? videogame[0].description_raw
              : videogame[0].description}
          </h5>
          <div className={estilos.restantes}>
            <h5>{videogame[0].released}</h5>
            <h5>{videogame[0].rating}</h5>
            <h5>{videogame[0].platform.map((ele) => ele + " ")}</h5>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <Link to={"/home"}>
        <button> Back to home </button>
      </Link>
    </div>
  );
}
