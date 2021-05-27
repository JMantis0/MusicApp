import React from "react";
import Button from "@material-ui/core/Button";
import { useAppDispatch } from "../redux/hooks";
import { logoutUser } from "../redux/musicAppSlice";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const logOut = () => {
    dispatch(logoutUser());
    history.push("/");
  };
  return <Button color="secondary" variant="contained" onClick={logOut}>Log out</Button>;
};

export default LogoutButton;
