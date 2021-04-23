import React, { useState } from "react";
import { countryCodes } from "../data/CountryCodes";
import { Button, Collapse } from "react-bootstrap";

export default function DisplayWhereToWatch(props) {
  const baseImgURL = "https://image.tmdb.org/t/p/";
  const [openBuy, setOpenBuy] = useState(false);
  const [openRent, setOpenRent] = useState(false);
  const [openFlatRate, setOpenFlatRate] = useState(false);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Where To Watch</h5>
        <div>
          <label htmlFor="country">Region</label>
          <select className="custom-select" name="country" id="country" onChange={props.handleCountryChange}>
            {countryCodes.map((country) => (
              <option value={country.code} key={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        {Object.getOwnPropertyNames(props.watchProviders).findIndex(
          props.filterByISOCodeCountry(props.countryChosen)
        ) !== -1 ? (
          <div>
            <hr />
            <Button
              className="w-100"
              variant="primary"
              onClick={() => setOpenBuy(!openBuy)}
              aria-controls="example-collapse-text"
              aria-expanded={openBuy}
            >
              To Buy
            </Button>
            <Collapse in={openBuy}>
              <div id="example-collapse-text">
                <div className="row mt-3">
                  {props.watchProviders[props.countryChosen].buy ? (
                    <div className="d-flex flex-wrap text-center">
                      {props.watchProviders[props.countryChosen].buy.map((movie) => (
                        <div className="col mt-2" key={movie.provider_id}>
                          <div>
                            <img
                              src={`${baseImgURL}w45${movie.logo_path}`}
                              style={{ borderRadius: "20%" }}
                              alt="logo"
                            />
                          </div>
                          <div>{movie.provider_name}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="col">Not available to buy.</div>
                  )}
                </div>
              </div>
            </Collapse>
            <hr />
            <Button
              className="w-100"
              variant="success"
              onClick={() => setOpenRent(!openRent)}
              aria-controls="example-collapse-text"
              aria-expanded={openRent}
            >
              To Rent
            </Button>
            <Collapse in={openRent}>
              <div id="example-collapse-text">
                <div className="row mt-3">
                  {props.watchProviders[props.countryChosen].rent ? (
                    <div className="d-flex flex-wrap text-center">
                      {props.watchProviders[props.countryChosen].rent.map((movie) => (
                        <div className="col mt-2" key={movie.provider_id}>
                          <div>
                            <img
                              src={`${baseImgURL}w45${movie.logo_path}`}
                              style={{ borderRadius: "20%" }}
                              alt="logo"
                            />
                          </div>
                          <div>{movie.provider_name}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="col">Not available to rent.</div>
                  )}
                </div>
              </div>
            </Collapse>
            <hr />
            <Button
              className="w-100"
              variant="warning"
              onClick={() => setOpenFlatRate(!openFlatRate)}
              aria-controls="example-collapse-text"
              aria-expanded={openFlatRate}
            >
              Flat Rate
            </Button>
            <Collapse in={openFlatRate}>
              <div id="example-collapse-text">
                <div className="row mt-3">
                  {props.watchProviders[props.countryChosen].flatrate ? (
                    <div className="d-flex flex-wrap text-center">
                      {props.watchProviders[props.countryChosen].flatrate.map((movie) => (
                        <div className="col mt-2" key={movie.provider_id}>
                          <div>
                            <img
                              src={`${baseImgURL}w45${movie.logo_path}`}
                              style={{ borderRadius: "20%" }}
                              alt="logo"
                            />
                          </div>
                          <div>{movie.provider_name}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="col">No flat rate avaiable.</div>
                  )}
                </div>
              </div>
            </Collapse>
          </div>
        ) : (
          <div className="mt-3">
            {!props.countryChosen ? "" : <div>Sorry, no watch providers available in this region..</div>}
          </div>
        )}
      </div>
    </div>
  );
}
