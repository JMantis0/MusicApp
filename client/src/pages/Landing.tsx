import React from "react";
import style from "../MusicApp.module.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/login");
  };

  return (
    <Grid
      className={`${style.center} ${style.fitViewHeight} ${style.blackBackground}`}
    >
      <Button onClick={handleClick} variant="contained">
        Enter Music App
      </Button>
    </Grid>
  );
};

export default Landing;
