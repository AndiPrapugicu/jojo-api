import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

const EditUsernameModal = ({ onClose, updateUsername, initialUsername }) => {
  const { user, isAuthenticated } = useAuth0();

  const [newUsername, setNewUsername] = useState(initialUsername);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setNewUsername(storedUsername);
    }
  }, []);

  const isValidUsername = (username) => {
    const alphanumericRegex = /^[a-zA-Z0-9\s]*[a-zA-Z0-9]+[a-zA-Z0-9\s]*$/;
    return username.length >= 3 && alphanumericRegex.test(username);
  };

  const handleSaveClick = () => {
    if (isValidUsername(newUsername)) {
      if (newUsername.length <= 20) {
        updateUsername(newUsername);
        if (isAuthenticated) {
          user
            .updateUserMetadata({ username: newUsername })
            .then(() => {
              localStorage.setItem("username", newUsername); // Salvăm în localStorage
              onClose();
            })
            .catch((error) => {
              console.error("Error updating user profile:", error);
            });
        } else {
          onClose();
        }
      } else {
        alert("Username cannot exceed 20 characters.");
      }
    } else {
      alert("Invalid username. Please enter a valid username.");
    }
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <div className="edit-username-modal">
      <h2>Edit Username</h2>
      <input
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        placeholder="Enter new username"
      />
      <button onClick={handleSaveClick}>Save</button>
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  );
};

EditUsernameModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  updateUsername: PropTypes.func.isRequired,
  initialUsername: PropTypes.string.isRequired,
};

export default EditUsernameModal;
