import React, { useState, useEffect, useRef } from 'react';
import { FaCog, FaQuestionCircle } from 'react-icons/fa';

const NavBar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsMenuRef = useRef(null);
  const settingsIconWrapperRef = useRef(null);

  const toggleDarkTheme = () => {
    window.alert('no');
  };

  const toggleSettingsMenu = () => {
    setIsSettingsOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        settingsIconWrapperRef.current &&
        !settingsIconWrapperRef.current.contains(e.target) &&
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(e.target)
      ) {
        setIsSettingsOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener('click', handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-title">WORDLE</div>
      <div className="navbar-icons">
        <div ref={settingsIconWrapperRef}>
          <FaCog onClick={toggleSettingsMenu} className="icon" />
        </div>
        <FaQuestionCircle className="icon" />
      </div>
      {isSettingsOpen && (
        <div ref={settingsMenuRef} className={`settings-menu ${isSettingsOpen ? 'active' : ''}`}>
          <div >Dark Theme:</div>
          <div className="setting" onClick={toggleDarkTheme}>
            ON
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
