import React from "react";
import Link from "@material-ui/core/Link";
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
        // dispatch(resetLoginForm());
        alert("Invalid Credentials");
      });
  };

  const goToCreateNewUser = () => {
    history.push("/user_create");
  };

  return (
    <Grid
      container
      className={`${style.center} ${style.fitViewHeight} ${style.blackBackground}`}
    >
      <Paper className={style.paperPadding}>
        <div className={style.titleDiv}>
          <span className={style.left}>pre-</span>
          <span className={style.bigV}>V</span>
          <span className={style.right}>iew</span>
        </div>
        <div>
          <span className={style.music}>MUSIC APP</span>
        </div>
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
        <Link
          className={`${style.block} ${style.marginTop}`}
          component="button"
          variant="body2"
          onClick={goToCreateNewUser}
        >
          New? Create New User
        </Link>
      </Paper>
    </Grid>
  );
};

export default Login;
