import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Card.css";

export default function Card({ name, continent, flag, id }) {
  return (
    <li className="cardLi">
      <div className="card">
        <Link className="cardLink" to={`/details/${id}`}>
          <img className="cardimg" src={flag} alt={name} />
          <div className="container">
            <h1>{name}</h1>
            <h3>{continent}</h3>
          </div>
        </Link>
      </div>
    </li>
  );
}
