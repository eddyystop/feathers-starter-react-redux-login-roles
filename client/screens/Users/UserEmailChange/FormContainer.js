
import { reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import errors from 'feathers-errors';

import { feathersServices } from '../../../feathers';
import Form from './Form';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';

const asyncValidate = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersServices.verifyReset.create(
    { action: 'unique', value: { email: values.email } }
  ))
    .then(() => resolve())
    .catch(err => reject(err.errors));
});

const handleSubmit = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersServices.verifyReset.create(
    { action: 'email', value: { password: values.password, email: values.email } }
  ))
    .then(() => {
      dispatch(push('/user/signin')); // this will force state.auth.user to be updated
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
    form: 'UserEmailChange',
    asyncValidate,
    asyncBlurFields: ['email'],
    validate: usersClientValidations.changeEmail,
    onSubmit: handleSubmit,
  })(Form)
);
