import "./App.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import PokeCreate from './components/CharacterCreate.jsx'
import Detail from './components/Details.jsx';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/pokemones' component={PokeCreate}/>
        <Route path='/home/:id' component={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
