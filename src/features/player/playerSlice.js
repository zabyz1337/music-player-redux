import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  currentTime: 0,
  maxTime: 180,
  volume: 50,
  isMuted: false,
  previousVolume: 50,
  playbackRate: 1.0,
  repeatMode: "none",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setTime: (state, action) => {
      if (action.payload < 0) {
        state.currentTime = 0;
      } else if (action.payload > state.maxTime) {
        state.currentTime = state.maxTime;
      } else {
        state.currentTime = action.payload;
      }
    },
    seekForward: (state, action) => {
      state.currentTime = Math.min(
        state.currentTime + action.payload,
        state.maxTime,
      );
    },
    seekBackward: (state, action) => {
      state.currentTime = Math.max(state.currentTime - action.payload, 0);
    },
  },
});

export const { playPause, setTime, seekForward, seekBackward } =
  playerSlice.actions;
export default playerSlice.reducer;
