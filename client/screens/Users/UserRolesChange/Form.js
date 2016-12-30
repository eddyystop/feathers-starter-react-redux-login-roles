
import React, { Component, PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import style from '../components/button.css';
import styleTable from './style.css';

const renderUsers = ({ fields }) => {
  const table = (
    <table className={styleTable.tbody}>
      <thead className={styleTable.thead}>
        <tr>
          <th>Username</th>
          <th>Roles ('acct purch rec')</th>
        </tr>
      </thead>
      <tbody className={styleTable.tbody}>
        {fields.map((userFieldName /* , index */) => (
          <tr key={userFieldName}>
            <td>
              <Field name={`${userFieldName}.username`} component="input" disabled />
            </td>
            <td>
              <Field name={`${userFieldName}.roles`} component="input" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return table;
};

class Form extends Component {
  // Ignore state changes with each user update.
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props.initialValues) !== JSON.stringify(nextProps.initialValues);
  }

  render() {
    const { loadUsers, handleSubmit, pristine, reset, submitting, invalid } = this.props;

    return (
      <form onSubmit={handleSubmit}>

        <Field name="filter"
          component={TextField}
          props={{ floatingLabelText: 'Starting username', autoFocus: true }}
        />
        <RaisedButton label="Filter"
          disabled={submitting}
          className={style.button}
          onClick={() => loadUsers()}
          secondary
        />
        <br />
        <br />

        <FieldArray name="users" component={renderUsers} />
        <br />

        <div>
          <RaisedButton label={submitting ? 'Changing...' : 'Change'}
            disabled={pristine || invalid || submitting}
            className={style.button}
            type="submit"
            primary
          />
          <RaisedButton label="Clear Values"
            disabled={pristine || submitting}
            className={style.button}
            onTouchTap={reset}
            secondary
          />
        </div>

      </form>
    );
  }
}

Form.propTypes = {
  initialValues: PropTypes.object.isRequired,
  loadUsers: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default Form;
