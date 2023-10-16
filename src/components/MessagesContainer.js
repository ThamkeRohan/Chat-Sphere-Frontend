import React, {useRef, useEffect, useState} from 'react'
import Message from './Message'
import useChatContext from '../hooks/useChatContext';
import NotificationMessage from './NotificationMessage';

const MessagesContainer = () => {
  const { selectedChatId, chats, hideSpamMessages } = useChatContext();
  const [selectedChat, setSelectedChat] = useState(() => {
    return chats.find((chat) => chat._id === selectedChatId);
  });
  const messagesContainerRef = useRef();
  useEffect(() => {
    const containerElement = messagesContainerRef.current;
    if (containerElement) {
      containerElement.scrollTop = containerElement.scrollHeight;
    }
  });
  useEffect(() => {
    setSelectedChat(chats.find(chat => chat._id === selectedChatId))
  }, [selectedChatId])
  
  let filteredMessages = []
  if(selectedChat != null){
    filteredMessages = hideSpamMessages ? selectedChat.messages.filter(message => !message.isSpam) : selectedChat.messages
  }

  return (
    <div className='messages-container' ref={messagesContainerRef}>
      {
        selectedChat != null && filteredMessages.map((message, i) => {
          if(message.messageType === "GROUP-CREATION-NOTIFICATION"){
            return <NotificationMessage key={message._id} content={message.content}/>
          }
          let isFirstMessage
          if(i === 0){
            isFirstMessage = true
          }else{
            isFirstMessage = selectedChat.messages[i].sender._id !== selectedChat.messages[i - 1].sender._id;
          }
          return <Message {...message} isFirstMessage={isFirstMessage} key={message._id}/>
      })
      }
    </div>
  )
}

export default MessagesContainer
