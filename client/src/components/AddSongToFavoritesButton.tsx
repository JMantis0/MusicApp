import React from "react";
import axios from "axios";

const AddSongToFavoritesButton = () => {
  const saveToFavorites = () => {
    // Perform call to Database here.  Save the Currently Selected song
    // to the current user's favorites.
    const data = {
    }
    axios
      .post("/add_song_to_favorites", data)
      .then((response) => {
        console.log("response", response);
        //update the state here to reflect change in backend
      })
      .catch((error) => {
        console.log("there was an error", error);
      });
  };
  return (
    <div>
      <button onClick={saveToFavorites}>Save to Favorites</button>
    </div>
  );
};

export default AddSongToFavoritesButton;
