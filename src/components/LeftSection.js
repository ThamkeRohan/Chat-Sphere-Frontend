import React from 'react'
import Header from './Header'
import List from './List';
import useChatContext from "../hooks/useChatContext";
import ChatCard from "./ChatCard";
import ListContainer from './ListContainer';
import EmptyChats from './EmptyChats';
const LeftSection = () => {
  const { chats } = useChatContext();
  const sortedChats = chats.length > 0 ? [...chats].sort((a, b) => new Date(b.messages[b.messages.length - 1].createdAt) - new Date(a.messages[a.messages.length - 1].createdAt)): []
  return (
    <div className="sidebar">
      <Header />
      {chats.length > 0 ? <ListContainer><List items={sortedChats}/></ListContainer> : <EmptyChats/>}
      
    </div>
  );
}

export default LeftSection
