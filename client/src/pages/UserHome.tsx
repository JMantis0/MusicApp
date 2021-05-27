import React, { useMemo } from "react";
import axios from "axios";
import SearchInput from "../components/SearchInput";
import Grid from "@material-ui/core/Grid";
import style from "../MusicApp.module.css";
import LogoutButton from "../components/LogoutButton";
import SearchDeezerButton from "../components/SearchDeezerButton";
import CreateNewPlaylistForm from "../components/CreateNewPlaylistForm";
import PlaylistCard from "../components/PlaylistCard";
import DeezerResultsViewer from "../components/DeezerResultsViewer";
import UserProfile from "../components/UserProfile";
//  import redux state hooks
import { useAppDispatch, useAppSelector } from "../redux/hooks";
//  import reducer and state selector
import { selectMusicApp, setPlaylists, setUser } from "../redux/musicAppSlice";
import { Typography } from "@material-ui/core";

const UserHome = () => {
  // This is how to hook into the redux state.
  const musicAppState = useAppSelector(selectMusicApp);
  // This is how to hook into the dispatcher.
  const dispatch = useAppDispatch();
  const getPlaylists = () => {
    const queryString = `http://localhost:8080/api/read/playlist/user`;

    const body = {
      params: {
        username: musicAppState.user.username,
      },
    };
    axios
      .get(queryString, body)
      .then((response) => {
        console.log("response", response);
        const playlistData = response.data;
        //  Dispatch the setPlaylistData reducer to save data to the state
        dispatch(setPlaylists(playlistData));
        //  Check your redux devtools to see the data
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
  };

  useMemo(() => {
    getPlaylists();
  }, []);

  return (
    <div className={style.greyBackground}>
      <header>
        <Grid container>
        <Grid className={style.center} xs={1} item></Grid>
          <Grid xs={9} item>
            <h1>Welcome {musicAppState.user.firstName}. </h1>
          </Grid>
          <Grid className={style.center} xs={2} item>
            <UserProfile />
          </Grid>
        </Grid>
      </header>

      <div className={style.horizontalLine}></div>

      <main>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid className={style.center} item xs={4}>
            <SearchInput />
            <SearchDeezerButton />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2}></Grid>

          <Grid className={style.center} item xs={8}>
            <fieldset className={style.fieldSet}>
              <legend className={style.legend}>
                {musicAppState.user.firstName}'s Playlists
              </legend>
              <Grid container>
                {musicAppState.playlists.map((playlist) => (
                  <Grid item xs={2}>
                    <PlaylistCard
                      className={style.playlistCard}
                      key={playlist.playlistId}
                      playlist={playlist}
                    />
                  </Grid>
                ))}
              </Grid>
            </fieldset>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <Grid container>
          <Grid className={style.center} item xs={1}></Grid>

          <Grid className={style.center} item xs={10}>
            <DeezerResultsViewer />
          </Grid>
          <Grid className={style.center} item xs={1}></Grid>
        </Grid>
      </main>
    </div>
  );
};
export default UserHome;
