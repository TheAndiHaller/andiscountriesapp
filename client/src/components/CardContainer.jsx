import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries } from "../redux/actions";
import "../assets/styles/CardsContainer.css";

const pageSize = 9;
let totalItems = 0;

let dotsLeft = false;
let dotsRight = false;

export default function CardContainer() {
  const countries = useSelector((state) => state.countries);
  const continentFilter = useSelector((state) => state.continentFilter);
  const activityFilter = useSelector((state) => state.activityFilter);
  const languageFilter = useSelector((state) => state.languageFilter);

  const orderByName = useSelector((state) => state.orderByName);
  const orderByPopulation = useSelector((state) => state.orderByPopulation);

  const [countriesToDisplay, setCountriesToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBtn, setTotalBtn] = useState(1);
  const [pageBtns, setpageBtns] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  useEffect(() => {
    setCountriesToDisplay(countries);
    totalItems = countries.length;
  }, [countries]);

  useEffect(() => {
    let auxCountries = [...countries];

    if (languageFilter !== "NOFILTER") {
      auxCountries = auxCountries.filter((c) => {
        let aux = false;
          for (let i = 0; i < c.languages.length; i++) {
            if (c.languages[i] === languageFilter) aux = true;
          }
          return aux ? true : false;
        });
    }

    if (continentFilter !== "NOFILTER") {
      auxCountries = auxCountries.filter((c) => {
        return c.continent === continentFilter ? true : false;
      });
    }

    if (activityFilter !== "NOFILTER") {
      auxCountries = auxCountries.filter((c) => {
        let aux = false;
          for (let i = 0; i < c.activities.length; i++) {
            if (c.activities[i].name === activityFilter) aux = true;
          }
          return aux ? true : false;
        });
    }

    if (orderByName !== "OFF") {
      auxCountries = auxCountries.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) return orderByName === "AZ" ? -1 : 1;
        if (nameA > nameB) return orderByName === "AZ" ? 1 : -1;

        return 0;
      });
    }

    if (orderByPopulation !== "OFF") {
      auxCountries = auxCountries.sort((a, b) => {
        return orderByPopulation === "50"
          ? b.population - a.population
          : a.population - b.population;
      });
    }

    totalItems = auxCountries.length;

    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;

    auxCountries = auxCountries.slice(firstIndex, lastIndex);

    setTotalBtn(Math.ceil(totalItems / pageSize));
    let auxBtn = [];
    for (let i = 1; i <= totalBtn; i++) {
      auxBtn.push(i);
    }

    if (auxBtn.length >= 5) {
      let lastIndexBtn = currentPage + 2;
      if (lastIndexBtn < 5) lastIndexBtn = 5;
      let firstIndexBtn = lastIndexBtn - 5;
      if (firstIndexBtn < 0) firstIndexBtn = 0;
      if (lastIndexBtn > totalBtn) lastIndexBtn = totalBtn;
      if (firstIndexBtn > totalBtn - 5) firstIndexBtn = totalBtn - 5;
      if (firstIndexBtn > 0) dotsLeft = true;
      if (firstIndexBtn === 0) dotsLeft = false;
      if (lastIndexBtn < totalBtn) dotsRight = true;
      if (lastIndexBtn === totalBtn) dotsRight = false;

      auxBtn = auxBtn.slice(firstIndexBtn, lastIndexBtn);
    } else {
      dotsLeft = false;
      dotsRight = false;
    }

    setpageBtns(auxBtn);

    if (currentPage > totalBtn) setCurrentPage(1);

    setCountriesToDisplay(auxCountries);
  }, [
    continentFilter,
    activityFilter,
    orderByName,
    orderByPopulation,
    currentPage,
    totalBtn,
    countries,
    languageFilter
  ]);

  function handleNextBtn() {
    if (currentPage < totalBtn) setCurrentPage(currentPage + 1);
  }

  function handlePreviousBtn() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  return (
    <div>
      <div className="paginationContainer">
        {currentPage > 1 && (
          <button className="paginationBtn active" onClick={() => handlePreviousBtn()}>
            previous
          </button>
        )}

        {dotsLeft === true && (
          <>
            <button className="paginationBtn" onClick={() => setCurrentPage(1)}>
              1
            </button>
            <span className="dots">...</span>
          </>
        )}

        {totalItems <= pageSize ? (
          <div></div>
        ) : (
          pageBtns?.map((btn) => (
            <button
              className={
                currentPage === btn
                  ? "paginationBtn active"
                  : "paginationBtn"
              }
              key={btn}
              onClick={() => setCurrentPage(btn)}
            >
              {btn}
            </button>
          ))
        )}

        {dotsRight === true && (
          <>
            <span className="dots">...</span>
            <button
              className="paginationBtn"
              onClick={() => setCurrentPage(totalBtn)}
            >
              {totalBtn}
            </button>
          </>
        )}

        {currentPage < totalBtn && (
          <button className="paginationBtn active" onClick={() => handleNextBtn()}>
            next
          </button>
        )}
      </div>
      <ul className="cardBox">
        {Array.isArray(countriesToDisplay) ? (
          countriesToDisplay.length ? (
            countriesToDisplay.map((country) => (
              <Card
                key={country.id}
                id={country.id}
                name={country.name}
                continent={country.continent}
                flag={country.flag}
              />
            ))
          ) : (
            <h2 className="loadingCountries">No Countries found</h2>
          )
        ) : (
          <h2 className="loadingCountries"> Loading...</h2>
        )}
      </ul>
    </div>
  );
}