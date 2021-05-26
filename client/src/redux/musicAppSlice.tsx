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
  album: string;
  artist: string;
  playlists: Array<{
    playlistId: string;
    username: string;
    playlistName: string;
    songs: Array<{
      songId: string;
      title: string;
      preview: string;
      artist: string;
      album: string;
    }>;
  }>;
  playlist: string;
  song: {
    songId: string;
    title: string;
    preview: string;
    artist: string;
    album: string;
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
  deezerData: any;
}

const initialState: MusicAppState = {
  album: "",
  artist: "",
  playlist: "",
  playlists: [],
  song: {
    songId: "",
    title: "",
    preview: "",
    artist: "",
    album: "",
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
  deezerData: [],
};

export const musicAppSlice = createSlice({
  name: "musicApp",
  initialState,
  reducers: {
    setAlbum: (state, action: { payload: string }) => {
      console.log("Dispatching setAlbum reducer with action: ", action);
      state.album = action.payload;
    },
    setArtist: (state, action: { payload: string }) => {
      console.log("Dispatching setArtist reducer with action: ", action);
      state.artist = action.payload;
    },
    setPlaylist: (state, action: { payload: string }) => {
      console.log("Dispatching setPlaylist reducer with action: ", action);
      state.playlist = action.payload;
    },
    setPlaylists: (
      state,
      action: {
        payload: Array<{
          playlistId: string;
          username: string;
          playlistName: string;
          songs: Array<{
            songId: string;
            title: string;
            preview: string;
            artist: string;
            album: string;
          }>;
        }>;
      }
    ) => {
      console.log("Dispatching setPlaylists reducer with action: ", action);
      state.playlists = action.payload
    },
    addPlaylist: (
      state,
      action: {
        payload: {
          playlistId: string;
          username: string;
          playlistName: string;
          songs: Array<{
            songId: string;
            title: string;
            preview: string;
            artist: string;
            album: string;
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
          artist: string;
          album: string;
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
    setDeezerData: (state, action: { payload: any }) => {
      console.log("Dispatching setDeezerData reducer with action: ", action);
      state.deezerData = action.payload;
    },
  },
});

export const {
  setAlbum,
  setArtist,
  addPlaylist,
  setPlaylist,
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
