import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import App from './App';
import { store } from './Store/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
