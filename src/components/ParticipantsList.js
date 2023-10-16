import React from 'react'
import Participant from './Participant'
import useAuthContext from '../hooks/useAuthContext'

const ParticipantsList = ({otherUsers, groupAdmin}) => {
  const {user} = useAuthContext()
  return (
    <div className='participants-list profile-section'>
      <div className="participants-count">
        {`${otherUsers && otherUsers.length + 1} participants`}
      </div>
      {otherUsers != null && otherUsers.map(user => <Participant key={user._id} user={user} groupAdmin={groupAdmin}/>)}
      <Participant user={{...user, name: "You"}} groupAdmin={groupAdmin}/>
    </div>
  )
}

export default ParticipantsList
