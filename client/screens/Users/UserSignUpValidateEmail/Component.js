
/* eslint no-script-url: 0 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import configSecurity from '../../../../config/config.security';

const email = configSecurity.email;

class TheComponent extends Component {
  componentDidMount() {
    this.props.validateSignUpEmailToken(this.props.emailToken); // validate token
  }

  componentWillUnmount() {
    this.props.resetMe();
  }

  render() {
    const { signUpEmailTokenStatus, resend } = this.props;

    switch (signUpEmailTokenStatus) {
      case 'checking':
        return (<div>Checking token.</div>);
      case 'notIssued':
        return (<div>This sign up token has not been issued.</div>);
      case 'alreadyVerified':
        return (<div>This user is already verified.</div>);
      case 'expired':
        return (
          <div>
            The token in the sign up email has expired.
            <br />
            <a onClick={resend} href="javascript:void(0)">Send me another email.</a>
          </div>
        );
      case 'verified':
        return welcomeMessage(this.props.user);
      default:
        return (<span />);
    }
  }
}

TheComponent.propTypes = {
  user: PropTypes.object.isRequired,
  signUpEmailTokenStatus: PropTypes.string.isRequired,
  emailToken: PropTypes.string,
  validateSignUpEmailToken: PropTypes.func.isRequired,
  resetMe: PropTypes.func.isRequired,
  resend: PropTypes.func.isRequired,
};

function welcomeMessage(user) {
  return (
    <div style={{ margin: 'auto', width: '60%', fontFamily: 'Roboto, Arial' }}>
      <br />
      <h3>Hi {user.name},</h3>
      <p>Thanks for confirming your account.
        We’re very excited to have you start using {email.productName}.</p>
      <p>To get started, please sign in below:</p>
      <br />
      <RaisedButton label="Sign in." containerElement={<Link to="/user/signin" />} />
      <br />
      <p>If you did not sign up to {email.productName}, please ignore this email.</p>
      <p>Thanks,<br />{email.senderName} and the {email.productName} Team</p>
      <br />
      <p><strong>P.S.</strong> We also love hearing from you and helping you
        with any issues you have. Please use the email address below if you want
        to ask a question or just say hi.
      </p>
      <p>&copy; 2016 {email.productName}. All rights reserved.
        <br />{email.productAddressLine1}
        <br />{email.productAddressLine2}
      </p>
    </div>
  );
}

export default TheComponent;
