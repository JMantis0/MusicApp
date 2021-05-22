import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectMusicApp, setPlaylists } from "../redux/musicAppSlice";

const CreateNewPlaylistForm = () => {
  const musicAppState = useAppSelector(selectMusicApp);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handleOnChange = (event: { target: { value: string } }) => {
    const newPlaylistName = event.target.value;
    setNewPlaylistName(newPlaylistName);
  };

  const createPlaylistAndStoreToDBAndSetPlaylistState = (event: any) => {
    console.log("event is: ", event);
    const data = {
      username: musicAppState.user.username,
      playlistName: newPlaylistName,
      songs: []
    }
    axios.post("http://localhost:8080/api/create_playlist", data).then(response => {
      console.log("The esponse is: ", response);
      //Here we want to set the state to match the db
    }).catch(error => {
      console.log("There was an error: ", error);
      //Don't update the state, probably should toast the client
    })
  };
  return (
    <React.Fragment>
      <TextField
        className=""
        name="newPlaylist"
        autoComplete="off"
        type="text"
        label="Playlist Name"
        onChange={handleOnChange}
        onSubmit={createPlaylistAndStoreToDBAndSetPlaylistState}
      />
      <Button
        variant="outlined"
        color="secondary"
        onClick={createPlaylistAndStoreToDBAndSetPlaylistState}
      >
        Create
      </Button>
    </React.Fragment>
  );
};

export default CreateNewPlaylistForm;
