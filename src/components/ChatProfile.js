import React, { useEffect, useState } from "react";
import useChatContext from "../hooks/useChatContext";
import ProfileHeader from './ProfileHeader'
import ParticipantsList from "./ParticipantsList";
const ChatProfile = () => {
  const { selectedChatId, chats } = useChatContext();
  const [selectedChat, setSelectedChat] = useState();
  useEffect(() => {
    setSelectedChat(chats.find((chat) => chat._id === selectedChatId));
  }, []);
  return (
    <section className="chat-profile">
      
      <ProfileHeader selectedChat={selectedChat} />
      {selectedChat && selectedChat.isGroupChat && <ParticipantsList {...selectedChat} />}
      {
        selectedChat && selectedChat.isGroupChat && <button className="group-exit-btn profile-section">
          <img src="exit.png" alt="exit" />
          <span>Exit group</span>
        </button>
      }
      
    </section>
  );
}

export default ChatProfile
