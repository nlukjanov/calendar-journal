import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { logout, isAuthenticated } from './authHelper';

const SecureRouteFront = ({ component: Component, ...rest }) => {
  if (isAuthenticated()) return <Route {...rest} component={Component} />;
  logout();
  return <Redirect to='/signin' />;
};

export default SecureRouteFront;
