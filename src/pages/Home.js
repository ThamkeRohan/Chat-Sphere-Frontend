import React, { useEffect, useState } from 'react'
import LeftSection from '../components/LeftSection'
import useChatContext from '../hooks/useChatContext'
import useContactContext from '../hooks/useContactContext'
import RightSection from '../components/RightSection'
import Animation from '../components/Animation'

const Home = () => {
  const {selectedChatId} = useChatContext()
  const {selectedContact} = useContactContext()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  
  useEffect(() => {
    window.addEventListener('resize',() => {
      setWindowWidth(window.innerWidth)
    })
  },[])
  
  const showBothSection = windowWidth > 800
  const showLeftSection = selectedChatId == null && selectedContact == null
  
  return (
    <div className="home">
      
      {(showBothSection || showLeftSection) && <LeftSection />}
      {(showBothSection || !showLeftSection) && <RightSection />}
    </div>
  );
}

export default Home
