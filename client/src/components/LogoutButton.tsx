import React from "react";
import Button from "@material-ui/core/Button";
import { useAppDispatch } from "../redux/hooks";
import { resetCurrentUserState } from "../redux/musicAppSlice";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const logOut = () => {
    dispatch(resetCurrentUserState());
    history.push("/");
  };
  return <Button onClick={logOut}>Logout</Button>;
};

export default LogoutButton;
