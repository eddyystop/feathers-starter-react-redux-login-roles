
import React, { PropTypes } from 'react';

const AppWrapper = (props) => (
  <div>
    {props.children}
  </div>
);

AppWrapper.propTypes = {
  children: PropTypes.any,
};

export default AppWrapper;
