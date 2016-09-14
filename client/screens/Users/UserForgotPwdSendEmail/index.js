
import React from 'react';
import UsersNavBar from '../components/UsersNavBar';
import FormContainer from './FormContainer.js';

export default () => (
  <div>
    <UsersNavBar label="Send Forgot Password Email" screen="user/forgotpwdsendemail" />
    <FormContainer />
  </div>
);
