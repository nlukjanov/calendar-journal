import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
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
      console.log(res);
      setToken(res.data.token);
      history.push('/myjournal');
      // add notification with res
    } catch (error) {
      console.log('after throw', error);
      setSigninErrors(error);
    }
  };

  useEffect(() => {
    console.log('error log', signinErrors && signinErrors.error);
  }, [signinErrors]);

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
