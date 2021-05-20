import {
  // createAsyncThunk,
  createSlice,
  //  PayloadAction
} from "@reduxjs/toolkit";
import {
  RootState,
  //  AppThunk
} from "./store";

import { Album, Artist, Playlist, Track, User } from "./pojos";

export interface MusicAppState {
  album: typeof Album | null;
  artist: typeof Artist | null;
  playlist: typeof Playlist | null;
  track: typeof Track | null;
  user: typeof User | null;
  searchInput: string | null;
  loginForm: { username: string | null; password: string | null };
}

const initialState: MusicAppState = {
  album: null,
  artist: null,
  playlist: null,
  track: null,
  user: null,
  searchInput: null,
  loginForm: { username: null, password: null },
};

export const musicAppSlice = createSlice({
  name: "musicApp",
  initialState,
  reducers: {
    setAlbum: (state, action: { payload: typeof Album }) => {
      state.album = action.payload;
    },
    setArtist: (state, action: { payload: typeof Artist }) => {
      state.artist = action.payload;
    },
    setPlaylist: (state, action: { payload: typeof Playlist }) => {
      state.playlist = action.payload;
    },
    setTrack: (state, action: { payload: typeof Track }) => {
      state.track = action.payload;
    },
    setUser: (state, action: { payload: typeof User }) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    setLoginForm: (
      state,
      action: { payload: { fieldName: string; value: string } }
    ) => {
      const fieldName = action.payload.fieldName;
      const value = action.payload.value;
      state.loginForm = { ...state.loginForm, [fieldName]: value };
    },
    resetLoginForm: (state) => {
      state.loginForm.username = null;
      state.loginForm.password = null;
    },
    setSearchInput: (state, action: { payload: string }) => {
      state.searchInput = action.payload;
    },
  },
});

export const {
  setAlbum,
  setArtist,
  setPlaylist,
  setTrack,
  setUser,
  logoutUser,
  setLoginForm,
  resetLoginForm,
  setSearchInput,
} = musicAppSlice.actions;

export const selectMusicApp = (state: RootState) => state.musicApp;

export default musicAppSlice.reducer;
