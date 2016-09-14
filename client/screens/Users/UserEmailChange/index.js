
import React from 'react';
import UsersNavBar from '../components/UsersNavBar';
import FormContainer from './FormContainer.js';

const Page = () => (
  <div>
    <UsersNavBar label="Change Email" screen="user/emailchange" />
    <FormContainer />
  </div>
);

export default Page;
