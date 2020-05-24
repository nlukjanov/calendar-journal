import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
    console.log(formData);
    try {
      await axios.post('http://localhost:4000/api/register', formData);
      history.push('/signin');
      // add notification with res

    } catch (error) {
      console.log(error);
      setSignupErrors(error);
    }
  };

  // logging after state update
  useEffect(() => console.log(formData), [formData]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            name='username'
            placeholder='Username'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='text'
            name='email'
            placeholder='Email'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='on'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='passwordConfirmation'>Password Confirmation</label>
          <input
            id='passwordConfirmation'
            type='password'
            name='passwordConfirmation'
            placeholder='Password Confirmation'
            autoComplete='on'
            onChange={handleChange}
          />
        </div>
        <div>
          <button type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
