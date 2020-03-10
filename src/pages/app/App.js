import React from 'react';
import './App.scss';

import Routes from '../../routes';

import Header from '../../components/header/Header';

const App = () => {
  return (
    <div>
      <Header />
      <Routes />
    </div>
  );
}

export default App;
