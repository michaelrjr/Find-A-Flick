import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayMovies from "./DisplayMovies";
import SearchBox from "./SearchBox";
import Filters from "./Filters";
import Sorts from "./Sorts";

export default function Discover() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreChosen, setGenreChosen] = useState("");
  const [ratingChosen, setRatingChosen] = useState(5);
  const [languageChosen, setLanguageChosen] = useState("en");
  const [yearChosen, setYearChosen] = useState("");
  const [sortChosen, setSortChosen] = useState("popularity.desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "api_key=a48fc5bbf08210f25e7397efb859d4c6";
  const DISCOVER_URL = "https://api.themoviedb.org/3/discover/movie?";
  const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list?";
  const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?";

  useEffect(() => {
    // fetch discover movies endpoint from TMDB
    const getMovies = async () => {
      try {
        const res = await axios.get(`${DISCOVER_URL}${API_KEY}`);
        setMovies(res.data.results);
        console.log(res.data.results);
        setFetched(true);
      } catch (error) {
        setFetched(false);
        setError(error);
      }
    };
    // fetch genres from TMDB
    const getGenres = async () => {
      try {
        const res = await axios.get(`${GENRES_URL}${API_KEY}`);
        setGenres(res.data.genres);
        console.log(res.data.genres);
        setFetched(true);
      } catch (error) {
        setFetched(false);
        setError(error);
      }
    };
    getMovies();
    getGenres();
  }, []);

  // when the user clicks "search" after applying filters and sorts
  const handleSearchClick = async () => {
    try {
      const res = await axios.get(
        `${DISCOVER_URL}${API_KEY}&with_genres=${genreChosen}&vote_average.gte=${ratingChosen}&with_original_language=${languageChosen}&primary_release_year=${yearChosen}&sort_by=${sortChosen}`
      );
      setMovies(res.data.results);
      console.log("filtered res ", res.data.results);
      setFetched(true);
    } catch (error) {
      setFetched(false);
      setError(error);
    }
  };

  // when the user clicks "search" after entering text into the textbox
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${SEARCH_URL}${API_KEY}&query=${searchTerm}`);
      setMovies(res.data.results);
      setFetched(true);
    } catch (error) {
      setFetched(false);
      setError(error);
    }
  };

  // some onChnage handler functions..
  const handleGenreChange = (e) => setGenreChosen(e.target.value);
  const handleRatingChange = (e) => setRatingChosen(e.target.value);
  const handleLanguageChange = (e) => setLanguageChosen(e.target.value);
  const handleYearChange = (e) => setYearChosen(e.target.value);
  const handleSortChange = (e) => setSortChosen(e.target.value);
  const handleSearchBoxChange = (e) => setSearchTerm(e.target.value);

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
        <h1>Discover Movies</h1>
        <div className="row">
          <div className="col col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <div className="mb-2">
              <SearchBox handleSearchSubmit={handleSearchSubmit} handleSearchBoxChange={handleSearchBoxChange} />
            </div>
            <div className="mb-2">
              <Filters
                genres={genres}
                ratingChosen={ratingChosen}
                handleRatingChange={handleRatingChange}
                handleGenreChange={handleGenreChange}
                handleLanguageChange={handleLanguageChange}
                handleYearChange={handleYearChange}
              />
            </div>
            <div className="mb-2">
              <Sorts handleSortChange={handleSortChange} />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary w-100" onClick={handleSearchClick}>
                Search
              </button>
            </div>
          </div>
          <div className="col col-xs-12 col-sm-12 col-md-8 col-lg-9">
            <DisplayMovies movies={movies} />
          </div>
        </div>
        <div style={{ margin: "20px" }}>
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
            alt="tmdb"
          />
        </div>
      </div>
    );
  }
}
