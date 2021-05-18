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
  currentUser: {
    firstName: string;
    lastName: string;
    userID: string;
    password: string;
    id: { timestamp: number | null; date: number | null };
  };
}

const initialState: MusicAppState = {
  currentUser: {
    firstName: "",
    lastName: "",
    userID: "",
    password: "",
    id: { timestamp: null, date: null },
  },
};

export const musicAppSlice = createSlice({
  name: "musicApp",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      console.log("action", action);
      console.log("action.payload", action.payload);
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    resetCurrentUser: (state) => {
      state.currentUser = {
        firstName: "",
        lastName: "",
        userID: "",
        password: "",
        id: { timestamp: null, date: null },
      };
    },
  },
});

export const { setCurrentUser, resetCurrentUser } = musicAppSlice.actions;

export const selectMusicApp = (state: RootState) => state.musicApp;

export default musicAppSlice.reducer;
