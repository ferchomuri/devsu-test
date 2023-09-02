import React from 'react';
import Logo from '../../assets/img/logo.png';

import './Header.css';

const Header = () => {
  return (
    <div className='main-header'>
      <img src={Logo} alt="Logo Banco Pichincha" className='img-header' />
    </div>
  );
}

export default Header;