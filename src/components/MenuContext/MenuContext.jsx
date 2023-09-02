import React, { useEffect, useRef, useState } from "react";
import Menu from "../../assets/img/menu.png";

import "./MenuContext.css";

const MenuContext = ({ options }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleDocumentClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div data-testid='outside-element' className='menu-container' ref={menuRef}>
      <button
        data-testid='menu-context-button'
        className='menu-button'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img src={Menu} alt='Menu' />
      </button>
      {isMenuOpen && (
        <div className='menu'>
          {options.map((option) => (
            <div key={option.label} className='btn-container-context'>
              <p
                className='menu-item'
                onClick={() => {
                  option.action();
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                {option.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuContext;
