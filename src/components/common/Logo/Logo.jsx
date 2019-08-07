import React from 'react';
import PropTypes from 'prop-types';

import productLogo from 'assets/logo.svg'

import "./Logo.scss";

const Logo = (props) => {
  const { width, height, title } = props;
  return (
    <div className="mlc-logo" height={height} width={width}>
      <span className="mlc-logo__image" style={{ backgroundImage: `url(${productLogo})` }} />
      {title ? <span className="mlc-logo__name">My Little Manager</span> : <React.Fragment />}
    </div>
  );
}

Logo.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  title: PropTypes.bool
}

Logo.defaultProps = {
  title: true
}

export default Logo;