import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import RootProvider from './RootProviders';
import AppHelmet from './molecules/AppHelmet';

ReactDOM.render(
  <React.StrictMode>
    <AppHelmet />
    <RootProvider>
      <App />
    </RootProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
