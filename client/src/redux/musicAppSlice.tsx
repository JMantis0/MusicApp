import {
  // createAsyncThunk,
  createSlice,
  //  PayloadAction
} from "@reduxjs/toolkit";
import {
  RootState,
  //  AppThunk
} from "./store";

export interface MusicAppState {
  album: { albumId: string; title: string; cover: string };
  artist: { artistId: string; name: string; picture: string };
  playlists: Array<{
    username: string;
    playlistName: string;
    songs: Array<{
      songId: string;
      title: string;
      preview: string;
      artist: { artistId: string; name: string; picture: string };
      album: { albumId: string; title: string; cover: string };
    }>;
  }>;
  playlist: {
    username: string;
    playlistName: string;
    songs: Array<{
      songId: string;
      title: string;
      preview: string;
      artist: { artistId: string; name: string; picture: string };
      album: { albumId: string; title: string; cover: string };
    }>;
  };
  song: {
    songId: string;
    title: string;
    preview: string;
    artist: { artistId: string; name: string; picture: string };
    album: { albumId: string; title: string; cover: string };
  };
  user: {
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
  };
  searchInput: string;
  loginForm: { username: string; password: string };
  deezerData: object;
}

const initialState: MusicAppState = {
  album: { albumId: "", title: "", cover: "" },
  artist: { artistId: "", name: "", picture: "" },
  playlist: {
    username: "",
    playlistName: "",
    songs: [],
  },
  playlists: [],
  song: {
    songId: "",
    title: "",
    preview: "",
    artist: { artistId: "", name: "", picture: "" },
    album: { albumId: "", title: "", cover: "" },
  },
  user: {
    userId: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  },
  searchInput: "",
  loginForm: { username: "", password: "" },
  deezerData: {},
};

export const musicAppSlice = createSlice({
  name: "musicApp",
  initialState,
  reducers: {
    setAlbum: (
      state,
      action: { payload: { albumId: string; title: string; cover: string } }
    ) => {
      console.log("Dispatching setAlbum reducer with action: ", action);
      state.album = action.payload;
    },
    setArtist: (
      state,
      action: { payload: { artistId: string; name: string; picture: string } }
    ) => {
      console.log("Dispatching setArtist reducer with action: ", action);
      state.artist = action.payload;
    },
    setPlaylists: (
      state,
      action: {
        payload: Array<{
          username: string;
          playlistName: string;
          songs: Array<{
            songId: string;
            title: string;
            preview: string;
            artist: { artistId: string; name: string; picture: string };
            album: { albumId: string; title: string; cover: string };
          }>;
        }>;
      }
    ) => {
      console.log("Dispatching setPlaylists reducer with action: ", action);
      state.playlists = action.payload;
    },
    addPlaylist: (
      state,
      action: {
        payload: {
          username: string;
          playlistName: string;
          songs: Array<{
            songId: string;
            title: string;
            preview: string;
            artist: { artistId: string; name: string; picture: string };
            album: { albumId: string; title: string; cover: string };
          }>;
        };
      }
    ) => {
      console.log("Dispatching addPlaylist reducer with action: ", action);
      state.playlists = [...state.playlists, action.payload];
    },
    setSong: (
      state,
      action: {
        payload: {
          songId: string;
          title: string;
          preview: string;
          artist: { artistId: string; name: string; picture: string };
          album: { albumId: string; title: string; cover: string };
        };
      }
    ) => {
      console.log("Dispatching setSong reducer with action: ", action);
      state.song = action.payload;
    },
    setUser: (
      state,
      action: {
        payload: {
          userId: string;
          firstName: string;
          lastName: string;
          username: string;
          password: string;
        };
      }
    ) => {
      console.log("Dispatching setUser reducer with action: ", action);
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = {
        userId: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      };
    },
    setLoginForm: (
      state,
      action: { payload: { fieldName: string; value: string } } 
    ) => {
      console.log("Dispatching setLoginForm reducer with action: ", action);
      const fieldName = action.payload.fieldName;
      const value = action.payload.value;
      console.log(`Setting ${fieldName} to ${value}`);
      state.loginForm = { ...state.loginForm, [fieldName]: value };
    },
    resetLoginForm: (state) => {
      console.log(
        "Dispatching resetLoginForm reducer with action with no action."
      );
      state.loginForm.username = "";
      state.loginForm.password = "";
    },
    setSearchInput: (state, action: { payload: string }) => {
      console.log("Dispatching setSearchInput with action: ", action);
      state.searchInput = action.payload;
    },
    setDeezerData: (state, action: { payload: object }) => {
      console.log("Dispatching setDeezerData reducer with action: ", action);
      state.deezerData = action.payload;
    },
  },
});

export const {
  setAlbum,
  setArtist,
  addPlaylist,
  setPlaylists,
  setSong,
  setUser,
  logoutUser,
  setLoginForm,
  resetLoginForm,
  setSearchInput,
  setDeezerData,
} = musicAppSlice.actions;

export const selectMusicApp = (state: RootState) => state.musicApp;

export default musicAppSlice.reducer;
