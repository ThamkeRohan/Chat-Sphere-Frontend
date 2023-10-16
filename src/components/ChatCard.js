import React, { useEffect, useState } from 'react'
import useChatUpdateContext from '../hooks/useChatUpdateContext';
import useContactContext from '../hooks/useContactContext'
import ProfileImage from './ProfileImage';
import useAuthContext from '../hooks/useAuthContext';
import useContactUpdateContext from '../hooks/useContactUpdateContext';

const ChatCard = (
  props
) => {
  const {contacts} = useContactContext()
  const {updateSelectedContact} = useContactUpdateContext()
  const { updateSelectedChatId } = useChatUpdateContext();
  const {user} = useAuthContext()
  function getContactName(otherChatMember){
    const targetContact = contacts.find(contact => {
      return contact.contactUser._id === otherChatMember
    })
    return targetContact != null ? targetContact.contactName : null
    
  }
  function getDate(latestMessageDate) {
    return new Date(latestMessageDate).toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  }
  function getTime(latestMessageDate){
    return new Date(latestMessageDate).toLocaleString("en-US",{
      hour: "numeric",
      minute: "numeric"
    })
  }
  
  const unseenMessage = props.messages.reduce((total,message) => {
    if (message.sender._id !== user._id && message.readStatus.some(s => s.user === user._id && s.status !== "SEEN")){
      total++
    }
    return total
  }, 0)
  
  return (
    <div
      className="chat-card"
      onClick={() => {
        updateSelectedContact(null);
        updateSelectedChatId(props._id);
      }}
    >
      <div>
        <ProfileImage
          profileImage={
            props.isGroupChat
              ? props.groupChatProfileImage
              : props.otherUsers[0].profileImage
          }
        />
        <div>
          <div className="chat-name">
            {props.isGroupChat
              ? props.groupChatName
              : getContactName(props.otherUsers[0]._id) != null
              ? getContactName(props.otherUsers[0]._id)
              : props.otherUsers[0].email}
          </div>
          <div className="latest-message">
            {props.messages.length > 0
              ? props.messages[props.messages.length - 1].content
              : ""}
          </div>
        </div>
      </div>
      <div>
        {unseenMessage > 0 && (
          <div className="unseen-msg-count">{unseenMessage}</div>
        )}
        <div>
          <div className="date">
            {props.messages.length > 0
              ? getDate(props.messages[props.messages.length - 1].createdAt)
              : ""}
          </div>
          <div className="time">
            {props.messages.length > 0
              ? getTime(props.messages[props.messages.length - 1].createdAt)
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard
