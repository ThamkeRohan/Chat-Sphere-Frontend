import React from 'react'
import ReactDom from 'react-dom'

const Modal = ({children, title, closeModal, showModal}) => {
    if(!showModal){
        return null
    }
    return ReactDom.createPortal(
      <div className="modal-background">
        <div className="modal">
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <button className="close-modal-btn" onClick={() => closeModal()}>
              <img src="close-bold.png" alt="close" />
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>,
      document.body
    );
}

export default Modal
