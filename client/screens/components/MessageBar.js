
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { getFeathersStatus } from '../../feathers';

const MessageBar = ({ message, servicesRootState }) => {
  const barMessage = message || getFeathersStatus(servicesRootState).message;

  return !barMessage
    ? <div />
    : <RaisedButton label={barMessage} disabled fullWidth />;
};

MessageBar.propTypes = {
  message: PropTypes.string, // optional message to display
  servicesRootState: PropTypes.object.isRequired, // parent of all services' states
};

const mapStateToProps = (state, ownProps) => ({
  servicesRootState: state,
  message: ownProps.message,
});

export default connect(mapStateToProps)(MessageBar);
