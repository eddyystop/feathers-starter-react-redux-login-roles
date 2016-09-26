
import { reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import errors from 'feathers-errors';

import { config } from '../../../utils/config';
import { feathersAuthentication }
  from '../../../feathers';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';
import Form from './Form';

const handleSubmit = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersAuthentication.authenticate(
    { type: 'local', email: values.email, password: values.password }
  ))
    .then(() => resolve())
    .catch(err => reject(err instanceof errors.BadRequest
      ? new SubmissionError(Object.assign({}, err.errors, { _error: err.message || '' }))
      : err
    ));
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isSignedIn,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleLogout: () => {
    dispatch(feathersAuthentication.logout());
  },
  handleRedirect: () => {
    dispatch(push(ownProps.redirectTo || config.client.defaultRoute));
  },
});

// decorate with redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  // decorate react component with redux-form
  reduxForm({
    form: 'UserSignIn',
    // initialValues: { email: 'a@a.com' }, // set initialValues in mapStateToProps for dynamic data
    validate: usersClientValidations.signin,
    // asyncBlurFields: ['email', 'password'],
    // asyncValidate: (values, dispatch, props) => new Promise(...),
    onSubmit: handleSubmit,
  })(Form)
);
