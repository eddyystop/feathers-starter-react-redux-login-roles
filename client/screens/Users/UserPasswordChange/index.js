
import React from 'react';
import UsersNavBar from '../components/UsersNavBar';
import FormContainer from './FormContainer.js';

const Page = () => (
  <div>
    <UsersNavBar label="Change Password" screen="user/passwordchange" />
    <FormContainer />
  </div>
);

export default Page;
