import React from "react";
import "./MusicApp.module.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserHome from "./pages/UserHome";
import Support from "./pages/Support";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Playlists from "./pages/Playlists";
import UserCreation from "./pages/UserCreation";
function MusicApp() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/user_home">
            <UserHome />
          </Route>
          {/* <Route>
            <Playlists/>
          </Route> */}
          <Route exact path="/support">
            <Support />
          </Route>
          <Route exact path="/user_create">
            <UserCreation />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default MusicApp;
