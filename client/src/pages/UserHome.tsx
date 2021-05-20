import React from "react";
import SearchInput from "../components/SearchInput";
import Grid from "@material-ui/core/Grid";
import style from "../MusicApp.module.css";
import LogoutButton from "../components/LogoutButton";
// import SearchResults from "../components/SearchResults";

const UserHome = () => {
  return (
    <div>
      <header>
        <Grid container>
          <Grid className={style.center} xs={10} item >
            <h1>User Home</h1>
          </Grid>
          <Grid className={style.center} xs={2} item >
            <LogoutButton />
          </Grid>
        </Grid>
      </header>

      <div className={style.horizontalLine}></div>

      <body>
        <Grid container >
          <Grid className={style.center} item xs={10}>
            <SearchInput />
          </Grid>
          {/* <Grid className={style.center}>
            <SearchResults />
          </Grid> */}
          <Grid className={style.center} item xs={2}>
            side section
          </Grid>
        </Grid>
      </body>
    </div>
  );
};
export default UserHome;
