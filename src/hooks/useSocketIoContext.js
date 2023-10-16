import React, { useContext } from 'react'
import { SocketIoContext } from '../context/SocketIoContext'

const useSocketIoContext = () => {
  return useContext(SocketIoContext)
}

export default useSocketIoContext
