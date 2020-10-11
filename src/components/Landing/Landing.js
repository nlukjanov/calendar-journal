import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../lib/authHelper';

const Landing = () => (
  <Jumbotron>
    <Container className='text-center'>
      <h1>Welcome to Calendar Journal</h1>
      <p>Take your notes and keep your memories</p>
      <div className='d-flex justify-content-center'>
        {!isAuthenticated() && (
          <>
            <Nav.Link as={Link} to='signin'>
              <Button variant='primary'>Sign In</Button>
            </Nav.Link>
            <Nav.Link as={Link} to='/signup'>
              <Button variant='primary'>Sign Up</Button>
            </Nav.Link>
          </>
        )}
        {isAuthenticated() && (
          <Nav.Link as={Link} to='/myjournal'>
            <Button variant='primary'>See my journal</Button>
          </Nav.Link>
        )}
      </div>
    </Container>
  </Jumbotron>
);

export default Landing;
