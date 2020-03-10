import React from 'react';

import './CustomButton.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, isDisabled, ...otherProps }) => (
  <button
    className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}
    disabled={isDisabled}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;