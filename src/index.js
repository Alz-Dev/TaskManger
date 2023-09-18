import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import Reducer from './Main-Store/Reducer';

import 'bootstrap/dist/css/bootstrap.rtl.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

const mainStor= createStore(Reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={mainStor}>
      <App/>
    </Provider>
  </React.StrictMode>
);
