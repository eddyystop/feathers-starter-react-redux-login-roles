
import React from 'react';
import UsersNavBar from '../components/UsersNavBar';
import FormContainer from './FormContainer';

export default () => (
  <div>
    <UsersNavBar label="Change Profile" screen="user/profilechange" />
    <FormContainer />
  </div>
);
