import React from 'react';
import PropTypes from 'prop-types';
import fitty from 'fitty';

import { FreeBreakfast } from '@material-ui/icons';

import "./Logo.scss";

const Logo = (props) => {
  const { width, height } = props;
  return (
    <div className="mlc-animated-logo" height={height} width={width}>
      <FreeBreakfast y="1em" className="mlc-animated-logo__icon" />
      <span className="mlc-animated-logo__name">{fitty("My Little Manager")}</span>
    </div>
  );
}

Logo.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string
}

export default Logo;