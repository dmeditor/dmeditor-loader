import React from 'react';
import { createRoot } from 'react-dom/client';
import * as dmeditor from 'dmeditor';

import App from './App';
import { RemoteLoaderPlugin } from '../src/index';

new RemoteLoaderPlugin(dmeditor, [
  {
    name: 'remote2',
    url: 'http://localhost:3002',
  },
])
  .loadWidgets()
  .then(() => {
    renderApp();
  });

const renderApp = () => {
  const $el = document.getElementById('dmeditor');
  const app = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  createRoot($el!).render(app);
};

export default renderApp;
