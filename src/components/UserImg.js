import React, { useState } from "react";
import { useOutletContext } from 'react-router-dom';

const UserImg = () => {
  const [error, setError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  const [success, setSuccess] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const { userData, setUserData, currentUser } = useOutletContext();
  const currentUserData = userData.find(user => user.email === currentUser.email);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUsers = userData.map(user =>
          user.email === currentUser.email ? { ...user, avatar: reader.result } : user
        );

        setUserData(updatedUsers);
        setSuccess("Profile picture updated!");
        setShowSuccessNotification(true);
        setTimeout(() => setShowSuccessNotification(false), 3000);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Failed to load image.");
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
    }
  };


  return (
    <div className="user_img_section">
      <p>Change Profile Picture</p>

      {currentUserData?.avatar && (
        <img src={currentUserData.avatar} alt="Profile" className="avatar_preview" />
      )}

      <input type="file" accept="image/*" onChange={handleFileUpload} />

      {showErrorNotification && (
        <div className="error-popup">
          {error}
        </div>
      )}

      {showSuccessNotification && (
        <div className="success-popup">
          {success}
        </div>
      )}
    </div>
  )
}

export default UserImg