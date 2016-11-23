
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import MessageBar from '../../components/MessageBar';

export const UsersNavBar = ({ label, screen, message }) => (
  <div>
    <AppBar
      title={<span>Authentication - {label}</span>}
      iconElementLeft={<div />}
      iconElementRight={makeBarButtons(screen)}
    />
    <MessageBar message={message} />
  </div>
);

UsersNavBar.propTypes = {
  label: PropTypes.string.isRequired, // Nav bar label
  screen: PropTypes.string.isRequired, // nav bar is for this patch, determines options shown
  username: PropTypes.any,
  message: PropTypes.string, //
};

const makeBarButtons = (screen) => {
  switch (screen) {
    // Testing uses the data attr // todo ***
    // <div data-__test__ahref="/" > was removed as it broke <Link>
    /*
     Material-ui 0.14.x is not yet compatible with React 15, and React issues this warning:
     Warning: IconButton: `ref` is not a prop. Trying to access it will result in `undefined`
     being returned. If you need to access the same value within the child component, you should
     pass it as a different prop.
     */
    case 'user/signin': {
      return (
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            containerElement={<Link to="/user/signup" />}
            primaryText="Sign up"
          />
          <MenuItem
            containerElement={<Link to="/user/forgotpwdsendemail" />}
            primaryText="Forgot password"
          />
          <MenuItem
            containerElement={<Link to="/user/signupsendemail" />}
            primaryText="Resend sign up email"
          />
        </IconMenu>
      );
    }

    case 'user/profile':

      return (
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            containerElement={<Link to="/user/signin" />}
            primaryText="Sign out"
          />
          <MenuItem
            containerElement={<Link to="/user/passwordchange" />}
            primaryText="Change password"
          />
          <MenuItem
            containerElement={<Link to="/user/emailchange" />}
            primaryText="Change email address"
          />
          <MenuItem
            containerElement={<Link to="/user/profilechange" />}
            primaryText="Change profile"
          />
          <MenuItem
            containerElement={<Link to="/user/roleschange" />}
            primaryText="Change roles (admin)"
          />
          <MenuItem
            containerElement={<Link to="/" />}
            primaryText="Application"
          />
        </IconMenu>
      );


    case 'user/signup': // fall through
    case 'user/signupsendemail': // eslint-disable-line no-case-declarations
    case 'user/forgotpwdsendemail': // eslint-disable-line no-case-declarations
      return (
        <FlatButton
          label="Sign in" containerElement={<Link to="/user/signin" />}
        />
      );

    case 'user/passwordchange': // eslint-disable-line no-case-declarations
    case 'user/emailchange': // eslint-disable-line no-case-declarations
    case 'user/profilechange': // eslint-disable-line no-case-declarations
    case 'user/roleschange': // eslint-disable-line no-case-declarations
      return (
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            containerElement={<Link to="/user/profile" />}
            primaryText="Profile"
          />
          <MenuItem
            containerElement={<Link to="/user/signin" />}
            primaryText="Sign out"
          />
        </IconMenu>
      );

    case 'user/signupvalidateemail':
    case 'user/forgotpwdreset': // eslint-disable-line no-case-declarations
    case 'user/signingin':  // eslint-disable-line no-case-declarations
      return (
        <span />
      );

    default: {
      return (
        <div />
      );
    }
  }
};

export default UsersNavBar;
