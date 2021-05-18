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
  searchInputState: "",
};

export const musicAppSlice = createSlice({
  name: "musicApp",
  initialState,
  reducers: {
    setCurrentUserState: (state, action) => {
      console.log("action", action);
      console.log("action.payload", action.payload);
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
      state.currentUserState = action.payload;
    },
  },
});

export const { setCurrentUserState, resetCurrentUserState, setSearchInputState } =
  musicAppSlice.actions;

export const selectMusicApp = (state: RootState) => state.musicApp;

export default musicAppSlice.reducer;