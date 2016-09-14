
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

const Form = props => {
  const { handleSubmit, pristine, reset, submitting, invalid } = props;

  return (
    <form onSubmit={handleSubmit}>

      <Field name="name"
        component={TextField}
        props={{ floatingLabelText: 'Name', hintText: 'Your full name.', autoFocus: true }}
      />
      <br />

      <Field name="username"
        component={TextField}
        props={{
          floatingLabelText: 'Username', hintText: 'The name you want others to know you by.',
        }}
      />
      <br />

      <Field name="email"
        component={TextField}
        props={{ floatingLabelText: 'Email', hintText: 'Your email address.' }}
      />
      <br />

      <Field name="password"
        component={TextField}
        props={{ floatingLabelText: 'Password', type: 'password' }}
      />
      <br />

      <Field name="confirmPassword"
        component={TextField}
        props={{ floatingLabelText: 'Confirm password', type: 'password' }}
      />
      <br />

      <div>
        <RaisedButton label={submitting ? 'Signing Up...' : 'Sign Up'}
          disabled={pristine || invalid || submitting}
          style={{ margin: '12px' }}
          type="submit"
          primary
        />
        <RaisedButton label="Clear Values"
          disabled={pristine || submitting}
          style={{ margin: '12px' }}
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
