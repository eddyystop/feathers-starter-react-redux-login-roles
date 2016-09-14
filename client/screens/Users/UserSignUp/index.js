
import React from 'react';
import UsersNavBar from '../components/UsersNavBar';
import FormContainer from './FormContainer';

export default () => (
  <div>
    <UsersNavBar label="Sign Up" screen="user/signup" />
    <FormContainer />
  </div>
);
