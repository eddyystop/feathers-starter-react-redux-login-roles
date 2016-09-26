
import { reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import errors from 'feathers-errors';

import { feathersServices } from '../../../feathers';
import Form from './Form';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';

let token;

const handleSubmit = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersServices.verifyReset.create(
    { action: 'reset', value: { token, password: values.password } }
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

const mapStateToProps = (state, ownProps) => {
  token = ownProps.resetToken; // there must be a cleaner way to get token to handleSubmit
  return {};
};

// decorate with redux
export default connect(
  mapStateToProps
)(
  // decorate react component with redux-form
  reduxForm({
    form: 'UserForgotPwdReset',
    validate: usersClientValidations.forgotPwdReset,
    onSubmit: handleSubmit,
  })(Form)
);
