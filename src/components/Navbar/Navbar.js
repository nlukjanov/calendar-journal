import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { logout, isAuthenticated } from '../../lib/authHelper';

const Navbar = () => {
  return (
    <nav data-testid='nav'>
      <Link to='/'>
        <button>Home</button>
      </Link>
      {!isAuthenticated() && (
        <Link to='/signin'>
          <button>Sign in</button>
        </Link>
      )}
      {!isAuthenticated() && (
        <Link to='/signup'>
          <button>Sign up</button>
        </Link>
      )}
      {isAuthenticated() && (
        <Link to='/new-entry'>
          <button>New Entry</button>
        </Link>
      )}
      {isAuthenticated() && (
        <Link to='/myjournal'>
          <button>My Journal</button>
        </Link>
      )}
      {isAuthenticated() && (
        <Link to='/' onClick={logout}>
          <button>Logout</button>
        </Link>
      )}
    </nav>
  );
};

export default withRouter(Navbar);
