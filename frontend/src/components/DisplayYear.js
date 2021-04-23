import React from "react";
import { yearData } from "../data/YearData";

export default function DisplayYear(props) {
  return (
    <div>
      <label htmlFor="year">
        <b>Year</b>
      </label>
      <select
        className="custom-select"
        name="year"
        id="year"
        onChange={props.handleYearChange}
      >
        {yearData.map((year) => (
          <option value={year.year} key={year.year}>
            {year.year}
          </option>
        ))}
      </select>
    </div>
  );
}
