import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//  import redux state hooks
import { useAppDispatch, useAppSelector } from "../redux/hooks";
//  import reducer and state selector
import { selectMusicApp, setPlaylists } from "../redux/musicAppSlice";


const PlaylistCard = ({ playlistName }: any, { playlistId }: any) => {
  const musicAppState = useAppSelector(selectMusicApp);
  const dispatch = useAppDispatch();
  const [modalStyle] = React.useState(getModalStyle);
 

  const getPlaylistSongs = () => {
    const queryString = `http://localhost:8080/api/read/playlist/song`;

    const body = {
      params: {
        playlistId: musicAppState.playlist.playlistId,
      },
    };
    axios
      .get(queryString, body)
      .then((response) => {
        console.log("response", response.data.data);
        // const playlistSongData = response.data;
        //  Dispatch the setPlaylistData reducer to save data to the state
        // dispatch(setPlaylistSongData(playlistSongData));
        //  Check your redux devtools to see the data
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
  };

  useMemo(() => {
    getPlaylistSongs();
  }, []);
  
  const handleClick = () => {
    alert("You clicked on " + playlistName + " playlist.");
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  
  };
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }),
  );
   const classes = useStyles();
  const body = ( 
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">
          { playlistName }
        </h2>
      {
      <p id="simple-modal-description">
          Playlist Tracks
      </p>
      }
    </div>
  );

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
            {playlistName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
        </Button>
        <Button size="small" color="primary">
        </Button>
      </CardActions>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
    </Card>
  );
};

export default PlaylistCard;
