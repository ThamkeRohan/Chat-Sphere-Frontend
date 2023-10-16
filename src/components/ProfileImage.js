import React from 'react'

const ProfileImage = ({profileImage}) => {
  return (
    <div className="profile-image">
      <img
        src={`http://localhost:5000/${profileImage}`}
        alt="profileImage"
      />
    </div>
  );
}

export default ProfileImage
