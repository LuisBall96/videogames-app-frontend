import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home.jsx";
import Formulario from "./Components/Formulario";
import Detail from "./Components/Detail";
import Error from "./Components/Error";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/formulario">
          <Formulario />
        </Route>
        <Route path="/detail/:id">
          <Detail />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
