import React from "react";
import { useState, useEffect } from "react";
import { getAllCountries, createActivity } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "../assets/styles/AddActivity.css";
import "../assets/styles/FilterOrder.css";

export default function AddActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  const [countryList, setCountryList] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const [activity, setActivity] = useState({
    name: "",
    dificulty: 1,
    duration: 0,
    season: "All year",
    countries: [],
  });

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  useEffect(() => {
    setCountryList(
      countries.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        return 0;
      })
    );
  }, [countries]);

  useEffect(() => {
    setActivity((a) => ({
      ...a,
      countries: selectedCountries.map((c) => c.id),
    }));
  }, [selectedCountries]);

  useEffect(() => {
    setCountryList(
      countryList.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        return 0;
      })
    );

    setSelectedCountries(
      selectedCountries.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        return 0;
      })
    );
  }, [selectedCountries, countryList]);

  function handleChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case "countries":
        setCountryList(
          countryList.filter(function (elem) {
            return elem.id.toString() !== value;
          })
        );

        setSelectedCountries([
          ...selectedCountries,
          ...countryList.filter(function (elem) {
            return elem.id.toString() === value;
          }),
        ]);

        break;

      case "dificulty":
      case "duration":
        if (!isNaN(parseInt(value)))
          setActivity({
            ...activity,
            [name]: parseInt(value),
          });

        break;

      default:
        setActivity({
          ...activity,
          [name]: value,
        });

        break;
    }
  }

  function validateForm(data) {
    if (
      data.name.length < 3 ||
      data.name.length > 50 ||
      typeof data.name !== "string"
    )
      return "Error: Name must be a string between 3 an 50 characters";
    if (
      data.dificulty < 0 ||
      data.dificulty > 5 ||
      typeof data.dificulty !== "number"
    )
      return "Error: difficulty must be a number between 0 and 5";
    if (
      data.duration < 0 ||
      data.duration > 72 ||
      typeof data.duration !== "number"
    )
      return "Error: duration must be a number between 0 and 72";

    if (data.countries.length <= 0) return "Error: Select at least one Country";
  }

  function handleCountryDelete(e) {
    setSelectedCountries(
      selectedCountries.filter(function (elem) {
        return elem.id.toString() !== e.target.id;
      })
    );

    setCountryList([
      ...countryList,
      ...selectedCountries.filter(function (elem) {
        return elem.id.toString() === e.target.id;
      }),
    ]);
  }

  //const creationStatus = useSelector((state) => state.creationStatus);


  function handleSubmit(e) {
    e.preventDefault();
    let error = validateForm(activity);
    if (error) return alert(error);
    dispatch(createActivity(activity));

    // Reseteo el formulario
    setActivity({
      name: "",
      dificulty: 1,
      duration: 0,
      season: "All year",
      countries: [],
    });
    setSelectedCountries([]);
    setCountryList([...countries]);
  }

  return (
    <div className="formWrapper">
      <h1 className="formTitle">Add a new activity:</h1>
      <div className="formContainer">
        <form className="formForm" onSubmit={(e) => handleSubmit(e)}>
          <div className="row">
            <div className="col-25">
              <label className="formLabel">Name *</label>
            </div>
            <div className="col-75">
              <input
                className="formText"
                type="text"
                name="name"
                placeholder="Name of the Activity"
                value={activity.name}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label className="formLabel">Difficulty</label>
            </div>
            <div className="col-75">
              <select
                className="dropdown newActivity"
                name="dificulty"
                multiple={false}
                value={activity.dificulty}
                onChange={(e) => handleChange(e)}
              >
                <option className="opt" key="1" value="1">
                  Very Easy
                </option>
                <option className="opt" key="2" value="2">
                  Easy
                </option>
                <option className="opt" key="3" value="3">
                  Normal
                </option>
                <option className="opt" key="4" value="4">
                  Hard
                </option>
                <option className="opt" key="5" value="5">
                  Very Hard
                </option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label className="formLabel">Duration</label>
            </div>
            <div className="col-75">
              <input
                className="durationSlide"
                type="range"
                min="0"
                max="72"
                name="duration"
                value={activity.duration}
                onChange={(e) => handleChange(e)}
                step="1"
              />
              <label className="durationLable">
                {activity.duration === 0 ? (
                  <>Less than an hour</>
                ) : (
                  <>{activity.duration} hours</>
                )}
              </label>
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label className="formLabel">Season</label>
            </div>
            <div className="col-75">
              <select
                className="dropdown newActivity"
                name="season"
                multiple={false}
                value={activity.season}
                onChange={(e) => handleChange(e)}
              >
                <option className="opt" key="1" value="All year">
                  All year
                </option>
                <option className="opt" key="2" value="Spring">
                  Spring
                </option>
                <option className="opt" key="3" value="Summer">
                  Summer
                </option>
                <option className="opt" key="4" value="Autumn">
                  Autumn
                </option>
                <option className="opt" key="5" value="Winter">
                  Winter
                </option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label className="formLabel">Countries *</label>
            </div>
            <div className="col-75">
              <select
                className="dropdown newActivity"
                name="countries"
                multiple={false}
                onChange={(e) => handleChange(e)}
                required
              >
                <option className="opt" key="a" value="a">
                  Select a country / countries
                </option>
                {countryList.length > 0 ? (
                  countryList.map((c) => {
                    return (
                      <option className="opt" key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    );
                  })
                ) : (
                  <option className="opt" key="EMPTY" value="EMPTY">
                    NO COUNTRIES FOUND
                  </option>
                )}
              </select>
              <ul className="cardBoxDetails">
                {selectedCountries.length > 0 ? (
                  selectedCountries.map((c) => {
                    return (
                      <li className="cardLiCountries" key={c.id}>
                        <div className="cardDetailsCountries">
                          <span className="countryPill">{c.name} </span>
                          <button
                            className="countryPillBtn"
                            type="button"
                            id={c.id}
                            onClick={(e) => handleCountryDelete(e)}
                          >
                            x
                          </button>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <h5 className="">SELECT AT LEAST ONE COUNTRY</h5>
                )}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-50 fLeft">
              <NavLink className="backBtn" to="/home">
                BACK
              </NavLink>
            </div>
            <div className="col-50 fRight">
              <input className="formBtn" type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
