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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import { useAppDispatch, useAppSelector } from "../redux/hooks";
//  import reducer and state selector
import { selectMusicApp, setPlaylists } from "../redux/musicAppSlice";


const PlaylistCard = ({ playlistName }: any, { songs }: any ) => {

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
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


  const classes = useStyles();
  const body = ( 
    <div>
      <h2 id="simple-modal-title">
        { playlistName }
      </h2>
        Track List
    </div>
  );

  console.log(songs);
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
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div>
            <h2>
              { playlistName }              
            </h2>

                
          </div>
          <Button>Delete Playlist</Button>
        </Dialog>
    </Card>
  );
};

export default PlaylistCard;
