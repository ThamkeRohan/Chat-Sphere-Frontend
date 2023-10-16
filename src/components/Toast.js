import React, { useEffect, useState } from 'react'

const Toast = ({logo, messageType, message, closeToast}) => {
  useEffect(() => {
    setTimeout(() => {
      closeToast()
    },4000)
  },[])
return (
  <div className="toast">
    <div>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="message">
        <span className="message-type">{messageType}</span>
        <span className="message">{message}</span>
      </div>
      <button className="close-toast-btn" onClick={() => closeToast()}>
        <img src="close.png" alt="" />
      </button>
    </div>
    <div className={`loading-bar ${messageType}`}></div>
  </div>
);
  
}

export default Toast
