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
import {
  musicAppSlice,
  selectMusicApp,
  setPlaylists,
} from "../redux/musicAppSlice";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import TableCell from "@material-ui/core/TableCell";

const PlaylistCard = ({ playlist }: any) => {
  const [songs, setSongs] = React.useState(playlist.songs);
  const [open, setOpen] = React.useState(false);
  const musicAppState = useAppSelector(selectMusicApp);

  useEffect(() => {
    setSongs(playlist.songs);
  }, [musicAppState]);

  const dispatch = useAppDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePlaylist = () => {
    const queryString = `http://localhost:8080/api/delete/playlist`;
    const body = {
      params: {
        playlistId: playlist.playlistId,
      },
    };
    console.log(body);
    axios
      .delete(queryString, body)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          const playlistData = response.data;
          dispatch(setPlaylists(playlistData));
        }
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
    handleClose();
  };

  const deleteSongFromPlaylist = (event: any, song: any) => {
    const queryString = `http://localhost:8080/api/delete/playlist/song`;
    const body = {
      params: {
        playlistId: playlist.playlistId,
        songId: song.songId,
      },
    };
    console.log(body);
    axios
      .delete(queryString, body)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          console.log(response.data);
          const songData = response.data.songs;
          setSongs(songData);
        }
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
  };

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
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>{playlist.playlistName}</DialogTitle>
        <DialogContent>
          <TableContainer>
            <TableBody>
              {songs.map((song: any) => (
                <TableRow>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>
                    <img src={song.album.cover}></img>
                  </TableCell>
                  <TableCell>
                    <figure>
                      <audio controls src={song.preview}>
                        Your browser does not support the
                        <code>audio</code> element.
                      </audio>
                    </figure>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={(event) => {
                        deleteSongFromPlaylist(event, song);
                      }}
                    >
                      <DeleteForeverOutlinedIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </DialogContent>

        <Button onClick={deletePlaylist}>Delete Playlist</Button>
      </Dialog>
    </Card>
  );
};

export default PlaylistCard;
