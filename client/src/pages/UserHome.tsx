import React, { useState, useMemo } from "react";
import axios from "axios";
import SearchInput from "../components/SearchInput";
import Grid from "@material-ui/core/Grid";
import style from "../MusicApp.module.css";
import LogoutButton from "../components/LogoutButton";
import SearchDeezerButton from "../components/SearchDeezerButton";
import CreateNewPlaylistForm from "../components/CreateNewPlaylistForm";
import PlaylistCard from "../components/PlaylistCard";
import DeezerResultsViewer from "../components/DeezerResultsViewer";
import SampleTable from "../components/SampleTable";
//  import redux state hooks
import { useAppDispatch, useAppSelector } from "../redux/hooks";
//  import reducer and state selector
import { selectMusicApp, setPlaylists, setUser } from "../redux/musicAppSlice";
import { Playlist } from "../redux/pojos";

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
          <Grid className={style.center} item xs={6}></Grid>
          <Grid className={style.center} item xs={10}>
            <DeezerResultsViewer />
          </Grid>
          <Grid className={style.center} item xs={2}>
            {/* side section */}
          </Grid>
          <Grid className={style.center} item xs={2}>
            side section
          </Grid>
          <Grid>
            {musicAppState.playlists.map((playlist) => (
              <PlaylistCard
                playlistName={playlist.playlistName}
                key={playlist.playlistName}
              />
            ))}
          </Grid>
          <Grid className={style.center} item xs={10}></Grid>
          <Grid className="" item xs={10}>
            {/* <SampleTable />  */}
          </Grid>
        </Grid>
      </main>
    </div>
  );
};
export default UserHome;
