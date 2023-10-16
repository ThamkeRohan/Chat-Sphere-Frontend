import React from 'react'
import useAuthContext from '../hooks/useAuthContext'
import ProfileImage from './ProfileImage'

const Message = ({content, createdAt, sender, isFirstMessage, isSpam}) => {
  
  const {user} = useAuthContext()
  
  return (
    <div
      className={`message ${isFirstMessage ? "firstMessage" : ""} ${user._id === sender._id ? "self" : "other"} ${isSpam ? "spam" : "not-spam"}`}
    >
      {isFirstMessage && sender._id !== user._id && (
        <ProfileImage profileImage={sender.profileImage}/>
      )}

      {isFirstMessage && sender._id !== user._id && (
        <div className="sender-info">
          <span className="sender-name">{sender.name}</span>
          <span className="sender-email">{sender.email}</span>
        </div>
      )}

      <div className="content">{content}</div>
      <div className="time">
        {new Date(createdAt).toLocaleString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}

export default Message
