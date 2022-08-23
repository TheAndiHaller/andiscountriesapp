import "./assets/styles/App.css";
import { Route } from "react-router";
import Landing from "./routes/Landing";
import Home from "./routes/Home";
import CountryDetails from "./routes/CountryDetails";
import AddActivity from "./routes/AddActivity";
import About from "./routes/About";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/details/:id" component={CountryDetails} />
      <Route exact path="/addactivity" component={AddActivity} />
      <Route exact path="/about" component={About} />
    </div>
  );
}

export default App;
