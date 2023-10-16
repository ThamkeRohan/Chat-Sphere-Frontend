import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import SearchInput from './SearchInput'
import useChatContext from '../hooks/useChatContext'
import useContactContext from '../hooks/useContactContext'
import ListContainer from './ListContainer'
import List from './List'
import useContactUpdateContext from '../hooks/useContactUpdateContext'
import ContactBadge from './ContactBadge'
import useChatUpdateContext from '../hooks/useChatUpdateContext'
import Modal from './Modal'
import useAuthContext from '../hooks/useAuthContext'
import Toast from './Toast'


const Slider = ({showSlider, sliderType, closeSlider}) => {
  const {user} = useAuthContext()
  const {chats} = useChatContext()
  const {contacts,contactsNotPartOfChats} = useContactContext()
  const [searchQuery, setSearchQuery] = useState("")
  const {updateSelectedChatId, addNewChat} = useChatUpdateContext()
  const {updateContactsNotPartOfChats, updateSelectedContact} = useContactUpdateContext()
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const [groupChatName, setGroupChatName] = useState("")
  const [groupChatProfileImage, setGroupChatProfileImage] = useState(null)


  const unselectedContacts = contacts.filter(contact => {
    return !selectedContacts.some(selectedContact => selectedContact.contactUser._id === contact.contactUser._id)
  })

  function closeModal(){
    setShowModal(false)
  }
  function clearSelectedContacts(){
    setSelectedContacts([])
  }
  

  useEffect(() => {
      const filteredContacts = contacts.filter(contact => {
        const isContactPartOfSingleChat = chats.some(chat => {
          if(chat.isGroupChat){
            return false
          }
          return chat.otherUsers[0]._id === contact.contactUser._id
        })

        if(isContactPartOfSingleChat){
          return false
        }else{
          return true
        }
      })
      
      updateContactsNotPartOfChats(filteredContacts);
    
  }, [contacts])

  function updateSearchQuery(inputValue) {
    setSearchQuery(inputValue);
  }
  function unselectContact(contactId){
    setSelectedContacts(prevContacts => {
      return prevContacts.filter(prevContact => prevContact._id !== contactId)
    })
  } 
  function selectContactForChat(contact){
    updateSelectedContact(contact)
    updateSelectedChatId(null);
  }
  function addContactToGroupChat(contact){
    setSelectedContacts(prevContacts => [...prevContacts, contact])
  }
  async function createGroupChat(e){
    e.preventDefault()
    if(groupChatName === "" || groupChatProfileImage == null){
      setErrorMsg("All fields are required")
      return
    }
    const otherUsers = selectedContacts.map(selectedContact => selectedContact.contactUser._id)
    const groupChat = new FormData()
    groupChat.append("groupChatName", groupChatName)
    groupChat.append("groupChatProfileImage", groupChatProfileImage[0])
    groupChat.append("isGroupChat", true)
    groupChat.append("groupAdmin", user._id)
    groupChat.append("otherUsers",JSON.stringify(otherUsers))

    const groupChatRes = await fetch("http://localhost:5000/api/chats",{
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("CHAT_TOKEN")}`
      },
      body: groupChat
    })
    const groupChatData = await groupChatRes.json()
    
    const notificationMessageRes = await fetch(`http://localhost:5000/api/chats/${groupChatData._id}/messages`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("CHAT_TOKEN")}`
      },
      body: JSON.stringify({
        content: `${user._id} created "${groupChatName}" chat`,
        messageType: "GROUP-CREATION-NOTIFICATION"
      })
    })
    const notificationMessageData = await notificationMessageRes.json()
    groupChatData.messages.push(notificationMessageData)
    addNewChat(groupChatData)
    setSelectedContacts([])
    closeSlider()
    setGroupChatName("")
    setGroupChatProfileImage(null)
    setShowModal(false)
  }
  if(!showSlider){
    return null
  }
  return ReactDOM.createPortal(
    <div className="slider">
      <SearchInput
        searchPlaceHolder={
          sliderType === "CREATE-GROUP-CHAT"
            ? "Type contact name"
            : "Search or start new chat"
        }
        searchQuery={searchQuery}
        updateSearchQuery={updateSearchQuery}
        closeSlider={closeSlider}
        clearSelectedContacts={clearSelectedContacts}
      />
      <ListContainer>
        {sliderType === "CREATE-GROUP-CHAT" && (
          <div>
            <div className="selected-contacts-list">
              {selectedContacts.map((selectedContact) => (
                <ContactBadge
                  {...selectedContact}
                  unselectContact={unselectContact}
                  key={selectedContact._id}
                />
              ))}
            </div>
            {selectedContacts.length > 0 && (
              <button
                className="proceed-btn"
                onClick={() => setShowModal(true)}
              >
                <img src="right-arrow.png" alt="create-group" />
              </button>
            )}

            <List
              onClickHandler={addContactToGroupChat}
              listType="contacts"
              items={unselectedContacts.filter((contact) => {
                return (
                  contact.contactName
                    .toLowerCase()
                    .includes(searchQuery.toLocaleLowerCase()) ||
                  contact.contactUser.email
                    .toLocaleLowerCase()
                    .includes(searchQuery.toLocaleLowerCase())
                );
              })}
            />
          </div>
        )}
        {sliderType === "SEARCH-CHATS" && (
          <div>
            <div>
              <List
                listType="chats"
                items={chats.filter((chat) => {
                  return chat.otherUsers[0].email
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                })}
              />
            </div>
            <div>
              <List
                onClickHandler={selectContactForChat}
                listType="contacts"
                items={contactsNotPartOfChats.filter((contact) => {
                  return (
                    contact.contactName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    contact.contactUser.email
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  );
                })}
              />
            </div>
          </div>
        )}
      </ListContainer>
      <Modal showModal={showModal} closeModal={closeModal} title="Create Group">
        <form className="new-group-form" onSubmit={createGroupChat}>
          {errorMsg && (
            <Toast
              logo="error.png"
              messageType="Error"
              message={errorMsg}
              closeToast={() => setErrorMsg(null)}
            />
          )}
          <input
            type="text"
            placeholder="Group Name"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />
          <input
            type="file"
            files={groupChatProfileImage}
            onChange={(e) => setGroupChatProfileImage(e.target.files)}
          />
          <button className="create-group-btn">
            <img src="correct.png" alt="submit" />
          </button>
        </form>
      </Modal>
    </div>,
    document.body
  );
}

export default Slider
