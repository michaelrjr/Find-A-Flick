import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayWatchList from "./DisplayWatchList";
import { useAuth } from "../context/Context";

export default function WatchList() {
  const [watchList, setWatchList] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState(0);
  const { currentUser } = useAuth();

  useEffect(() => {
    getWatchList();
    const getResolution = () => setWidth(window.screen.width);
    getResolution();
    console.log(width);
  }, []);

  const getWatchList = async () => {
    try {
      const res = await axios.get("/api/watch-list");
      console.log("watch list", res.data);
      setWatchList(res.data);
      setFetched(true);
    } catch (error) {
      setFetched(false);
      setError(error);
    }
  };

  const handleWatchedClick = async (mId) => {
    try {
      await axios.put(`/api/mark-as-watched/${mId}/${currentUser.id}`);
    } catch (error) {
      console.log(error);
    }
    getWatchList();
  };

  const handleRemoveClick = async (mId) => {
    try {
      await axios.delete(`/api/delete-movie/${mId}/${currentUser.id}`);
    } catch (error) {
      console.log(error);
    }
    getWatchList();
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
        <h1>My Watch List</h1>
        <div className={width < 500 ? "d-flex justify-content-center" : ""}>
          <DisplayWatchList
            movies={watchList}
            handleWatchedClick={handleWatchedClick}
            handleRemoveClick={handleRemoveClick}
          />
        </div>
      </div>
    );
  }
}
