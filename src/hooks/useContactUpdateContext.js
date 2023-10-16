import React, { useContext } from 'react'
import { ContactUpdateContext } from '../context/ContactContext'
const useContactUpdateContext = () => {
  return useContext(ContactUpdateContext)
}

export default useContactUpdateContext
