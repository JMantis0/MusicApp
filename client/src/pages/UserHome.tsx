import React from "react";
import SearchInput from "../components/SearchInput";
import Grid from "@material-ui/core/Grid";
import style from "../MusicApp.module.css";
import LogoutButton from "../components/LogoutButton";
import SearchDeezerButton from "../components/SearchDeezerButton";

const UserHome = () => {
  return (
    <div>
      <header>
        <Grid container>
          <Grid className={style.center} xs={10} item>
            <h1>User Home</h1>
          </Grid>
          <Grid className={style.center} xs={2} item>
            <LogoutButton />
          </Grid>
        </Grid>
      </header>

      <div className={style.horizontalLine}></div>

      <main>
        <Grid container>
          <Grid className={style.center} item xs={10}>
            <SearchInput />
          </Grid>
          <Grid className={style.center} item xs={2}>
            side section
          </Grid>
          <Grid className={style.center} item xs={10}>
            <SearchDeezerButton />
          </Grid>
        </Grid>
      </main>
    </div>
  );
};
export default UserHome;
