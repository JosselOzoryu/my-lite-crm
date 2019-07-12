import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = (props) => {
  const { label, icon, className } = props;
  return (
    <div className={`mlc-button ${className}`} tabIndex="0" role="button" aria-pressed="false">
      <span>{label ? label : <React.Fragment />}</span>
      <span>{icon ? icon : <React.Fragment />}</span>
    </div>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.node,
  className: PropTypes.string,
  action: PropTypes.func
};

export default Button;