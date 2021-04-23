import React from "react";

export default function SearchBox(props) {
  return (
    <form onSubmit={props.handleSearchSubmit}>
      <input
        className="form-control"
        placeholder="Search movies"
        onChange={props.handleSearchBoxChange}
      />
      <button type="submit" className="btn btn-primary w-100">
        Search
      </button>
    </form>
  );
}
