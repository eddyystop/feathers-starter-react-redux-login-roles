
import { reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import errors from 'feathers-errors';

import { feathersServices } from '../../../feathers';
import Form from './Form';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';

const handleSubmit = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersServices.verifyReset.create(
    { action: 'password', value: { oldPassword: values.oldPassword, password: values.password } }
  ))
    .then(() => {
      dispatch(push('/user/profile'));
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
    form: 'UserPasswordChange',
    validate: usersClientValidations.changePassword,
    onSubmit: handleSubmit,
  })(Form)
);
