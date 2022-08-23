import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchCountry, getAllCountries } from "../redux/actions";
import { NavLink } from "react-router-dom";
import "../assets/styles/Searchbar.css";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("Refresh");

  useEffect(() => {
    search ? setActiveSearch("Search") : setActiveSearch("Refresh");
  }, [search]);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    search ? dispatch(searchCountry(search)) : dispatch(getAllCountries());
  }

  return (
    <div>
      <div className="headerBtnBar" >
        <NavLink className="navLink" activeClassName="activeRoute" to="/addactivity">
         ADD ACTIVITY
        </NavLink>
        <NavLink className="navLink" activeClassName="activeRoute" to="/about">
         ABOUT
        </NavLink>
      </div>
      <form className="searchForm" onSubmit={handleSubmit}>
        <input
          className="searchFormInput"
          type="text"
          onChange={handleChange}
          placeholder="Search by name"
          value={search}
        />
        <input className="searchFormBtn" type="submit" value={activeSearch} />
      </form>
    </div>
  );
}
