import React, { useMemo } from "react";
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
  const musicAppState = useAppSelector(selectMusicApp);
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    console.log("event: ", event);
    const playlistName = event.target.value;
    dispatch(setPlaylist(playlistName));
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Playlist</InputLabel>
        <Select
          value={musicAppState.playlist}
          onChange={(event) => {
            console.log("change");
            handleChange(event);
          }}
        >
          <MenuItem value="">Select</MenuItem>
          {musicAppState.playlists.map((playlist) => {
            return (
              <MenuItem key={playlist.playlistId} value={playlist.playlistName}>
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
