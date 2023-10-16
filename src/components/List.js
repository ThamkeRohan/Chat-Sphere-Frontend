import React from 'react'
import ChatCard from './ChatCard'
import ContactCard from './ContactCard'

const List = ({ items, listType, onClickHandler }) => {
  
  return (
    <div className="list">
      {(listType === "contacts" && items.length > 0) && <h3>Contacts</h3>}
      {(listType === "chats" && items.length > 0) && <h3>Chats</h3>}
      {listType === "contacts"
        ? items.map((contact) => <ContactCard key={contact._id} {...contact} onClickHandler={onClickHandler} />)
        : items.length > 0 &&
          items.map((chat) => <ChatCard key={chat._id} {...chat} />)}
    </div>
  );
};

export default List
