import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const Signup = () => {
  const history = useHistory();
  const [formData, setFormData] = useState();
  const [signupErrors, setSignupErrors] = useState();

  const handleChange = ({ target: { name, value } }) => {
    const formNewData = { ...formData, [name]: value };
    setFormData(formNewData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/register', formData);
      history.push('/signin');
      // add notification with res
    } catch (error) {
      setSignupErrors({ errors: error.response.data.errors });
    }
  };

  // logging after state update
  useEffect(() => console.log(signupErrors?.errors), [signupErrors]);

  return (
    <Card className='mx-auto mt-5 border-light' style={{ maxWidth: '25rem' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            name='username'
            type='username'
            placeholder='Enter username'
            onChange={handleChange}
          />
          {signupErrors && <small>{signupErrors?.errors.username}</small>}
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name='email'
            type='email'
            placeholder='Enter email'
            onChange={handleChange}
          />
          {signupErrors && <small>{signupErrors?.errors.email}</small>}
          <Form.Text className='text-muted'>
            We never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Password'
            onChange={handleChange}
            autoComplete='on'
          />
          {signupErrors && <small>{signupErrors?.errors.password}</small>}
        </Form.Group>
        <Form.Group controlId='passwordConfirmation'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='passwordConfirmation'
            placeholder='Password Confirmation'
            onChange={handleChange}
            autoComplete='on'
          />
          {signupErrors && (
            <div>
              <small>{signupErrors?.errors.passwordConfirmation}</small>
            </div>
          )}
        </Form.Group>
        <Button variant='primary' type='submit'>
          Sign Up
        </Button>
      </Form>
    </Card>
  );
};

export default Signup;
