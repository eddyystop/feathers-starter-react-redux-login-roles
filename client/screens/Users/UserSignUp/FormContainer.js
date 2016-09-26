
import { reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import errors from 'feathers-errors';

import { config } from '../../../utils/config';
import { feathersServices } from '../../../feathers';
import Form from './Form';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';

const asyncValidate = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersServices.verifyReset.create({
    action: 'unique',
    value: { username: values.username, email: values.email },
    meta: { noErrMsg: true },
  }))
    .then(() => resolve())
    .catch(err => reject(err.errors));
});

const handleSubmit = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersServices.users.create(values))
    .then(() => {
      alert( // eslint-disable-line no-alert
        `A confirmation email has been sent to ${values.email}. ` +
        `It is valid for the next ${config.authEmails.expires.signUpEmailTokenTimeValidText}.`
      );
      dispatch(push('/user/signin'));
      resolve();
    })
    .catch(err => reject(err instanceof errors.BadRequest
      ? new SubmissionError(Object.assign({}, err.errors, { _error: err.message || '' }))
      : err
    ));
});

// decorate with redux
export default connect()(
  // decorate react component with redux-form
  reduxForm({
    form: 'UserSignUp',
    asyncValidate,
    asyncBlurFields: ['username', 'email'],
    validate: usersClientValidations.signup,
    onSubmit: handleSubmit,
  })(Form)
);
