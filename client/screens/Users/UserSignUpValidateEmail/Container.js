
import { connect } from 'react-redux';
import { feathersServices, feathersAuthentication } from '../../../feathers';

import Component from './Component'; // eslint-disable-line import/no-unresolved

const mapStateToProps = (state) => ({
  user: state.verifyReset.data || {},
  signUpEmailTokenStatus: (() => {
    const vr = state.verifyReset;
    if (!vr.isFinished) { return 'checking'; }
    if (!vr.isError) { return 'verified'; }
    const vrErr = vr.isError.errors;
    if (!vrErr || !vrErr.$className) { return 'general'; }
    return vrErr.$className;
  })(),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  validateSignUpEmailToken: (emailToken) => {
    dispatch(feathersServices.verifyReset.create({ action: 'verify', value: emailToken }))
      .catch(() => {}); // Nav bar will display error status
  },
  resetMe: () => {
    dispatch(feathersAuthentication.logout());
  },
  resend: () => {
    dispatch(feathersServices.verifyReset.create(
      { action: 'resend', value: { verifyToken: ownProps.emailToken } }
    ));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
