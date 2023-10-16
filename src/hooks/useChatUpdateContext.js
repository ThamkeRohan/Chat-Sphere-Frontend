import React, { useContext } from 'react'
import { ChatUpdateContext } from '../context/ChatContext'

const useChatUpdateContext = () => {
  return useContext(ChatUpdateContext)
}

export default useChatUpdateContext
