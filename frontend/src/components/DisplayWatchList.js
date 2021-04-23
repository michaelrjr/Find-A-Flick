import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DisplayWatchList(props) {
  const baseImgURL = "https://image.tmdb.org/t/p/";
  const imageSize = "w1280";

  const handleMovieClick = (mId) => localStorage.setItem("movieId", mId);

  return (
    <div className="d-flex">
      <div className="card-deck">
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
              {movie.watched && (
                <div className="watched">
                  <h5>Watched</h5>
                </div>
              )}
              <div className="card-body">
                <h6 className="card-title">{movie.original_title}</h6>
                <div className="d-flex justify-content-between mb-3">
                  <div className="text-muted">{movie.release_date}</div>
                  <div>{movie.vote_average}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    className="d-flex btn btn-outline-success btn-sm"
                    onClick={() => props.handleWatchedClick(movie.id)}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-check2-square mb-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                      </svg>
                    </div>
                    <div className="ml-2">Watched</div>
                  </button>
                  <button
                    className="d-flex btn btn-outline-danger btn-sm"
                    onClick={() => props.handleRemoveClick(movie.id)}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-square mb-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </div>
                    <div className="ml-2">Remove</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
