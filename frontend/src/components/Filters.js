import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import DisplayGenres from "./DisplayGenres";
import DisplayRating from "./DisplayRating";
import DisplayLanguage from "./DisplayLanguage";
import DisplayYear from "./DisplayYear";

export default function Filters(props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        className="w-100"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Filter
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <div className="card mt-1">
            <h5 className="card-header">Filter by</h5>
            <div className="card-body">
              <div className="mb-1">
                <DisplayRating ratingChosen={props.ratingChosen} handleRatingChange={props.handleRatingChange} />
              </div>
              <div className="mb-3">
                <DisplayGenres genres={props.genres} handleGenreChange={props.handleGenreChange} />
              </div>
              <div className="mb-3">
                <DisplayLanguage handleLanguageChange={props.handleLanguageChange} />
              </div>
              <div>
                <DisplayYear handleYearChange={props.handleYearChange} />
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
