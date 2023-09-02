import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.css";
import EditProfilePictureModal from "./EditProfilePictureModal ";
import { useState } from "react";
import EditUsernameModal from "./EditUsernameModal";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [showEditUsernameModal, setShowEditUsernameModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user.picture);
  const [username, setUsername] = useState(user.nickname);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleEditPictureClick = () => {
    setShowModal(true);
  };

  const handleEditUsernameClick = () => {
    setShowEditUsernameModal(true);
  };

  return (
    isAuthenticated && (
      <div className="profile">
        <div className="user-info">
          <div className="edit-button-container">
            <img src={profilePicture} alt={user.name} className="user-image" />
            <button onClick={handleEditPictureClick}>
              Edit Profile Picture
            </button>
            <div className="profile-modal">
              {showModal && (
                <EditProfilePictureModal
                  onClose={() => setShowModal(false)}
                  updateProfilePicture={setProfilePicture}
                />
              )}
            </div>
          </div>
          <div className="edit-username">
            <h2>Username: {username}</h2>
            <button
              onClick={handleEditUsernameClick}
              className="edit-username-button"
            >
              Edit
            </button>
            {showEditUsernameModal && (
              <EditUsernameModal
                onClose={() => setShowEditUsernameModal(false)}
                updateUsername={setUsername}
                initialUsername={username}
              />
            )}
          </div>
          <p>Email: {user.email}</p>
          <p>Last updated: {user.updated_at}</p>
        </div>
      </div>
    )
  );
};
export default Profile;
