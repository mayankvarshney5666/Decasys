import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
  autoClose: 1000, // Set the default duration to 2 seconds (2000 milliseconds)
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer  {...toastConfig} />
    </Provider>
  </React.StrictMode>
);
