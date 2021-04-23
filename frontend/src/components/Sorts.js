import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

export default function Sorts(props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        className="w-100"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Sort
      </Button>
      <Collapse in={open}>
        <div>
          <div className="card mt-1">
            <h5 className="card-header">Sort by</h5>
            <div className="card-body">
              <select className="custom-select" name="sort" id="sort" onChange={props.handleSortChange}>
                <option value="popularity.asc">Popularity Ascending</option>
                <option value="popularity.desc">Popularity Descending</option>
                <option value="release_date.asc">Release Date Ascending</option>
                <option value="release_date.desc">Release Date Descending</option>
                <option value="vote_average.asc">Rating Ascending</option>
                <option value="vote_average.desc">Rating Descending</option>
              </select>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
