
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import style from '../components/button.css';

const Form = props => {
  const { handleSubmit, pristine, reset, submitting, invalid } = props;

  return (
    <form onSubmit={handleSubmit}>

      <Field name="password"
        component={TextField}
        props={{
          floatingLabelText: 'Password',
          hintText: 'Your password.',
          autoFocus: true,
        }}
      />
      <br />

      <Field name="email"
        component={TextField}
        props={{ floatingLabelText: 'Email', hintText: 'Your new email address.' }}
      />
      <br />

      <Field name="confirmEmail"
        component={TextField}
        props={{ floatingLabelText: 'Confirm email', hintText: 'Enter your new email again.' }}
      />
      <br />

      <div>
        <RaisedButton label={submitting ? 'Changing email...' : 'Change email'}
          disabled={pristine || invalid || submitting}
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
