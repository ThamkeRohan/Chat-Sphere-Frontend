import React, { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
export const ContactContext = React.createContext();
export const ContactUpdateContext = React.createContext();
const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [contactsNotPartOfChats, setContactsNotPartOfChats] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null)
  const {user} = useAuthContext();
  
  useEffect(() => {
    if(user == null) return
    getContacts();
  }, [user]);
  async function getContacts() {
    const response = await fetch("http://localhost:5000/api/contacts", {
      headers: {
        
        Authorization: `Bearer ${localStorage.getItem("CHAT_TOKEN")}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setContacts(data);
      
    } else {
      console.log(data);
    }
  }
  function updateSelectedContact(contact){
    setSelectedContact(contact)
  }
  function addNewContact(newContact){
    setContacts(prevContacts => [...prevContacts, newContact])
  }
  function removeContactFromContactsNotPartOfChats(contactId){
    setContactsNotPartOfChats(prevContacts => {
      return prevContacts.filter(prevContact => prevContact.contactUser._id !== contactId)
    })
  }
  function updateContactsNotPartOfChats(contactsNotPartOfChats){
    setContactsNotPartOfChats(contactsNotPartOfChats)
  }
  function getContactName(otherUser) {
    const targetContact = contacts.find((contact) => {
      return contact.contactUser._id === otherUser;
    });
    return targetContact != null ? targetContact.contactName : null;
  }
  return (
    <ContactContext.Provider value={{contacts, selectedContact, contactsNotPartOfChats}}>
      <ContactUpdateContext.Provider value={{addNewContact, updateSelectedContact, updateContactsNotPartOfChats, removeContactFromContactsNotPartOfChats, getContactName}}>
      {children}
      </ContactUpdateContext.Provider>
    </ContactContext.Provider>
  );
};

export default ContactProvider;
