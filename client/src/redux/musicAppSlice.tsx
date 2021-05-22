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
  album: { albumId: string; title: string; cover: string };
  artist: { artistId: string; name: string; picture: string };
  playlists: Array<
    Array<{
      trackId: string;
      title: string;
      preview: string;
      artist: { artistId: string; name: string; picture: string };
      album: { albumId: string; title: string; cover: string };
    }>
  >;
  playlist: Array<{
    trackId: string;
    title: string;
    preview: string;
    artist: { artistId: string; name: string; picture: string };
    album: { albumId: string; title: string; cover: string };
  }>;
  track: {
    trackId: string;
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
  loginForm: { username: string | null; password: string | null };
  deezerData: object;
}

const initialState: MusicAppState = {
  album: { albumId: "", title: "", cover: "" },
  artist: { artistId: "", name: "", picture: "" },
  playlist: [],
  playlists: [],
  track: {
    trackId: "",
    title: "",
    preview: "",
    artist: { artistId: "", name: "", picture: "" },
    album: { albumId: "", title: "", cover: "" },
  },
  user: {
    userId: "testuserid",
    firstName: "testfirstname",
    lastName: "testlastname",
    username: "testusername",
    password: "testpassword",
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
      state.album = action.payload;
    },
    setArtist: (
      state,
      action: { payload: { artistId: string; name: string; picture: string } }
    ) => {
      state.artist = action.payload;
    },
    setPlaylists: (
      state,
      action: {
        payload: Array<
          Array<{
            trackId: string;
            title: string;
            preview: string;
            artist: { artistId: string; name: string; picture: string };
            album: { albumId: string; title: string; cover: string };
          }>
        >;
      }
    ) => {
      state.playlists = action.payload;
    },
    setTrack: (
      state,
      action: {
        payload: {
          trackId: string;
          title: string;
          preview: string;
          artist: { artistId: string; name: string; picture: string };
          album: { albumId: string; title: string; cover: string };
        };
      }
    ) => {
      state.track = action.payload;
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
