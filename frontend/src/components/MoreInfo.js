import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayMoreInfo from "./DisplayMoreInfo";
import DisplayWhereToWatch from "./DisplayWhereToWatch";

export default function MoreInfo() {
  const movieId = localStorage.getItem("movieId") || 0;
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const [moreInfo, setMoreInfo] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);
  const [countryChosen, setCountryChosen] = useState("");
  const MORE_INFO_URL = "https://api.themoviedb.org/3/movie/";
  const API_KEY = "api_key=a48fc5bbf08210f25e7397efb859d4c6";

  useEffect(() => {
    // get more info for a movie from tmdb
    const getMoreInfo = async () => {
      try {
        const res = await axios.get(`${MORE_INFO_URL}${movieId}?${API_KEY}&append_to_response=videos`);
        let tempArr = [];
        tempArr.push(res.data);
        setMoreInfo(tempArr);
        console.log(tempArr);
        setFetched(true);
      } catch (error) {
        setFetched(false);
        setError(error);
      }
    };
    // get watch providers for the movie from tmdb
    const getWatchProviders = async () => {
      try {
        const res = await axios.get(`${MORE_INFO_URL}${movieId}/watch/providers?${API_KEY}`);
        setWatchProviders(res.data.results);
        setFetched(true);
      } catch (error) {
        setFetched(false);
        setError(error);
      }
    };

    getMoreInfo();
    getWatchProviders();
  }, [movieId]);

  const handleCountryChange = (e) => setCountryChosen(e.target.value);

  const filterByISOCodeCountry = (cCode) => {
    return function (watcherObj) {
      return watcherObj === cCode;
    };
  };

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
        <h1>More Info</h1>
        <div className="row">
          <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3">
            <DisplayMoreInfo moreInfo={moreInfo} />
          </div>
          <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3">
            <DisplayWhereToWatch
              watchProviders={watchProviders}
              handleCountryChange={handleCountryChange}
              filterByISOCodeCountry={filterByISOCodeCountry}
              countryChosen={countryChosen}
            />
          </div>
        </div>
      </div>
    );
  }
}
