import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav data-testid='nav'>
      <Link to='/'>
        <button>Home</button>
      </Link>
      <Link to='/signin'>
        <button>Sign in</button>
      </Link>
      <Link to='/signup'>
        <button>Sign up</button>
      </Link>
      <Link to='/new-entry'>
        <button>New Entry</button>
      </Link>
    </nav>
  );
};

export default Navbar;
