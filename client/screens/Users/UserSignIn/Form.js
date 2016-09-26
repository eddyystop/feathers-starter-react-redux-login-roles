
import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import style from '../components/button.css';

class Form extends Component {
  componentWillMount() {
    this.props.handleLogout();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) { // true after successful submit
      this.props.handleRedirect();
    }
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;

    const a = (
      <form onSubmit={handleSubmit}>

        <Field name="email"
          component={TextField}
          props={{ floatingLabelText: 'Email', hintText: 'Your email address.', autoFocus: true }}
        />
        <br />

        <Field name="password"
          component={TextField}
          props={{ floatingLabelText: 'Password', hintText: 'Your password.', type: 'password' }}
        />
        <br />

        <div>
          <RaisedButton label={submitting ? 'Signing In...' : 'Sign In'}
            disabled={invalid || submitting}
            className={style.button}
            type="submit"
            primary
          />
          <RaisedButton label="Clear Values"
            disabled={pristine || submitting}
            className={style.button}
            onTouchTap={reset}
            secondary
          />
        </div>

      </form>
    );

    return a;
  }
}

Form.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleRedirect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default Form;
