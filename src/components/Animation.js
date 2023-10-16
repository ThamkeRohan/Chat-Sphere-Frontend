import React from 'react'

const Animation = ({isStartUpAnimation}) => {
  
  return (
    <section className={`animation ${isStartUpAnimation ? "start-up-animation" : ""}`}>
      <div className="logo-container">
        <div className="logo">
          <img src="chat.png" alt="chat-logo" />
        </div>
      </div>
      <h1 className='app-name'>ChatSphere</h1>
    </section>
  );
}

export default Animation
