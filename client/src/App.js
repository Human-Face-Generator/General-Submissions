import React, { useEffect, useState } from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import UseAreas from "./pages/UseAreas";
import SavedImages from "./pages/SavedImages";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Menu from "./Components/Menu";
import GenerateMask from "./pages/GenerateMask";
import ListImages from "./pages/ListImages";
import Footer from "./Components/Footer/Footer";
import About from "./Components/FooterPages/About";
import Contact from "./Components/FooterPages/Contact";
import FAQ from "./Components/FooterPages/FAQ";
import User from "./pages/User";
import RandomImages from "./pages/RandomImages";

function App() {

  return (
    <div className="App">

      <Router>
        <Menu />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/Uses"><UseAreas /></Route>
          <Route path="/user/:uid"><User /></Route>
          <Route path="/account-images"><SavedImages /></Route>
          <Route path="/signup"><Signup /></Route>
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/generateMask"><GenerateMask /></Route>
          <Route path="/listImages" render={(props) => <ListImages {...props} />} />
          <Route path="/about"> <About /> </Route>
          <Route path="/contact"> <Contact /></Route>
          <Route path="/FAQ"> <FAQ /> </Route>
          <Route path="/explore-images"> <RandomImages/> </Route>
          
        </Switch>
        <Footer />
      </Router>



    </div>

  );
}

export default App;
