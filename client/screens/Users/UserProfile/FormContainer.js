
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Form from '../components/UserProfileForm';

const handleSubmit = () => new Promise((resolve) => resolve());

const mapStateToProps = (state) => {
  const user = state.auth.user;
  return {
    initialValues: {
      name: user.name, username: user.username, email: user.email, roles: user.roles || '',
    },
    disableAll: true,
  };
};

// decorate with redux
export default connect(
  mapStateToProps
)(
  // decorate react component with redux-form
  reduxForm({
    form: 'UserProfile',
    onSubmit: handleSubmit,
  })(Form)
);
