import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import { loadWidgets, initRepositories } from '../src/index';

initRepositories([
  {
    name: 'Widget1',
    url: 'http://localhost:9002/remoteEntry.js',
  },
  {
    name: 'remote2',
    url: 'http://localhost:3002/mf-manifest.json',
  },
]);

loadWidgets('Widget1/SampleWidget')
  .then((module: any) => {
    const { register, widgetInfo } = module.default;
    console.log('🚀 ~ loadWidgets ~ widgetInfo:', widgetInfo);

    register();
  })
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
