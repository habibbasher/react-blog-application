import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

/**
 * Bootstrap addition
 */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//  For Redux integration Since using context api so redux is not needed

// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

// import store, { persistor } from './redux/store';

/**
 * If scss structure is need then comment in the following line
 * It will import all the files of scss directory
 */
// import './scss/main.scss';

import './index.css';

/**
 * Production ready minified version of my blog specific css
 */
import './assets/css/main.css';

import * as serviceWorker from './serviceWorker';

import App from './pages/app/App';

import { AppProvider } from './app-context';
import CurrentUserChecker from './components/current-user-checker/CurrentUserChecker';

ReactDOM.render(
  <AppProvider >
    <CurrentUserChecker>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CurrentUserChecker>
  </AppProvider>,
  document.getElementById('root')
);

//  For Redux integration Since using context api so redux is not needed

// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <PersistGate persistor={persistor}>
//         <App />
//       </PersistGate>
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
