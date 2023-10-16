import React from 'react'

const MenuItem = ({name, onClickHandler}) => {
  return (
    <div className='menu-item' onClick={() => onClickHandler()}>
        {name}
    </div>
  )
}

export default MenuItem
