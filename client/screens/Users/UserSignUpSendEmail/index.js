
import React from 'react';
import UsersNavBar from '../components/UsersNavBar';
import FormContainer from './FormContainer.js';

export default () => (
  <div>
    <UsersNavBar label="Send Sign Up Email" screen="user/signupsendemail" />
    <FormContainer />
  </div>
);
