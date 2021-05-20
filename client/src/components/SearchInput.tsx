import React from "react";
import { selectMusicApp, setSearchInput } from "../redux/musicAppSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import TextField from "@material-ui/core/TextField";

const SearchInput = () => {
  const musicAppState = useAppSelector(selectMusicApp);
  const dispatch = useAppDispatch();

  const inputChangeHandler = (event: { target: { name: any; value: any } }) => {
    const newValue = event.target.value;
    dispatch(setSearchInput(newValue));
  };

  return (
    <React.Fragment>
      <TextField
        label="Search"
        variant="outlined"
        helperText="pre-backend"
        name="searchInput"
        value={musicAppState.searchInput}
        onChange={inputChangeHandler}
      />
    </React.Fragment>
  );
};

export default SearchInput;
