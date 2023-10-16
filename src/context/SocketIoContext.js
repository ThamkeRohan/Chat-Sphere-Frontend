import React, { useEffect, useState } from 'react'
import useAuthContext from '../hooks/useAuthContext'
import { io } from 'socket.io-client'
import useChatUpdateContext from '../hooks/useChatUpdateContext'
import useChatContext from '../hooks/useChatContext'

export const SocketIoContext = React.createContext()
const SocketIoProvider = ({ children }) => {

    const [socket, setSocket] = useState(null)
    const {chats,selectedChatId} = useChatContext()
    const {user} = useAuthContext()
    const {
      addNewMessageToChat,
      getChatIfNotPresentInChats,
      updateMessagesStatusForDbAndUi,
    } = useChatUpdateContext();

    useEffect(() => {
        if(localStorage.getItem('CHAT_TOKEN') != null){
            const newSocket = io("http://localhost:5000", {
              auth: { token: localStorage.getItem("CHAT_TOKEN") },
            });
            
            setSocket(newSocket)
        }

        return () => {
          if(socket != null){
            socket.close(); 
          }
          
        }  
    }, [user])

    useEffect(() => {
      if (socket != null) {
        socket.on("message-from-server", async (message) => {
          //
          const isSpam = await isMessageSpam(message);
          if (isSpam) {
            updateMessageSpamStatus(message, isSpam);
          }
          message.isSpam = isSpam;
          
          //
          if (!chats.some((chat) => chat._id === message.chat._id)) {
            return getChatIfNotPresentInChats(message.chat._id);
          }
          addNewMessageToChat(message, message.chat._id);
          if (message.chat._id === selectedChatId) {
            console.log("Updating status when caht is open");
            updateMessagesStatusForDbAndUi("SEEN", message.chat._id);
          }
        });
      }

      return () => {
        if (socket != null) {
          socket.off("message-from-server");
        }
      };
    }, [chats, selectedChatId]);
    
    
    async function isMessageSpam(message){
      
      const res = await fetch(`http://127.0.0.1:5000/?message=${message.content}`);
      const data = await res.json()
      const {isSpam} = data
      return isSpam
    }
    async function updateMessageSpamStatus(message, status){
      await fetch(`http://localhost:5000/api/chats/${message.chat._id}/messages/${message._id}`,{
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("CHAT_TOKEN")}`
        },
        body: JSON.stringify({isSpam: status})
      })
    }
  return (
  <SocketIoContext.Provider value={{ socket }}>
    { children }
  </SocketIoContext.Provider>)
}

export default SocketIoProvider
