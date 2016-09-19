
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import style from '../components/button.css';

const Form = props => {
  const { handleSubmit, pristine, reset, submitting, invalid } = props;

  return (
    <form onSubmit={handleSubmit}>

      <Field name="oldPassword"
        component={TextField}
        props={{
          floatingLabelText: 'Current password',
          hintText: 'Your current password.',
          autoFocus: true,
        }}
      />
      <br />

      <Field name="password"
        component={TextField}
        props={{ floatingLabelText: 'New password', hintText: 'Your new password.' }}
      />
      <br />

      <Field name="confirmPassword"
        component={TextField}
        props={{
          floatingLabelText: 'Confirm password', hintText: 'Enter your new password again.',
        }}
      />
      <br />

      <div>
        <RaisedButton label={submitting ? 'Changing password...' : 'Change password'}
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
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default Form;
