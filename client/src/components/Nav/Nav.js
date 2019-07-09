import React from 'react';

import './Nav.css';

const Nav = props => {
  const userId = localStorage.getItem('userId');

  return (
    <nav className="nav">
      <div className="nav-left">
        <img src='REPLACEME' alt='logo' />
      </div>
      <div className="nav-right">
        <h3>About</h3>
        <h3>{userId ? 'Sign Out' : 'Sign In'}</h3>
      </div>
    </nav>
  )
}

export default Nav;