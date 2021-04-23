import React, { useState, useEffect } from "react";
import axios from "axios";
import { countryCodes } from "../data/CountryCodes";
import DisplayMovies from "./DisplayMovies";

export default function TopRated() {
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [region, setRegion] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const API_KEY = "api_key=a48fc5bbf08210f25e7397efb859d4c6";
  const TOP_RATED_URL = "https://api.themoviedb.org/3/movie/top_rated?";

  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const res = await axios.get(`${TOP_RATED_URL}${API_KEY}&region=${region}`);
        if (res.data.results.length < 1) setErrorMsg("Sorry, no results.. Please try again.");
        setTopRatedMovies(res.data.results);
        setFetched(true);
      } catch (error) {
        setFetched(false);
        setError(error);
      }
    };
    getTopRatedMovies();
  }, [region]);

  const handleRegionChange = (e) => setRegion(e.target.value);

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
        <h1>Top Rated Movies</h1>
        <div className="row">
          <div className="col col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <div className="mb-2">
              <label htmlFor="country">
                <b>Region</b>
              </label>
              <select className="custom-select" name="country" id="country" onChange={handleRegionChange}>
                {countryCodes.map((country) => (
                  <option value={country.code} key={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col col-xs-12 col-sm-12 col-md-8 col-lg-9">
            {errorMsg ? <h4 className="text-center">{errorMsg}</h4> : <DisplayMovies movies={topRatedMovies} />}
          </div>
        </div>
      </div>
    );
  }
}
