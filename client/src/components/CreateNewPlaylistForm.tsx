import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectMusicApp, addPlaylist } from "../redux/musicAppSlice";

const CreateNewPlaylistForm = () => {
  const musicAppState = useAppSelector(selectMusicApp);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const dispatch = useAppDispatch();

  const handleOnChange = (event: { target: { value: string } }) => {
    const newPlaylistName = event.target.value;
    setNewPlaylistName(newPlaylistName);
  };

  const createPlaylistAndStoreToDBAndSetPlaylistState = (event: any) => {
    console.log("event is: ", event);
    const newPlaylist = {
      username: musicAppState.user.username,
      playlistName: newPlaylistName,
      songs: []
    }
    axios.post("http://localhost:8080/api/create_playlist", newPlaylist).then(response => {
      console.log("The Response is: ", response);
      //Here we want to set the state to match the db
      dispatch(addPlaylist(newPlaylist));

    }).catch(error => {
      console.log("There was an error: ", error);
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
