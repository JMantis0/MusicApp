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
  currentUserFavorites: Array<{}>,
  searchInputState: string;
}

const initialState: MusicAppState = {
  currentUserState: {
    firstName: "",
    lastName: "",
    userID: "",
    password: "",
    id: { timestamp: null, date: null },
  },
  currentUserFavorites: [],
  searchInputState: "",
};

export const musicAppSlice = createSlice({
  name: "musicApp",
  initialState,
  reducers: {
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
  },
});

export const { setCurrentUserState, resetCurrentUserState, setSearchInputState } =
  musicAppSlice.actions;

export const selectMusicApp = (state: RootState) => state.musicApp;

export default musicAppSlice.reducer;