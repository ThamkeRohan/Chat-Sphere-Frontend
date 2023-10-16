import React, { useState } from 'react'
import Toast from './Toast'
import useContactContext from '../hooks/useContactContext'
import useContactUpdateContext from '../hooks/useContactUpdateContext'


const NewContact = ({closeModal}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)
    const {contacts} = useContactContext()
    const { addNewContact } = useContactUpdateContext();

   
    async function saveContact(e){
        e.preventDefault()
        if(name === "" || email === ""){
            setErrorMessage("All fields are required")
            return
        }
        
        if(contacts.some(contact => contact.contactUser.email === email)){
          setErrorMessage("Contact Already Exists")
          return
        }
        
        const response = await fetch('http://localhost:5000/api/contacts',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("CHAT_TOKEN")}`
            },
            body: JSON.stringify({contactName: name, contactUserEmail: email})
        })
        const data = await response.json()
        if(response.ok){
            addNewContact(data);
            closeModal()
        }else{
            setErrorMessage(data.error)   
        }
    }
  return (
    <>
      <form className="new-contact-form" onSubmit={saveContact}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="save-contact-btn">Save</button>
        {errorMessage && (
          <Toast
            logo="error.png"
            messageType="Error"
            message={errorMessage}
            closeToast={() => setErrorMessage(null)}
          />
        )}
      </form>
    </>
  );
}

export default NewContact
