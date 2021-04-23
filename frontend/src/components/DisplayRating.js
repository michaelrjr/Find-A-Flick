import React from "react";

export default function DisplayRating(props) {
  return (
    <div>
      <label className="form-label" htmlFor="rating">
        <b>Minimum Rating</b> {props.ratingChosen}
      </label>
      <input
        type="range"
        className="form-range w-100"
        id="rating"
        min="1"
        max="10"
        value={props.ratingChosen}
        onChange={props.handleRatingChange}
      />
    </div>
  );
}
