import { useState } from "react";
import Profile from "../Login/Profile";
import "./Settings.css";
import Music from "../Music/Music";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineSettings } from "react-icons/md";
import { BsMusicNoteBeamed } from "react-icons/bs";

function Settings() {
  const [showProfile, setShowProfile] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleProfileButtonClick = () => {
    setShowProfile((prevShowProfile) => !prevShowProfile);
  };

  const handleMusicButtonClick = () => {
    setShowMusic((prevShowMusic) => !prevShowMusic);
  };

  const toggleMusic = (play = false) => {
    setIsMusicPlaying(play);
  };

  return (
    <div className="settings-wrapper">
      <div className="settings">
        <div className="settings-container">
          <MdOutlineSettings className="user-icon" />
          Settings
        </div>
        <div className="profile-select">
          <span onClick={handleProfileButtonClick}>
            <AiOutlineUser className="user-icon" />
            Profile
          </span>
        </div>
        <div className="music-select">
          <span onClick={handleMusicButtonClick}>
            <BsMusicNoteBeamed className="user-icon" />
            Music
          </span>
        </div>
      </div>
      {showProfile && (
        <div className="profile-selected-wrapper">
          <Profile />
        </div>
      )}
      {showMusic && (
        <div className="music-selected-wrapper">
          <Music isPlaying={isMusicPlaying} toggleMusic={toggleMusic} />
        </div>
      )}
    </div>
  );
}

export default Settings;
