
import React from 'react';
import UsersNavBar from '../components/UsersNavBar';
import FormContainer from './FormContainer';

export default () => (
  <div>
    <UsersNavBar label="User Profile" screen="user/profile" />
    <FormContainer />
  </div>
);
