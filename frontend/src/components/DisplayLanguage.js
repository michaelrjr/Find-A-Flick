import React from "react";
import { languageData } from "../data/LanguageData";

export default function DisplayLanguage(props) {
  return (
    <div>
      <label htmlFor="language">
        <b>Language</b>
      </label>
      <select
        className="custom-select"
        name="language"
        id="language"
        onChange={props.handleLanguageChange}
      >
        {languageData.map((language) => (
          <option value={language.code} key={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}
