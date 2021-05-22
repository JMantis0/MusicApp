import React, {useState} from "react";
import axios from 'axios';
import SearchInput from "../components/SearchInput";
import Grid from "@material-ui/core/Grid";
import style from "../MusicApp.module.css";
import LogoutButton from "../components/LogoutButton";
import SearchDeezerButton from "../components/SearchDeezerButton";
import CreateNewPlaylistForm from "../components/CreateNewPlaylistForm";
import PlaylistCard from "../components/PlaylistCard";

//  import redux state hooks
import { useAppDispatch, useAppSelector } from "../redux/hooks";
//  import reducer and state selector
import {selectMusicApp, setPlaylists} from '../redux/musicAppSlice'
import { Playlist } from "../redux/pojos";

const UserHome = () => {
  // This is how to hook into the redux state.
  const musicAppState = useAppSelector(selectMusicApp);
  // This is how to hook into the dispatcher.
  const dispatch = useAppDispatch();
  const [playlists, setPlaylists] = useState<typeof Playlist[]>([]);

  const getPlaylists = () => {
    const queryString = `https://localhost:8080/read_playlists`;
    axios
      .get(queryString)
      .then((response) => {
        console.log("response", response);
        const playlistData = response.data.data;
        //  Dispatch the setPlaylistData reducer to save data to the state
        // dispatch(setPlaylists(playlistData));
        //  Check your redux devtools to see the data
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
  };

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
          <Grid className={style.center} item xs={2}>
            side section
          </Grid>
          <Grid>
            {playlists.map( (playlist: typeof Playlist) =>
              <PlaylistCard />            
            )}
          </Grid>
          <Grid className={style.center} item xs={10}></Grid>
          <Grid className="" item xs={10}></Grid>
        </Grid>
      </main>
    </div>
  );
};
export default UserHome;
