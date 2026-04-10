import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  playPause,
  setTime,
  changeVolume,
  toggleMute,
  nextRepeatMode,
  setPlaybackRate,
  seekForward,
  seekBackward,
} from "../features/player/playerSlice";

const Player = () => {
  const dispatch = useDispatch();

  const {
    isPlaying,
    currentTime,
    maxTime,
    volume,
    isMuted,
    playbackRate,
    repeatMode,
  } = useSelector((state) => state.player);

  return (
    <div className="player">
      <h1>Music Player</h1>

      <p>Status: {isPlaying ? "Playing" : "Paused"}</p>
      <p>
        Time: {currentTime} / {maxTime}
      </p>
      <p>Volume: {volume}</p>
      <p>Muted: {isMuted ? "Yes" : "No"}</p>
      <p>Playback Rate: {playbackRate}</p>
      <p>Repeat Mode: {repeatMode}</p>

      <div className="buttons">
        <button onClick={() => dispatch(playPause())}>Play / Pause</button>
        <button onClick={() => dispatch(seekBackward(10))}>-10 sec</button>
        <button onClick={() => dispatch(seekForward(10))}>+10 sec</button>
        <button onClick={() => dispatch(toggleMute())}>Mute</button>
        <button onClick={() => dispatch(nextRepeatMode())}>
          Next Repeat Mode
        </button>
      </div>

      <div className="buttons">
        <button onClick={() => dispatch(setTime(45))}>Set Time 45</button>
        <button onClick={() => dispatch(changeVolume(30))}>Volume 30</button>
        <button onClick={() => dispatch(changeVolume(0))}>Volume 0</button>
        <button onClick={() => dispatch(setPlaybackRate(1.25))}>
          Speed 1.25
        </button>
      </div>
    </div>
  );
};

export default Player;
