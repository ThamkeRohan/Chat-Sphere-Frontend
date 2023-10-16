import React, { useEffect, useState } from 'react'
import useChatContext from '../hooks/useChatContext';
import useSocketIoContext from '../hooks/useSocketIoContext';
import useChatUpdateContext from '../hooks/useChatUpdateContext';
import useContactContext from "../hooks/useContactContext"
import useContactUpdateContext from "../hooks/useContactUpdateContext"

const MessageInputContainer = () => {
    const [message, setMessage] = useState("")
    const {selectedChatId} = useChatContext()
    const {selectedContact} = useContactContext()
    const {updateSelectedChatId, addNewChat, addNewMessageToChat} = useChatUpdateContext()
    const {updateSelectedContact, removeContactFromContactsNotPartOfChats} = useContactUpdateContext()
    const {socket} = useSocketIoContext()
  
    
    async function sendMessage(e){
      e.preventDefault()
      //create new chat if not exists
      let chatData
      if(selectedChatId == null){
        const chat = new FormData()
        chat.append("otherUsers", JSON.stringify([selectedContact.contactUser._id]))
        const chatResponse = await fetch(`http://localhost:5000/api/chats`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("CHAT_TOKEN")}`,
          },
          body: chat
        });
        chatData = await chatResponse.json();
        
        // removeContactFromContactsNotPartOfChats(chatData.otherUsers[0]._id)
        // addNewChat(chatData)
        // updateSelectedChatId(chatData._id);
        // updateSelectedContact(null);
        
      }
      
      // sending message to selected chat
      const chatId = selectedChatId != null ? selectedChatId : chatData._id
      const messageRespone = await fetch(`http://localhost:5000/api/chats/${chatId}/messages`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('CHAT_TOKEN')}`
        },
        body: JSON.stringify({
          content: message
        })
      })
      const messageData = await messageRespone.json();
      
      if (messageRespone.ok) { 
        if(selectedChatId == null){
          chatData.messages.push(messageData)
          removeContactFromContactsNotPartOfChats(chatData.otherUsers[0]._id);
          addNewChat(chatData);
          updateSelectedChatId(chatData._id);
          updateSelectedContact(null);
        }
        else{
          addNewMessageToChat(messageData, chatId);
        }
        setMessage("");
        socket.emit("message-from-client", messageData);
        
      } else {
        console.log(messageData);
      }
      
    }
    
  return (
    <form className="message-input-container" onSubmit={sendMessage}>
        <button className="emoji-selector-btn">
          <img src="smile.png" alt="" />
        </button>
       
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        
        <button className="send-message-btn">
          {message === "" ? (
            <div>
              <img src="not-ready-to-send.png" />
            </div>
          ) : (
            <div>
              <img src="ready-to-send.png" />
            </div>
          )}
        </button>
      
    </form>
  );
}

export default MessageInputContainer
