
/* eslint no-underscore-dangle: 0 */

import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import { feathersServices } from '../../../feathers';
import Form from './Form';

const getFormValue = formValueSelector('UserRolesChange'); // to get current form values
let initialValues = null; // initial values for the last form displayed

const loadUsers = (startUsername, isGte) => {
  const query = {
    username: { [isGte ? '$gte' : '$gt']: startUsername },
    $sort: { username: 1 },
    $limit: 10,
    $select: ['id', '_id', 'username', 'roles'],
  };

  return feathersServices.users.find({ query });
};

const handleSubmit = (values, dispatch) => new Promise((resolve) => {
  const actions = [];

  // get next set of users first to rerender UI ASAP
  const initialUsers = initialValues.users;
  const len = initialUsers.length;
  const lastUsername = len ? initialUsers[len - 1].username : '';
  actions.push(loadUsers(lastUsername, false));

  // update current set of users
  values.users.forEach((user, index) => {
    if (user.roles !== initialUsers[index].roles) {
      actions.push(feathersServices.users.patch(user.id || user._id, { roles: user.roles.trim() }));
    }
  });

  if (actions.length) {
    dispatch(actions); // this is not then-able but we don't want to stall the UI anyway
  }

  resolve();
});

const mapStateToProps = (state) => {
  const queryResult = state.users.queryResult || {};

  initialValues = {
    filter: getFormValue(state, 'filter') || '', // retain currently displayed value
    users: queryResult.data || [],
  };

  return {
    initialValues,
  };
};


const mapDispatchToProps = (dispatch) => {
  if (!initialValues.users.length) { // load initial set of users. also works on wrap around.
    Promise.resolve().then(() => dispatch(loadUsers('', true))); // soonest, most predictable
  }

  return {
    loadUsers: () => dispatch(loadUsers(initialValues.filter, true)), // reposition list
  };
};

// decorate with redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  // decorate react component with redux-form
  reduxForm({
    form: 'UserRolesChange',
    enableReinitialize: true, // important
    onSubmit: handleSubmit,
  })(Form)
);
