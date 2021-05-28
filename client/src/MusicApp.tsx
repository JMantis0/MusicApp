import React from "react";
import "./MusicApp.module.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserHome from "./pages/UserHome";
import Support from "./pages/Support";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import UserCreation from "./pages/UserCreation";
import style from "./MusicApp.module.css";

function MusicApp() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path={"/login"}>
            <Login />
          </Route>
          <Route exact path="/user_home">
            <UserHome />
          </Route>
          <Route exact path="/support">
            <Support />
          </Route>
          <Route exact path="/user_create">
            <UserCreation />
          </Route>
        </Switch>
      </Router>

      <footer className={style.footer}>
        <p className={style.bigger}>
          Designed and developed by Stephen Barnard, Jeremy Cowelchuck, and
          Jesse Mazur
        </p>
        <p className={style.smaller}>Copywrite 2021</p>
      </footer>
    </div>
  );
}

export default MusicApp;
