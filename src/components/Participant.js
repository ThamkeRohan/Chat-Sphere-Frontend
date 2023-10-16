import React from 'react'

const Participant = ({user, groupAdmin}) => {
  return (
    <div className='participant'>
      <div className="profile-img">
        <img src={`http://localhost:5000/${user.profileImage}`} alt="profile-img" />
      </div>
      <div className="name">{user.name}</div>
      <div>
        {user._id === groupAdmin && <div className='admin-badge'>Admin</div>}
        <div className="email">{user.email}</div>
      </div>
    </div>
  )
}

export default Participant
