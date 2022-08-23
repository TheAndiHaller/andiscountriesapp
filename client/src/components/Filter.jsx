import React from "react";
import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLanguages, getAllActivities, setContinentFilter, setActivityFilter, setLanguageFilter } from "../redux/actions";
import "../assets/styles/FilterOrder.css"

export default function Filter() {
const dispatch = useDispatch();

const activities = useSelector((state) => state.activities);
const languages = useSelector((state) => state.languages);

const [selectActivity, setSelectActivity] = useState("");
const [selectContinent, setSelectContinent] = useState("");
const [selectLanguage, setSelectLanguage] = useState("NOFILTER");

const [continents] = useState(["South America", "Antarctica", "Asia", "Africa", "Europe", "North America", "Oceania"]);

  useEffect(()=> {
    dispatch(getAllActivities());
    dispatch(getAllLanguages());
  },[dispatch]);

  function handleSelectContinent(e) {
    setSelectContinent(e.target.value);
    dispatch(setContinentFilter(e.target.value));
  }

  function handleSelectActivity(e) {
    setSelectActivity(e.target.value);
    dispatch(setActivityFilter(e.target.value));
  }

  function handleLanguageFilter(e) {
    setSelectLanguage(e.target.value);
    dispatch(setLanguageFilter(e.target.value));
  }

  return (
    <div>
      {/* <button value="Spanish" onClick={handleLanguageFilter}> Filter Spanish</button>
      <button value="NOFILTER" onClick={handleLanguageFilter}> OFF</button> */}


      <select className="dropdown filter" value={selectLanguage} name="select" onChange={(e) => handleLanguageFilter(e)}>
            <option className="opt" key="NOFILTER" value="NOFILTER">Filter by Language</option>
            { languages.map((language) => { 
                return <option className="opt" key={language} value={language}>{language}</option> }) }
        </select>

        <select className="dropdown filter" value={selectContinent} name="select" onChange={(e) => handleSelectContinent(e)}>
            <option className="opt" key="NOFILTER" value="NOFILTER">Filter by Continent</option>
            { continents.map((conti) => { 
                return <option className="opt" key={conti} value={conti}>{conti}</option> }) }
        </select>
        <select className="dropdown filter" value={selectActivity} name="select" onChange={(e) => handleSelectActivity(e)}>
            <option className="opt" key="NOFILTER" value="NOFILTER">Filter by Activities</option>
            { Array.isArray(activities) ? activities.length > 0 ? activities.map((act) => { 
                return <option className="opt" key={act.id} value={act.name}>{act.name}</option> }) : <option key="EMPTY" value="EMPTY">NO ACTIVITIES FOUND</option> : <option key="EMPTY" value="EMPTY">NO ACTIVITIES FOUND</option> }
        </select>
    </div>
  );
}
