import React, { useEffect, useState } from 'react'
import useChatContext from '../hooks/useChatContext'
import useChatUpdateContext from '../hooks/useChatUpdateContext'
import MessagesContainer from './MessagesContainer'
import MessageInputContainer from './MessageInputContainer'
import ProfileImage from './ProfileImage'
import useContactContext from '../hooks/useContactContext'
import Menu from './Menu'
import MenuItem from './MenuItem'
import useContactUpdateContext from '../hooks/useContactUpdateContext'
import Modal from './Modal'
import ChatProfile from './ChatProfile'

const ChatWindow = () => {
  
  const {selectedChatId, chats} = useChatContext()
  const { updateSelectedChatId, updateMessagesStatusForDbAndUi } = useChatUpdateContext();
  const {updateSelectedContact} = useContactUpdateContext()
  const [showProfile, setShowProfile] = useState(false)
  const [selectedChat, setSelectedChat] = useState(() => {
    return chats.find(chat => chat._id === selectedChatId)
  })
  const {contacts, selectedContact} = useContactContext()
  const [showMenu, setShowMenu] = useState(false)
  
  useEffect(() => {
    setSelectedChat(chats.find(chat => chat._id === selectedChatId))
    updateMessagesStatusForDbAndUi("SEEN", selectedChatId)  
  }, [selectedChatId])

  
  function closeChatWindow(){
    updateSelectedChatId(null)
    updateSelectedContact(null)
  }
  function getContactName(otherUser) {
    const targetContact = contacts.find((contact) => {
      return contact.contactUser._id === otherUser;
    });
    return targetContact != null ? targetContact.contactName : null
  }
  
 
  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <div>
          <button className="back-btn" onClick={closeChatWindow}>
            <img src="back-white.png" alt="" />
          </button>
          <div className="chat-details" onClick={() => setShowProfile(true)}>
            {selectedChat != null && (
              <ProfileImage
                profileImage={
                  selectedChat.isGroupChat
                    ? selectedChat.groupChatProfileImage
                    : selectedChat.otherUsers[0].profileImage
                }
              />
            )}

            {selectedContact != null && (
              <ProfileImage
                profileImage={selectedContact.contactUser.profileImage}
              />
            )}

            <div className="chat-description">
              <div className="chat-name">
                {selectedChat != null &&
                  selectedChat.isGroupChat &&
                  selectedChat.groupChatName}

                {selectedChat != null &&
                  !selectedChat.isGroupChat &&
                  (getContactName(selectedChat.otherUsers[0]._id) != null
                    ? getContactName(selectedChat.otherUsers[0]._id)
                    : selectedChat.otherUsers[0].email)}

                {selectedContact != null && selectedContact.contactName}
              </div>
              {selectedChat != null && (
                <div className="last-seen">last seen yesterday</div>
              )}
            </div>
          </div>
        </div>

        <div>
          <button className="menu-btn">
            <img
              src="dots.png"
              alt="menu-option"
              onClick={() => setShowMenu((prev) => !prev)}
            />
          </button>
          {showMenu && (
            <Menu>
              <MenuItem
                name="Contact Info"
                onClickHandler={() => console.log("contact info")}
              />
              <MenuItem
                name="Close Chat"
                onClickHandler={() => console.log("clsoe chat")}
              />
              <MenuItem
                name="Block"
                onClickHandler={() => console.log("Block")}
              />
            </Menu>
          )}
        </div>
      </div>
      <MessagesContainer />
      <MessageInputContainer />
      {showProfile && (
        <Modal
          title="Chat Info"
          showModal={showProfile}
          closeModal={() => setShowProfile(false)}
        >
          <ChatProfile />
        </Modal>
      )}
    </div>
  );
}

export default ChatWindow
