import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  setLoginForm,
  resetLoginForm,
  selectMusicApp,
  setUser,
} from "../redux/musicAppSlice";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import style from "../MusicApp.module.css";

const Login = () => {
  const musicAppState = useAppSelector(selectMusicApp);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const formChangeHandler = (event: any) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    dispatch(setLoginForm({ fieldName, value }));
  };

  const submitLogin = () => {
    axios
      .post("http://localhost:8080/api/login", musicAppState.loginForm)
      .then((response) => {
        console.log("The response is: ", response);
        const currentUser = response.data;
        dispatch(setUser(currentUser));
        history.push("/user_home");
      })
      .catch((err) => {
        console.log("There was an error", err);
        dispatch(resetLoginForm());
        alert("Invalid Credentials");
      });
  };

  return (
    <Grid
      container
      className={`${style.center} ${style.fitViewHeight} ${style.blackBackground}`}
    >
      <Paper className={style.paperPadding}>
        <h1 className={style.center}>Music App</h1>
        <FormControl component="fieldset">
          <FormLabel component="legend">Login</FormLabel>
          <TextField
            className={style.marginTop}
            autoComplete="off"
            type="text"
            label="Username"
            variant="outlined"
            name="username"
            onChange={formChangeHandler}
          />
          <TextField
            className={style.marginTop}
            autoComplete="off"
            type="password"
            label="Password"
            variant="outlined"
            name="password"
            onChange={formChangeHandler}
          />
          <Button
            className={style.marginTop}
            color="primary"
            variant="contained"
            onClick={submitLogin}
          >
            Submit
          </Button>
        </FormControl>
      </Paper>
    </Grid>
  );
};

export default Login;
