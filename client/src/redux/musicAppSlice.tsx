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
  currentUserState: {
    firstName: string;
    lastName: string;
    userID: string;
    password: string;
    id: { timestamp: number | null; date: number | null };
  };
  favoritesState: Array<{}>;
  searchInputState: string;
  loginFormState: { userID: string; password: string };
}

const initialState: MusicAppState = {
  loginFormState: { userID: "", password: "" },
  currentUserState: {
    firstName: "",
    lastName: "",
    userID: "",
    password: "",
    id: { timestamp: null, date: null },
  },
  favoritesState: [],
  searchInputState: "",
};

export const musicAppSlice = createSlice({
  name: "musicApp",
  initialState,
  reducers: {
    setLoginFormState: (state, action) => {
      const fieldName = action.payload.fieldName;
      const value = action.payload.value;
      state.loginFormState = { ...state.loginFormState, [fieldName]: value };
    },
    resetLoginFormState: (state) => {
      state.loginFormState.userID = "";
      state.loginFormState.password = "";
    },
    setCurrentUserState: (state, action) => {
      state.currentUserState = { ...state.currentUserState, ...action.payload };
    },
    resetCurrentUserState: (state) => {
      state.currentUserState = {
        firstName: "",
        lastName: "",
        userID: "",
        password: "",
        id: { timestamp: null, date: null },
      };
    },
    setSearchInputState: (state, action) => {
      state.searchInputState = action.payload;
    },
    setFavoritesState: (state, action) => {
      state.favoritesState = { ...state.favoritesState, ...action.payload };
    },
  },
});

export const {
  setCurrentUserState,
  resetCurrentUserState,
  setSearchInputState,
  setFavoritesState,
  setLoginFormState,
  resetLoginFormState,
} = musicAppSlice.actions;

export const selectMusicApp = (state: RootState) => state.musicApp;

export default musicAppSlice.reducer;
