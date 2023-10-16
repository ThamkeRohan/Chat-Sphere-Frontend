import React from 'react'
import useAuthContext from '../hooks/useAuthContext'

const NotificationMessage = ({content}) => {
  const {user} = useAuthContext()
  const mongoDbIdLength = 24
  const groupCreater = content.slice(0, mongoDbIdLength)

  const remainingString = content.slice(mongoDbIdLength + 1, content.length)
  console.log(groupCreater);
  console.log(remainingString);
  return (
    <div className="notification-message">
      {`${groupCreater === user._id ? "You" : groupCreater} ${remainingString}`}
    </div>
  );
}

export default NotificationMessage
