import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/landing.css"
 
export default function Landing() {
  return (
    <div className="background">
      <Link className="homeBtn" to={"/home"}>Start Traveling the World!</Link>
    </div>
  );
}
