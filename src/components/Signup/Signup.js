import React from 'react';

const Signup = () => {
  return (
    <div>
      <form>
        <div>
          <label htmlFor='username'>Username</label>
          <input id='username' type='text' name='username' placeholder='Username' />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input id='email' type='text' name='email' placeholder='Email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' placeholder='Password' />
        </div>
        <div>
          <label htmlFor='passwordConfirmation'>Password Confirmation</label>
          <input id='passwordConfirmation'
            type='password'
            name='passwordConfirmation'
            placeholder='Password Confirmation'
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
