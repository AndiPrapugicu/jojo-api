import { useState, useEffect, useRef } from "react";
import awakenAudio from "./Songs/awaken.mp3";
import standAudio from "./Songs/standproud.mp3";
import bloodyAudio from "./Songs/bloodystream.mp3";
import "./Music.css";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState(awakenAudio);
  const [volumeMap, setVolumeMap] = useState({
    [awakenAudio]: 0.5,
    [bloodyAudio]: 0.5,
    [standAudio]: 0.5,
  });
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const newVolume = volumeMap[selectedSong];
      if (!isNaN(newVolume) && newVolume >= 0 && newVolume <= 1) {
        audioRef.current.volume = newVolume;
        if (isPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
    }

    localStorage.setItem(
      "musicState",
      JSON.stringify({ isPlaying, selectedSong, volumeMap })
    );
  }, [isPlaying, selectedSong, volumeMap]);

  useEffect(() => {
    const savedState = localStorage.getItem("musicState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setIsPlaying(parsedState.isPlaying);
      setSelectedSong(parsedState.selectedSong);
      setVolumeMap(parsedState.volumeMap);
    }
  }, []);

  const toggleAudio = (song) => {
    if (selectedSong === song) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedSong(song);
      setIsPlaying(true);
      audioRef.current.src = song;
      audioRef.current.play();
    }
  };

  const getVolumeColor = (volume) => {
    if (volume > 0.525) {
      return "high-volume";
    } else if (volume < 0.475) {
      return "low-volume";
    } else {
      return "medium-volume";
    }
  };

  const handleVolumeChange = (song, newVolume) => {
    if (!isNaN(newVolume)) {
      setVolumeMap((prevVolumeMap) => ({
        ...prevVolumeMap,
        [song]: newVolume,
      }));
    }
  };

  return (
    <div className="music">
      <div>Select Song:</div>
      <div className="song-list">
        <div className="song" id="song">
          Awaken
          <div
            className="music-button"
            onClick={() => {
              toggleAudio(awakenAudio);
              setSelectedSong(awakenAudio);
              setIsPlaying(!isPlaying);
            }}
          >
            {selectedSong === awakenAudio && isPlaying ? (
              <BsFillPauseFill />
            ) : (
              <BsFillPlayFill />
            )}
          </div>
          <input
            type="range"
            value={volumeMap[awakenAudio]}
            min="0"
            max="1"
            step="0.01"
            className={`volume-slider ${getVolumeColor(
              volumeMap[awakenAudio]
            )}`}
            onChange={(e) =>
              handleVolumeChange(awakenAudio, parseFloat(e.target.value))
            }
          />
        </div>
        <div className="song" id="song">
          Bloody Stream
          <BsFillPlayFill
            className="music-button"
            onClick={() => toggleAudio(bloodyAudio)}
          >
            {selectedSong === bloodyAudio && isPlaying ? (
              <BsFillPauseFill />
            ) : (
              <BsFillPlayFill />
            )}
          </BsFillPlayFill>
          <input
            type="range"
            value={volumeMap[bloodyAudio]}
            min="0"
            max="1"
            step="0.01"
            className={`volume-slider ${getVolumeColor(
              volumeMap[bloodyAudio]
            )}`}
            onChange={(e) =>
              handleVolumeChange(bloodyAudio, parseFloat(e.target.value))
            }
          />
        </div>
        <div className="song" id="song">
          Stand Proud
          <div className="music-button" onClick={() => toggleAudio(standAudio)}>
            {selectedSong === standAudio && isPlaying ? (
              <BsFillPauseFill />
            ) : (
              <BsFillPlayFill />
            )}
          </div>
          <input
            type="range"
            value={volumeMap[standAudio]}
            min="0"
            max="1"
            step="0.01"
            className={`volume-slider ${getVolumeColor(volumeMap[standAudio])}`}
            onChange={(e) =>
              handleVolumeChange(standAudio, parseFloat(e.target.value))
            }
          />
        </div>
      </div>
      <audio id="song" ref={audioRef} loop>
        <source src={selectedSong} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Music;
