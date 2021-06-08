import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'es7-object-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/app/app';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root'),
);
