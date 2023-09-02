import { useState } from "react";
import PropTypes from "prop-types";

const EditProfilePictureModal = ({ onClose, updateProfilePicture }) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleSaveClick = () => {
    uploadImageToServer(imageUrl);
    updateProfilePicture(imageUrl);
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  const uploadImageToServer = (imageUrl) => {
    console.log(
      `Imaginea cu URL-ul ${imageUrl} a fost încărcată către server.`
    );
  };

  return (
    <div className="edit-profile-modal">
      <h2>Edit Profile Picture</h2>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Enter image URL"
      />
      <button onClick={handleSaveClick}>Save</button>
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  );
};

EditProfilePictureModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  updateProfilePicture: PropTypes.func.isRequired,
};

export default EditProfilePictureModal;
