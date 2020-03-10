import React from 'react';

const BackendErrorMessages = ({ backendErrors }) => {

  const errorMessages = Object.keys(backendErrors).map(name => {
    const message = backendErrors[name].join(' ');
    return `${name} ${message}`;
  });

  return (
    <div className="error-messages">
      {errorMessages.map(errorMessage => (<p className="alert alert-danger" key={errorMessage}>{errorMessage}</p>))}
    </div>
  );
}

export default BackendErrorMessages;