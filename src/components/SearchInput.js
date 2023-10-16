import React, { useState } from 'react'

const SearchInput = ({searchPlaceHolder, searchQuery, updateSearchQuery, closeSlider, clearSelectedContacts}) => {
    
  return (
    <div className="search-input-container">
      <div>
        <button className="back-btn" onClick={() => {
          closeSlider()
          clearSelectedContacts()
          }}>
          <img src="back.png" alt="back" />
        </button>
        <input
          type="text"
          placeholder={searchPlaceHolder}
          value={searchQuery}
          onChange={(e) => updateSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchInput
