import React, {useState, useEffect} from 'react'

const UserProfileStep = ({profileImage, setProfileImage, registerUser, prevStep, isLoading}) => {
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (profileImage.length === 0) return
    const objectUrl = URL.createObjectURL(profileImage[0]);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [profileImage]);
  return (
    <div className="form-step user-profile">
      <h2>Profile Picture</h2>
      {preview && (
        <div className="profile-preview">
          <img src={preview} alt="Preview" />
        </div>
      )}

      <div className="entry">
        <input
          type="file"
          files={profileImage}
          onChange={(e) => setProfileImage(e.target.files)}
        />
      </div>
      <div className="control">
        <button onClick={prevStep}>
          <img src="left.png" alt="back" />
        </button>
        <div className="loading">
          {isLoading && <img src="loading.gif" alt="loading" />}
        </div>
        <button onClick={registerUser}>
          <img src="right.png" alt="submit" />
        </button>
      </div>
    </div>
  );
}

export default UserProfileStep
