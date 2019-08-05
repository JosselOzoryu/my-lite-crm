import React from 'react';
import PropTypes from 'prop-types';

import productLogo from 'assets/logo.svg'

import "./Logo.scss";

const Logo = (props) => {
  const { width, height } = props;
  return (
    <div className="mlc-logo" height={height} width={width}>
      <span className="mlc-logo__image" style={{ backgroundImage: `url(${productLogo})` }} />
      <span className="mlc-logo__name">My Little Manager</span>
    </div>
  );
}

Logo.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string
}

export default Logo;