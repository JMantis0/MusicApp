import React from "react";
import SearchInput from "../components/SearchInput";
import Grid from "@material-ui/core/Grid";
import style from "../MusicApp.module.css";
import LogoutButton from "../components/LogoutButton";
import SearchDeezerButton from "../components/SearchDeezerButton";
import CreateNewPlaylistForm from "../components/CreateNewPlaylistForm";

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
          <Grid item xs={6}>
            <Grid container>
              <Grid className={style.center} item xs={12}>
                <SearchInput />
                <SearchDeezerButton />
              </Grid>
              <Grid className={style.center} item xs={12}>
                <CreateNewPlaylistForm />
              </Grid>
            </Grid>
          </Grid>
          <Grid className={style.center} item xs={6}>
            Display section
          </Grid>
          <Grid className={style.center} item xs={10}></Grid>
          <Grid className={style.center} item xs={2}>
            {/* side section */}
          </Grid>
          <Grid className={style.center} item xs={10}></Grid>
          <Grid className="" item xs={10}></Grid>
        </Grid>
      </main>
    </div>
  );
};
export default UserHome;
