import React from "react";
import SearchInput from "../components/SearchInput";
import Grid from "@material-ui/core/Grid";
import style from "../MusicApp.module.css";

const UserHome = () => {
  return (
    <div>
      <header>
        <Grid container>
          <Grid xs={10} item className={style.center}>
            <h1 >User Home</h1>
          </Grid>

          <Grid xs={2} item className={style.center}>
            <button>Logout</button>
          </Grid>
        </Grid>
      </header>
      <SearchInput />
    </div>
  );
};
export default UserHome;
