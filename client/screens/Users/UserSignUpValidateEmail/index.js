
import React, { PropTypes } from 'react';
import UsersNavBar from '../components/UsersNavBar';
import Container from './Container';

const Page = (props) => (
  <div>
    <UsersNavBar label="Validate Sign Up Email" screen="user/signupvalidateemail" />
    <Container emailToken={props.params.token} />
  </div>
);

Page.propTypes = {
  params: PropTypes.object.isRequired,
};

export default Page;
