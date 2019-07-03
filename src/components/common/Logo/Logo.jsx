import React from 'react';
import PropTypes from 'prop-types';

import "./Logo.scss";

const Logo = (props) => {
  const { width, height } = props;
  return (
    <div className="mlc-animated-logo" height={height} width={width}>
      <svg height='100%' width='100%' xmlns="http://www.w3.org/2000/svg">
        <rect className="shape1" height="60" width="500" />
        <rect className="shape2" height="60" width="500" />
        <text className="text">My Lite Manager</text>
      </svg>
    </div>
  );
}

Logo.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string
}

export default Logo;