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
    playlistId: string;
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
  playlist: string;
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
  userCreateForm: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
  };
  deezerData: any;
}

const initialState: MusicAppState = {
  album: { albumId: "", title: "", cover: "" },
  artist: { artistId: "", name: "", picture: "" },
  playlist: "",
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
  userCreateForm: { firstName: "", lastName: "", username: "", password: "" },
  deezerData: [],
};
export const musicAppSlice = createSlice({
  name: "musicApp",
  initialState,
  reducers: {
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
          playlistId: string;
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
      console.log("Dispatching setUser reducer with no action");
      state.album = { albumId: "", title: "", cover: "" };
      state.artist = { artistId: "", name: "", picture: "" };
      state.playlist = "";
      state.playlists = [];
      state.song = {
        songId: "",
        title: "",
        preview: "",
        artist: { artistId: "", name: "", picture: "" },
        album: { albumId: "", title: "", cover: "" },
      };
      state.user = {
        userId: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      };
      state.searchInput = "";
      state.loginForm = { username: "", password: "" };
      state.userCreateForm = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      };
      state.deezerData = [];
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
    setCreateUserForm: (
      state,
      action: { payload: { fieldName: string; value: string } }
    ) => {
      const fieldName = action.payload.fieldName;
      const value = action.payload.value;
      console.log(`Setting ${fieldName} to ${value}`);
      state.userCreateForm = { ...state.userCreateForm, [fieldName]: value };
    },
    resetCreateUserForm: (state) => {
      console.log(
        "Dispatching resetLoginForm reducer with action with no action."
      );
      state.userCreateForm.firstName = "";
      state.userCreateForm.lastName = "";
      state.userCreateForm.username = "";
      state.userCreateForm.password = "";
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
  addPlaylist,
  setPlaylist,
  setPlaylists,
  setSong,
  setUser,
  logoutUser,
  setLoginForm,
  resetCreateUserForm,
  setCreateUserForm,
  resetLoginForm,
  setSearchInput,
  setDeezerData,
} = musicAppSlice.actions;

export const selectMusicApp = (state: RootState) => state.musicApp;

export default musicAppSlice.reducer;
