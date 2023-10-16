import React, { useEffect, useState } from 'react'
import useAuthContext from '../hooks/useAuthContext'
export const ChatContext = React.createContext()
export const ChatUpdateContext = React.createContext()
const ChatProvider = ({children}) => {
    
    const [chats, setChats] = useState([])
    const [selectedChatId, setSelectedChatId] = useState(null)
    const {user} = useAuthContext()
    const [hideSpamMessages, setHideSpamMessages] = useState(false)
    console.log(chats);
    useEffect(() => {
        if(user == null) return
        getChats()
    }, [user])
    
    function updateSpamHideStatus(){
      setHideSpamMessages(prev => !prev)
    }
    function addNewMessageToChat(newMessage, chatId){
      setChats(prevChats => {
        return prevChats.map(prevChat => {
          if(prevChat._id === chatId){
            prevChat.messages = [...prevChat.messages, newMessage]
          }
          return prevChat
        })
      })
    }
    function updateMessagesStatus(status, chatId){
      setChats((prevChats) => {
        return prevChats.map((prevChat) => {
          if (prevChat._id === chatId) {
            prevChat.messages = prevChat.messages.map(message => { 
              message.readStatus = message.readStatus.map(s => {
                if(s.user === user._id){
                  s.status = status
                }
                return s
              })
              return message
            })
          }
          return prevChat;
        });
      });
    }
    function updateMessagesStatusForDbAndUi(status, selectedChatId){
      if (selectedChatId == null) return;

      fetch(`http://localhost:5000/api/chats/${selectedChatId}/messages`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("CHAT_TOKEN")}`,
        },
        body: JSON.stringify({ readStatus: "SEEN" }),
      }).then((res) => {
        if (res.ok) {
          updateMessagesStatus("SEEN", selectedChatId);
        }
      });

    }

    
    async function getChatIfNotPresentInChats(chatId){
      
      const chatResponse = await fetch(`http://localhost:5000/api/chats/${chatId}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('CHAT_TOKEN')}`
        }
      })
      const chatData = await chatResponse.json()
      if(chatResponse.ok){
        setChats((prevChats) => [...prevChats, chatData]);
      }else{
        console.log(chatResponse);
      }
    }
    
    function updateSelectedChatId(chat) {
      setSelectedChatId(chat);
    }
    function addNewChat(chat){
      setChats(prevChats => [chat, ...prevChats])
    }
    async function getChats(){
        const response = await fetch('http://localhost:5000/api/chats',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('CHAT_TOKEN')}`
            }
        })
        const data = await response.json()
        if(response.ok){
            setChats(data)
            
        }else{
           console.log(data); 
        }
    }
  return (
    <ChatContext.Provider value={{ chats, selectedChatId, hideSpamMessages }}>
      <ChatUpdateContext.Provider
        value={{
          updateSelectedChatId,
          addNewChat,
          getChatIfNotPresentInChats,
          addNewMessageToChat,
          updateMessagesStatusForDbAndUi,
          updateSpamHideStatus
        }}
      >
        {children}
      </ChatUpdateContext.Provider>
    </ChatContext.Provider>
  );
}

export default ChatProvider

