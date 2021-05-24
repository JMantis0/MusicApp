import React, { useState, useMemo } from "react";
import axios from "axios";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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

export const PlaylistModal = React.forwardRef ((props, ref)=> {
    
    const getPlaylists = () => {
        const queryString = `http://localhost:8080/api/read/playlist/song`;
    
        const body = {
          params: {
            playlistId: "9"
          },
        };
        axios
          .get(queryString, body)
          .then((response) => {
            console.log("response", response);
            // const playlistData = response.data;
            //  Dispatch the setPlaylistData reducer to save data to the state
            // dispatch(setPlaylists(playlistData));
            //  Check your redux devtools to see the data
          })
          .catch((error) => {
            console.log("There was an error: ", error);
          });
      };
      useMemo(() => {
        getPlaylists();
      }, []);

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">
            Playlist Name
          </h2>
        <p id="simple-modal-description">
            Playlist Tracks
        </p>
      </div>
    );
  
    return (
      <div>
        <button type="button" onClick={handleOpen}>
        
      </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    );
  })