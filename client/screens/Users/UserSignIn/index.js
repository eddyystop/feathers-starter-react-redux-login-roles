
import React, { PropTypes } from 'react';
import UsersNavBar from '../components/UsersNavBar';
import FormContainer from './FormContainer.js';

const Screen = (props) => (
  <div>
    <UsersNavBar label="Sign In" screen="user/signin" />
    <FormContainer redirectTo={props.location.query.redirect} />
  </div>
);

Screen.propTypes = {
  location: PropTypes.object,
};

export default Screen;
