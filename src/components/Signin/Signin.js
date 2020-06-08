import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../../lib/authHelper';

const Signin = () => {
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
      const res = await axios.post('http://localhost:4000/api/login', formData);
      setToken(res.data.token);
      history.push('/myjournal');
      // add notification with res
    } catch (error) {
      console.log(error);
      setSignupErrors(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          <button type='submit'>Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default Signin;