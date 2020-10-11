import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, withRouter } from 'react-router-dom';

import { logout, isAuthenticated } from '../../lib/authHelper';

const NavbarComponent = () => {
  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Link to='/'>
          <Navbar.Brand>Home</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse
          id='responsive-navbar-nav'
          className='justify-content-end'
        >
          <Nav>
            {!isAuthenticated() && (
              <Nav.Link as={Link} to='signin'>
                Sign In
              </Nav.Link>
            )}
            {!isAuthenticated() && (
              <Nav.Link as={Link} to='/signup'>
                Sign Up
              </Nav.Link>
            )}
            {isAuthenticated() && (
              <Nav.Link as={Link} to='/new-entry'>
                New Entry
              </Nav.Link>
            )}
            {isAuthenticated() && (
              <Nav.Link as={Link} to='/myjournal'>
                My Journal
              </Nav.Link>
            )}
            {isAuthenticated() && (
              <Nav.Link as={Link} to='/' onClick={logout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default withRouter(NavbarComponent);
