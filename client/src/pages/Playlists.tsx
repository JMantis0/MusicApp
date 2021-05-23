import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  selectMusicApp,
} from "../redux/musicAppSlice";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import style from "../MusicApp.module.css";
import AddToPlaylistButton from "../components/AddToPlaylistButton";

const Playlists = ()=>{
    const musicAppState = useAppSelector(selectMusicApp);
    const dispatch = useAppDispatch();
    const history = useHistory();
  
    // const formChangeHandler = (event: any) => {
    //   const fieldName = event.target.name;
    //   const value = event.target.value;
    //   dispatch(setLoginForm({ fieldName, value }));
    // };
  
    // const addToPlayList = () => {
    //   axios
    //     .post("/api/login", musicAppState.loginForm)
    //     .then((response) => {
    //       console.log("The response is: ", response);
    //       history.push("/user_home");
    //     })
    //     .catch((err) => {
    //       console.log("There was an error");
    //       dispatch(resetLoginForm());
    //       //  For now a bad login redirects to user home anyways
    //       history.push("/user_home");
    //     });
    // };
  
    return(
        <div>
        <header>
            <Grid container>
            <Paper className={style.paperPadding}>
            <h1 className={style.center}>Music App</h1>
        <FormControl component="fieldset">
          <FormLabel component="legend">PLaylists</FormLabel>
          <TextField
            className={style.marginTop}
            autoComplete="off"
            type="text"
            label="Name"
            variant="outlined"
            // name="userID"
            // onChange={formChangeHandler}
          />
          {/* <Button
            className={style.marginTop}
            color="primary"
            variant="contained"
            // onClick={submitLogin}
          > */}
          <AddToPlaylistButton />
          {/* </Button> */}
        </FormControl>
      </Paper>
                </Grid>
            </header>
        </div>
    )
}

export default Playlists;