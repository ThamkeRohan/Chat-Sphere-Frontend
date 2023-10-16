import React from 'react'
import ProfileImage from './ProfileImage'

const ContactBadge = ({contactUser:{profileImage}, contactName, _id, unselectContact}) => {
  return (
    <div className='contact-badge'>
      <ProfileImage profileImage={profileImage}/>
      <span>{contactName}</span>
      <button onClick={() => unselectContact(_id)}>
        <img src="close.png" alt="close" />
      </button>
    </div>
  )
}

export default ContactBadge
