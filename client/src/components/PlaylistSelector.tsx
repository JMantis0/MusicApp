import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//  import redux state hooks
import { useAppDispatch, useAppSelector } from "../redux/hooks";
//  import reducer and state selector
import { selectMusicApp, setPlaylist } from "../redux/musicAppSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const PlaylistSelector = () => {
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    console.log("event: ", event);
    const selectedPlaylist = JSON.parse(event.target.value);
    console.log("selectedPlaylist in redux shall be: ", selectedPlaylist);
    dispatch(setPlaylist(selectedPlaylist));
  };
  const musicAppState = useAppSelector(selectMusicApp);
  const dispatch = useAppDispatch();
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Playlist</InputLabel>
        <Select
          value={musicAppState.playlist.playlistName}
          onChange={handleChange}
        >
          {musicAppState.playlists.map((playlist) => {
            return (
              <MenuItem value={JSON.stringify(playlist)}>
                {playlist.playlistName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default PlaylistSelector;
