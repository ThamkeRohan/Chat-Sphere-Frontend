import React from "react";
import useContactUpdateContext from "../hooks/useContactUpdateContext";

const ProfileHeader = ({selectedChat}) => {
  const { getContactName } = useContactUpdateContext();

  let profileImg;
  let chatName;
  console.log(selectedChat);
  if (selectedChat) {
    profileImg = selectedChat.isGroupChat
      ? selectedChat.groupChatProfileImage
      : selectedChat.otherUsers[0].profileImage;
    chatName = selectedChat.isGroupChat
      ? selectedChat.groupChatName
      : getContactName(selectedChat.otherUsers[0]._id) ||
        selectedChat.otherUsers[0].name;
  }

  return (
    <div className="profile-header profile-section">
      <div className="profile-img">
        <img src={`http://localhost:5000/${profileImg}`} alt="profile-img" />
      </div>
      <div className="chat-name">{chatName}</div>
    </div>
  );
};

export default ProfileHeader;
