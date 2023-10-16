import React, { useContext } from 'react'
import { ContactContext } from '../context/ContactContext'
const useContactContext = () => {
  return useContext(ContactContext)
}

export default useContactContext
