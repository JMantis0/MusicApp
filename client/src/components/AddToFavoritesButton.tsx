import React from "react";
import axios from "axios";
import { selectMusicApp, setFavoritesState } from "../redux/musicAppSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const AddToFavoritesButton = () => {
  const musicAppState = useAppSelector(selectMusicApp);
  const dispatch = useAppDispatch();

  //  Function requests back end to update user's favorites in the db, then
  //  updates client state to reflect the new favorite.
  const saveToFavorites = (event:any) => {
    console.log("Save to favorites button clicked.  The event is: ", event);
    // Perform call to Database here.  Save the Currently Selected song
    // to the current user's favorites.
    const data = {
      //The properties for the 'favorite' to add go here, to be sent in post request.
      //  The favorite is to be saved in the db
    }
    axios
      .post("/add_song_to_favorites", data)
      .then((response) => {
        console.log("response", response);
        const newFavorite = response.data
        //update the state here to reflect that the favorite was added in backend
        //Something like:
        // ***
        dispatch(setFavoritesState(newFavorite));
        // ***

      })
      .catch((error) => {
        //  Error output for debugging
        console.log("There was an error adding to favorite", error);
      });
  };
  return (
    <div>
      <button onClick={saveToFavorites}>Save to Favorites</button>
    </div>
  );
};

export default AddToFavoritesButton;
