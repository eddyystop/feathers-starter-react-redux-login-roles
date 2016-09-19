
/* eslint no-trailing-spaces: 0, react/prop-types: 0 */

import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import style from './button.css';

const Form = (props) => {
  const { handleSubmit, pristine, reset, submitting, invalid } = props;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

        <Field name="name"
          component={TextField}
          props={{
            floatingLabelText: 'Name',
            hintText: 'Your name.',
            disabled: props.disableAll,
            autoFocus: true,
          }}
        />
        <br />

        <Field name="username"
          component={TextField}
          props={{
            floatingLabelText: 'Username',
            hintText: 'The name you want others to know you by.',
            disabled: props.disableAll,
          }}
        />
        <br />

        <Field name="email"
          component={TextField}
          props={{
            floatingLabelText: 'Email',
            hintText: 'Your email address.',
            disabled: true,
          }}
        />
        <br />

        <Field name="roles"
          component={TextField}
          props={{
            floatingLabelText: 'Roles',
            hintText: 'What is the user allowed to do?',
            disabled: true,
          }}
        />
        <br />

        <div>
          <RaisedButton label={submitting ? 'Saving...' : 'Save'}
            disabled={pristine || invalid || submitting || props.disableAll}
            className={style.button}
            type="submit"
            primary
          />
          <RaisedButton label="Clear Values"
            disabled={pristine || submitting || props.disableAll}
            className={style.button}
            onTouchTap={reset}
            secondary
          />
        </div>

      </form>
    </div>
  );
};

Form.propTypes = {
  disableAll: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default Form;
