
import { reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import errors from 'feathers-errors';

import { config } from '../../../utils/config';
import { feathersServices } from '../../../feathers';
import Form from './Form';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';

const handleSubmit = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersServices.verifyReset.create(
    { action: 'forgot', value: values.email }
  ))
    .then(() => {
      alert( // eslint-disable-line no-alert
        `An email to reset your password has been sent to ${values.email}. ` +
        `It is valid for ${config.authEmails.expires.forgotPasswordEmailTokenTimeValidText}.`
      );

      dispatch(push('/user/signin'));
      resolve();
    })
    .catch(err => {
      console.log(err); // eslint-disable-line no-console
      return err;
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
    form: 'UserForgotPwdSendEmail',
    validate: usersClientValidations.forgotPwdSendEmail,
    onSubmit: handleSubmit,
  })(Form)
);
