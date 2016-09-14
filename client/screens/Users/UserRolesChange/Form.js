
import React, { Component, PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

const renderUsers = ({ fields }) => {
  const table = (
    <table style={{ font: 'Arial', borderCollapse: 'collapse', borderSpacing: 0 }}>
      <thead style={{ textAlign: 'left' }}>
        <tr>
          <th>Username</th>
          <th>Roles ('acct purch rec')</th>
        </tr>
      </thead>
      <tbody style={{ border: 1 }}>
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
          style={{ margin: '12px' }}
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
            style={{ margin: '12px' }}
            type="submit"
            primary
          />
          <RaisedButton label="Clear Values"
            disabled={pristine || submitting}
            style={{ margin: '12px' }}
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
