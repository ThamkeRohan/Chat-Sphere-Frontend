import React from 'react'
import useChatContext from '../hooks/useChatContext';
import useContactContext from '../hooks/useContactContext';
import ChatWindow from "../components/ChatWindow";
import Animation from "./Animation";
import ChatProfile from './ChatProfile';
import Modal from './Modal'
import useChatUpdateContext from '../hooks/useChatUpdateContext';

const RightSection = () => {
    const {selectedChatId} = useChatContext()
    const {selectedContact} = useContactContext()
    const {updateSelectedChatId} = useChatUpdateContext()
  return (
    <div className="right-section">
      {selectedChatId != null || selectedContact != null ? (
        <ChatWindow />
      ) : (
        <Animation />
      )}
      
    </div>
  );
}

export default RightSection
