import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetails, clearCountryDetails } from "../redux/actions/index";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import "../assets/styles/details.css";

export default function CountryDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const country = useSelector((state) => state.countryDetails);

  useEffect(() => {
    dispatch(getCountryDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearCountryDetails());
    };
  }, [dispatch]);

  function readDiff(diff) {
    switch (diff) {
      case 1:
        return "Very Easy";
      case 2:
        return "Easy";
      case 3:
        return "Normal";
      case 4:
        return "Hard";
      case 5:
        return "Very Hard";
      default:
        return "Normal";
    }
  }
  return (
    <div className="detailWrapper">
      <div className="row">
        <div className="col-100 fRight air">
          <NavLink className="navLink" activeClassName="activeRoute" to="/home">
            BACK
          </NavLink>
        </div>
      </div>
      <div className="row">
        <div className="col-50 fLeft">
          <h1 className="detailName">{country.name}</h1>
        </div>
        <div className="col-50 fRight">
          <img className="detailImage" src={country.flag} alt="Flag" />
        </div>
      </div>

      <div className="row">
        <div className="detailContainer">
          <p className="col-100 textDetails">
            Is a country located in {country.continent}, in the subregion{" "}
            {country.subregion}. The area of {country.name} is {country.area}{" "}
            km2. It has a population of {country.population}.
          </p>
          <h3 className="col-100 textDetails">
            The capital of {country.name} is {country.capital}
          </h3>
          <h5 className="col-100 textDetails">
            ISO 3166-1 alpha-3 code: {country.id}
          </h5>
          <h5 className="col-100 textDetails">    Languages      </h5>

          <ul className="cardBoxDetails">
            {country.languages?.map((c, index) => (
              <li className="cardLiDetails" key={index}>
                <div className="cardDetails">
                  <h3>{c}</h3>
                </div>
              </li>
            ))}
          </ul>  
                  
        </div>
      </div>

      <div className="row">
        <div className="col-100 fLeft fCenter">
          <h2 className="">Touristic Activities:</h2>

          <ul className="cardBoxDetails">
            {country.activities?.map((c, index) => (
              <li className="cardLiDetails" key={index}>
                <div className="cardDetails">
                  <h3>{c.name}</h3>
                  <div className="containerDetails">
                    <p>Difficulty: {readDiff(c.dificulty)}</p>
                    <p>Duration: {c.duration} hs</p>
                    <p>Season: {c.season}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
