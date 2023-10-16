import React from 'react'

const EmptyChats = () => {
  return (
    <section className='empty-chats'>
        <div className="icon">
            <img src="empty-box.svg" alt="No chats" />
        </div>
        <p>
            No Chats Available!!
        </p>
    </section>
  )
}

export default EmptyChats
