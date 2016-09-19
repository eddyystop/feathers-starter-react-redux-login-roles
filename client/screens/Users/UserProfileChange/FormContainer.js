
/* eslint no-underscore-dangle: 0 */

import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { feathersServices } from '../../../feathers';
import Form from '../components/UserProfileForm';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';

const asyncValidate = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersServices.verifyReset.create({
    action: 'unique',
    value: { username: values.username },
    ownId: values.id || values._id,
    meta: { noErrMsg: true },
  }))
    .then(() => resolve())
    .catch(err => reject(err.errors));
});

const handleSubmit = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersServices.users.patch(values.id || values._id,
    { name: values.name.trim(), username: values.username.trim() }
  ))
    .then(() => {
      dispatch(push('/user/signin')); // force user info to update
    })
    .then(() => {
      dispatch([
        feathersServices.verifyReset.resetAll(),
        feathersServices.users.reset(),
      ]);
      resolve();
    })
    .catch(err => reject(err.errors));
});

const mapStateToProps = (state) => {
  const user = state.auth.user;
  return {
    initialValues: {
      _id: user.id || user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      roles: user.roles || '',
    },
    disableAll: false,
  };
};

// decorate with redux
export default connect(
  mapStateToProps
)(
  // decorate react component with redux-form
  reduxForm({
    form: 'UserProfile',
    asyncValidate,
    asyncBlurFields: ['username'],
    validate: usersClientValidations.profileChange,
    onSubmit: handleSubmit,
  })(Form)
);
