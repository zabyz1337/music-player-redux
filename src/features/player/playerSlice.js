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

const allowedRates = [0.5, 0.75, 1.0, 1.25, 1.5];

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
    changeVolume: (state, action) => {
      let newVolume = action.payload;

      if (newVolume < 0) newVolume = 0;
      if (newVolume > 100) newVolume = 100;

      state.volume = newVolume;

      if (newVolume === 0) {
        state.isMuted = true;
      } else if (newVolume > 0 && state.isMuted) {
        state.isMuted = false;
      }
    },
    toggleMute: (state) => {
      if (!state.isMuted) {
        state.previousVolume = state.volume;
        state.volume = 0;
        state.isMuted = true;
      } else {
        state.volume = state.previousVolume;
        state.isMuted = false;
      }
    },
    nextRepeatMode: (state) => {
      if (state.repeatMode === "none") {
        state.repeatMode = "one";
      } else if (state.repeatMode === "one") {
        state.repeatMode = "all";
      } else {
        state.repeatMode = "none";
      }
    },
    setPlaybackRate: (state, action) => {
      if (allowedRates.includes(action.payload)) {
        state.playbackRate = action.payload;
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

export const {
  playPause,
  setTime,
  changeVolume,
  toggleMute,
  nextRepeatMode,
  setPlaybackRate,
  seekForward,
  seekBackward,
} = playerSlice.actions;

export default playerSlice.reducer;
