import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Context";
import SignInModal from "./SignInModal";

export default function DisplayMoreInfo(props) {
  const [fetched, setFetched] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [addSuccess, setAddSuccess] = useState("");
  const baseImgURL = "https://image.tmdb.org/t/p/";
  const imageSize = "w1280";
  const { currentUser } = useAuth();
  // get current date and time
  const today = new Date();
  const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  const handleAddToWatchListClick = async (movieId, title, rating, releaseDate, image) => {
    if (!currentUser) {
      handleShow();
      return;
    }
    try {
      await axios.post("/api/add-to-watch-list", {
        uid: currentUser.id,
        movieId,
        title,
        rating,
        releaseDate,
        image,
        createdOn: dateTime,
      });
      setAddSuccess("Movie added to your watch list!");
      setFetched(true);
    } catch (error) {
      setFetched(false);
      setError(error.response.data);
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  if (!fetched) {
    return (
      <div className="container-fluid">
        <div className="d-flex">
          <strong className="mr-3">
            <h3>Loading..</h3>
          </strong>
          <div className="spinner-border" role="status" aria-hidden="true"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <SignInModal show={show} handleClose={handleClose} handleShow={handleShow} error={error} />
        {props.moreInfo.map((movie) => (
          <div className="card">
            <img src={`${baseImgURL}${imageSize}${movie.backdrop_path}`} alt="backdrop" />
            <div className="card-body">
              <div className="mb-3">
                <h4 className="card-title">{movie.title}</h4>
                <i>{movie.tagline}</i>
              </div>
              <hr />

              <div className="mb-2">
                <h5 className="card-subtitle mb-2">Overview</h5>
                <div className="card-text">
                  <b>Rating</b> {movie.vote_average}
                </div>
                <div className="card-text">
                  <b className="mr-2">Genres</b>
                  {movie.genres.map((genre) => (
                    <div className="card-text d-inline mr-2" key={genre.id}>
                      {genre.name}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="card-text">{movie.overview}</p>
              </div>
              <hr />
              <div>
                {addSuccess && (
                  <div className="alert alert-success text-center" role="alert">
                    {addSuccess}
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  {movie.videos.results.map((video, index) => (
                    <div key={video.id}>
                      {index === 0 ? (
                        <a
                          style={{ display: "table-cell" }}
                          href={`https://www.youtube.com/watch?v=${video.key}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click here to watch the trailer
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      handleAddToWatchListClick(
                        movie.id,
                        movie.title,
                        movie.vote_average,
                        movie.release_date,
                        movie.poster_path
                      )
                    }
                  >
                    Add to watch list
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
