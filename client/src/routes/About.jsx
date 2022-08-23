import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/styles/About.css";
import git from "../assets/img/github-logo-36.png";
import linkedin from "../assets/img/linkedin-square-logo-36.png";
import insta from "../assets/img/instagram-logo-36.png";

export default function About() {
  return (
    <div className="detailWrapper">
      <div className="about-back">
        <NavLink className="navLink" activeClassName="activeRoute" to="/home">
          BACK
        </NavLink>
      </div>
      <div className="about-container">
        <h1>World Explorer</h1>
        <div className="about-text-container">
          <p>
            World Explorer is a WebApp created as an individual project for the
            Bootcamp{" "}
            <a
              className="about-link"
              target="_blank"
              href="https://www.soyhenry.com/"
              rel="noreferrer"
            >
              Soy Henry
            </a>
            .
          </p>
          <p>
            It uses the API{" "}
            <a
              className="about-link"
              target="_blank"
              href="https://www.restcountries.com/"
              rel="noreferrer"
            >
              restcountries
            </a>{" "}
            to get the information about the countries.
          </p>
          <h2>Features:</h2>
          <ul>
            <li>A list of 250+ Countries</li>
            <li>Search bar to find any Country in the list</li>
            <li>The option to filter by language</li>
            <li>A filter by continents</li>
            <li>
              And another option to filter by tourist activities that can be
              created/added to any country
            </li>
            <li>It also allows to order by alphabet or population</li>
            <li>
              By clicking on any card, you can see more details about the
              Country
            </li>
            <li>
              The add activity form lets you create a new activity that can be
              assigned to any Country
            </li>
          </ul>
          <h2>Technologies used:</h2>
          <ul>
            <li>Frontend: React + Redux + pure CSS</li>
            <li>Backend: NodeJs + Express + Sequelize</li>
            <li>Database: Postgres</li>
          </ul>
          <h2>Made by Andreas Haller</h2>
          <div className="about-me-card">
            <p>
              Find me:{" "}
              <span>
                <a
                  className="about-link"
                  target="_blank"
                  href="https://github.com/TheAndiHaller"
                  rel="noreferrer"
                >
                  <img className="social-logos" src={git} alt="git" />
                </a>
              </span>
              <span>
                <a
                  className="about-link"
                  target="_blank"
                  href="https://www.linkedin.com/in/andreas-haller-schade-558097105/"
                  rel="noreferrer"
                >
                  <img className="social-logos" src={linkedin} alt="git" />
                </a>
              </span>
              <span>
                <a
                  className="about-link"
                  target="_blank"
                  href="https://www.instagram.com/theandihaller/"
                  rel="noreferrer"
                >
                  <img className="social-logos" src={insta} alt="git" />
                </a>
              </span>
            </p>
            <h3>
              <a
                className="about-link"
                target="_blank"
                href="https://github.com/TheAndiHaller/WorldExplorer"
                rel="noreferrer"
              >
                Project Repository
              </a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
