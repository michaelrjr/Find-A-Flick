import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayMovies from "./DisplayMovies";

export default function Trending() {
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const [errorMsg, setErrorMsg] = useState("");
  const TRENDING_URL = "https://api.themoviedb.org/3/trending/movie/";
  const API_KEY = "api_key=a48fc5bbf08210f25e7397efb859d4c6";

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const res = await axios.get(`${TRENDING_URL}${timeWindow}?${API_KEY}`);
        if (res.data.results.length < 1) setErrorMsg("Sorry, no results.. Please try again.");
        setTrendingMovies(res.data.results);
        setFetched(true);
      } catch (error) {
        setFetched(false);
        setError(error);
      }
    };
    getTrendingMovies();
  }, [timeWindow]);

  const handleTodayClick = () => setTimeWindow("day");
  const handleThisWeekClick = () => setTimeWindow("week");

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
  } else if (error) {
    return (
      <div className="container-fluid">
        <h1>API Request Error</h1>
      </div>
    );
  } else {
    return (
      <div className="container-fluid">
        <h1>Trending Movies</h1>
        <div className="row">
          <div className="col col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <div className="mb-2">
              <button className="btn btn-primary w-100" onClick={handleTodayClick}>
                Today
              </button>
            </div>
            <div>
              <button className="btn btn-primary w-100" onClick={handleThisWeekClick}>
                This Week
              </button>
            </div>
          </div>
          <div className="col col-xs-12 col-sm-12 col-md-8 col-lg-9">
            {errorMsg ? <h4 className="text-center">{errorMsg}</h4> : <DisplayMovies movies={trendingMovies} />}
          </div>
        </div>
      </div>
    );
  }
}
