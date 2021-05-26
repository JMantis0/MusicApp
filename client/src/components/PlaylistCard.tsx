import React, { useState, useEffect } from "react";
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

import {PlaylistModal} from './PlaylistModal';
// interface PlaylistProps{
//     playlist: Playlist;
// }

const PlaylistCard = ({ playlistName }: any, { playlistId }: any) => {
  
  const inputRef = React.createRef();

  const handleClick = () => {
    alert("You clicked on " + playlistName + " playlist.");
  };



  return (
    <Card>
      <CardActionArea>
        <CardMedia />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            onClick={handleClick}
          >
            {playlistName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View Playlist
        </Button>
        <Button size="small" color="primary">
          Delete Playlist
        </Button>
      </CardActions>
      <PlaylistModal />
    </Card>
  );
};

export default PlaylistCard;
