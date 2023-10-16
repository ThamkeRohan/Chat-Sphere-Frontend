import React, { useEffect, useState } from 'react'
import useAuthContext from '../hooks/useAuthContext'
import Menu from './Menu'
import MenuItem from './MenuItem'
import ProfileImage from './ProfileImage'
import Modal from './Modal'
import NewContact from './NewContact'
import Slider from './Slider'
import SearchInput from './SearchInput'
import useAuthUpdateContext from '../hooks/useAuthUpdateContext'
import useChatContext from '../hooks/useChatContext'
import useChatUpdateContext from '../hooks/useChatUpdateContext'
const Header = () => {
    const {user} = useAuthContext()
    const {hideSpamMessages} = useChatContext()
    const {updateSpamHideStatus} = useChatUpdateContext()
    const { logoutUser } = useAuthUpdateContext();
    const [showMenu, setShowMenu] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showSlider, setShowSlider] = useState(false)
    const [sliderType, setSliderType] = useState("")
    useEffect(() => {
      document.addEventListener("click", e => {
        if(!e.target.matches(".menu-btn img" || !e.target.matches("menu-item"))){
          setShowMenu(false)
        }
      })
    },[])
    function openModal(){
      setShowModal(true)
      setShowMenu(false)
    }
  return (
    <div className="main-header">
      <ProfileImage profileImage={user ? user.profileImage : ""} />
      <div className="options">
        <button className="search-btn" onClick={() => {
          setSliderType("SEARCH-CHATS")
          setShowSlider(true)}
          }>
          <img src="search.png" alt="search" />
        </button>
        <div>
          <button
            className={`menu-btn ${showMenu ? "active" : "inactive"}`}
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <img src="/dots.png" alt="menu-icon" />
          </button>
          {showMenu && (
            <Menu>
              <MenuItem name="New Contact" onClickHandler={() => openModal()} />
              <MenuItem
                name="New Group"
                onClickHandler={() => {
                  setSliderType("CREATE-GROUP-CHAT")
                  setShowSlider(true)
                  setShowMenu(false)
                }}
              />
              <MenuItem
                name={`${hideSpamMessages ? "Show Spam" : "Hide Spam"}`}
                onClickHandler={updateSpamHideStatus}
              />
              <MenuItem
                name="Logout"
                onClickHandler={() => logoutUser()}
              />
            </Menu>
          )}
        </div>
      </div>

      {
        <Modal
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          title="New Contact"
        >
          <NewContact closeModal={() => setShowModal(false)} />
        </Modal>
      }

      {
        <Slider showSlider={showSlider} sliderType={sliderType} closeSlider={() => setShowSlider(false)}>
          
        </Slider>
      }
    </div>
  );
}

export default Header
