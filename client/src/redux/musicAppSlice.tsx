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
  playlists: Array<typeof Playlist> | null;
  track: typeof Track | null;
  user: InstanceType<typeof User>
  searchInput: string;
  loginForm: { username: string | null; password: string | null };
  deezerData: object;
}

const initialState: MusicAppState = {
  album: null,
  artist: null,
  playlists: null,
  track: null,
  user: new User("","","","",""),
  searchInput: "",
  loginForm: { username: null, password: null },
  deezerData: {},
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
    setPlaylists: (state, action: { payload: Array<typeof Playlist> }) => {
      state.playlists = action.payload;
    },
    setTrack: (state, action: { payload: typeof Track }) => {
      state.track = action.payload;
    },
    setUser: (state, action: { payload: InstanceType<typeof User> }) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user =new User("","","","",""),
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
    setDeezerData: (state, action: { payload: object }) => {
      state.deezerData = action.payload;
    },
  },
});

export const {
  setAlbum,
  setArtist,
  setPlaylists,
  setTrack,
  setUser,
  logoutUser,
  setLoginForm,
  resetLoginForm,
  setSearchInput,
  setDeezerData,
} = musicAppSlice.actions;

export const selectMusicApp = (state: RootState) => state.musicApp;

export default musicAppSlice.reducer;
