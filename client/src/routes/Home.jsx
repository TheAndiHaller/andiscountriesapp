import React from "react";
import CardContainer from "../components/CardContainer";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Order from "../components/Order";

export default function Home() {
  return (
    <div className="homeContainer">
      <SearchBar />
      <Filter />
      <Order />
      <CardContainer />
    </div>
  );
}
