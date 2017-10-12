
import { reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import errors from 'feathers-errors';

import { feathersServices } from '../../../feathers';
import Form from './Form';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';

// all props are passed through reduxForm to the Form, so we just pick resetToken
const handleSubmit = (values, dispatch, props) => new Promise((resolve, reject) => {
  dispatch(feathersServices.verifyReset.create(
    { action: 'reset', value: { token: props.resetToken, password: values.password } }
  ))
    .then(() => {
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
    form: 'UserForgotPwdReset',
    validate: usersClientValidations.forgotPwdReset,
    onSubmit: handleSubmit,
  })(Form)
);
