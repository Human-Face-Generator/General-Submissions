import React from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Home from "./pages/Home";
import UseAreas from "./pages/UseAreas";
import SavedImages from "./pages/SavedImages";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Menu from "./Components/Menu";

function App() {
  return (
    <div className="App">
      <Router>
      <Menu/><hr/>
      <Switch>
     <Route exact path="/"><Home/></Route>
     <Route path="/Uses"><UseAreas/></Route>
     <Route path="/account-images"><SavedImages/></Route>
     <Route path="/signup"><Signup/></Route>
     <Route path="/login"><Login/></Route>
      </Switch>

     </Router>
    </div>
  );
}

export default App;
