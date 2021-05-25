import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
//  import reducer and state selector
import { musicAppSlice, selectMusicApp, setPlaylists } from "../redux/musicAppSlice";

const PlaylistCard = ({ playlist }: any) => {
  const songs = playlist.songs;
  // const musicAppState = useAppSelector(selectMusicApp);
  const [open, setOpen] = React.useState(false);
  // const [playlistSongs, setPlaylistSongs] = React.useState();
  // const dispatch = useAppDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSongs = (arr: any) => {
  //   setPlaylistSongs(arr);
  // }

  const deletePlaylist = () => {
    const queryString = `http://localhost:8080/api/delete/playlist`;
    const body = {
      params: {
        "playlistId": playlist.playlistId,
      },
    };
    console.log(body);
    axios
      .delete(queryString, body)
      .then((response) => {
        console.log("response", response);
        if(response.status === 200){
          // does not refresh the current list of playlists
          alert("woo hoo!");
        }
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
    handleClose();
  };

  const useStyles = makeStyles((theme) => ({
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: 900,
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 500,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  }));
  
  return (
    <Card>
      <CardActionArea>
        <CardMedia />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            onClick={handleOpen}
          >
            {playlist.playlistName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <h3>{playlist.playlistName}</h3>
        </div>
        <div>
          {songs.map((song: any) =>
            <p>{song.title}</p>            
            )}
        </div>
        <Button onClick={deletePlaylist}>Delete Playlist</Button>
      </Dialog>
    </Card>
  );
};

export default PlaylistCard;
