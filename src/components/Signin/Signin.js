import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { setToken } from '../../lib/authHelper';

const Signin = () => {
  const history = useHistory();
  const [formData, setFormData] = useState();
  const [signinErrors, setSigninErrors] = useState();

  const handleChange = ({ target: { name, value } }) => {
    const formNewData = { ...formData, [name]: value };
    setFormData(formNewData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/login', formData);
      setToken(res.data.token);
      history.push('/myjournal');
      // add notification with res
    } catch (error) {
      setSigninErrors({ errors: error.response.data.message });
    }
  };

  useEffect(() => {
    console.log('error log', signinErrors?.errors);
  }, [signinErrors]);

  return (
    <Card className='mx-auto mt-5 border-light' style={{ maxWidth: '25rem' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name='email'
            type='email'
            placeholder='Enter email'
            onChange={handleChange}
          />
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
        </Form.Group>
        {signinErrors && (
          <div>
            <small>{signinErrors.errors}</small>
          </div>
        )}
        <Button variant='primary' type='submit'>
          Sign In
        </Button>
      </Form>
    </Card>
  );
};

export default Signin;
