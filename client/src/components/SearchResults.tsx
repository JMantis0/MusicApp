import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
//  import redux state hooks
import { useAppDispatch, useAppSelector } from "../redux/hooks";
//  import reducer and state selector
import { selectMusicApp, setDeezerData } from "../redux/musicAppSlice";

const SearchResults = () => {
  // This is how to hook into the redux state.
  const musicAppState = useAppSelector(selectMusicApp);
  // This is how to hook into the dispatcher.
  const dispatch = useAppDispatch();

  //  Define function to call deezerAPI with string from the searchInput.
  const handleSearch = () => {
    const queryString = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${musicAppState.searchInput}`;
    axios
      .get(queryString)
      .then((response) => {
        console.log("response", response);
        const deezerData = response.data.data;
        //  Dispatch the setDeezerData reducer to save data to the state
        dispatch(setDeezerData(deezerData));
        //  Check your redux devtools to see the data
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
  };
  return (
    <React.Fragment>
      <Button color="primary" variant="contained" onClick={handleSearch}>
        Search Music
      </Button>
    </React.Fragment>
  );
};

export default SearchResults;
