import React from "react";

export default function DisplayGenres(props) {
  return (
    <div>
      <label htmlFor="genres">
        <b>Genre</b>
      </label>
      <select
        className="custom-select"
        name="genres"
        id="genres"
        onChange={props.handleGenreChange}
      >
        {props.genres.map((genre) => (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}
