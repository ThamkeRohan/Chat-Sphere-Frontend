import React from 'react'
import useChatUpdateContext from '../hooks/useChatUpdateContext';
import useContactUpdateContext from '../hooks/useContactUpdateContext'

const ContactCard = (
  props
  ) => {
  const {updateSelectedChatId} = useChatUpdateContext()
  const {updateSelectedContact} = useContactUpdateContext()
  
  return (
    <div className="contact-card" onClick={
      () => {
        props.onClickHandler(props) 
      } 
    }>
      <img
        src={`http://localhost:5000/${props.contactUser.profileImage}`}
        alt="profile-image"
        className="profile-image"
      />
      <div>
        <div className="contact-name">{props.contactName}</div>
        <div className="contact-email">{props.contactUser.email}</div>
      </div>
    </div>
  );
}

export default ContactCard
