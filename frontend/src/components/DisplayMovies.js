import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DisplayMovies(props) {
  const baseImgURL = "https://image.tmdb.org/t/p/";
  const imageSize = "w1280";

  const handleMovieClick = (mId) => localStorage.setItem("movieId", mId);

  return (
    <div className="d-flex justify-content-center">
      <div className="card-deck justify-content-center">
        {props.movies.map((movie) => (
          <div key={movie.id}>
            <div className="movie-card card mb-3 mr-2 ml-2" key={movie.id} style={{ width: "16rem" }}>
              <Link to="/more-info">
                <img
                  className="card-img-top"
                  style={{ cursor: "pointer" }}
                  src={`${baseImgURL}${imageSize}${movie.poster_path}`}
                  alt="movie poster"
                  onClick={() => handleMovieClick(movie.id)}
                />
              </Link>
              <div className="card-body">
                <h6 className="card-title">{movie.original_title}</h6>
                <div className="d-flex justify-content-between">
                  <div className="text-muted">{movie.release_date}</div>
                  <div>{movie.vote_average}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
