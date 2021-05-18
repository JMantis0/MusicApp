"use strict";
exports.__esModule = true;
var react_1 = require("react");
var axios_1 = require("axios");
var AddSongToFavoritesButton = function () {
    var saveToFavorites = function () {
        // Perform call to Database here.  Save the Currently Selected song
        // to the current user's favorites.
        var data = {};
        axios_1["default"]
            .post("/add_song_to_favorites", data)
            .then(function (response) {
            console.log("response", response);
            //update the state here to reflect change in backend
        })["catch"](function (error) {
            console.log("there was an error", error);
        });
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("button", { onClick: saveToFavorites }, "Save to Favorites")));
};
exports["default"] = AddSongToFavoritesButton;
